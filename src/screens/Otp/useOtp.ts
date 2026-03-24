import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';

import { OTP_LENGTH, RESEND_COOLDOWN } from '../../constants/app';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { requestOtp, signInWithPhone } from '../../store/thunks/authThunks';
import { OtpFormValues, UseOtpParams } from './types';

const generateRef = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

const OTP_ERROR_MESSAGE = `Please enter the full ${OTP_LENGTH}-digit OTP.`;

export const useOtp = ({ navigation, route }: UseOtpParams) => {
  const { phone } = route.params;
  const dispatch = useAppDispatch();
  const { hasPin } = useAppSelector(state => state.auth);

  const [refCode, setRefCode] = useState(generateRef());
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<OtpFormValues>({
    defaultValues: {
      otp: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (resendCountdown <= 0) return;

    const timer = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCountdown]);

  const isLoading = isSigningIn || isResending;
  const isResendDisabled = isLoading || resendCountdown > 0;

  const otpRules = {
    required: 'OTP is required',
    minLength: {
      value: OTP_LENGTH,
      message: OTP_ERROR_MESSAGE,
    },
    maxLength: {
      value: OTP_LENGTH,
      message: OTP_ERROR_MESSAGE,
    },
  };

  const onSubmit = async ({ otp }: OtpFormValues) => {
    setIsSigningIn(true);

    try {
      const result = await dispatch(signInWithPhone(phone, otp));

      if (!result?.success) {
        Alert.alert(
          'Error',
          result?.message || 'Invalid OTP. Please try again.',
        );
        return;
      }

      if (hasPin) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTab' }],
        });
        return;
      }

      navigation.navigate('Passcode', {
        mode: 'create',
      });
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleResend = async () => {
    if (isResendDisabled) return;

    setValue('otp', '');
    clearErrors('otp');
    setIsResending(true);

    try {
      const result = await dispatch(requestOtp(phone));

      if (!result?.success) {
        Alert.alert(
          'Error',
          result?.message || 'Failed to resend OTP. Please try again.',
        );
        return;
      }

      setRefCode(generateRef());
      setResendCountdown(RESEND_COOLDOWN);
    } catch {
      Alert.alert('Error', 'Something went wrong while resending OTP.');
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpChange = (
    text: string,
    onChange: (value: string) => void,
  ) => {
    const cleaned = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
    onChange(cleaned);

    if (errors.otp) {
      clearErrors('otp');
    }
  };

  const resendText = isResending
    ? 'Resending...'
    : resendCountdown > 0
    ? `Resend in ${resendCountdown}s`
    : 'Resend OTP';

  return {
    control,
    handleSubmit,
    errors,
    isLoading,
    isResending,
    refCode,
    otpRules,
    onSubmit,
    handleResend,
    handleOtpChange,
    resendCountdown,
    isResendDisabled,
    resendText,
  };
};