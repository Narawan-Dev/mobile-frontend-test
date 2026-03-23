import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { OTP_LENGTH } from '../../constants/app';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { requestOtp, signInWithPhone } from '../../store/thunks/authThunks';
import { OtpFormValues, Props } from './types';

type UseOtpParams = Pick<Props, 'navigation' | 'route'>;

export const useOtp = ({ navigation, route }: UseOtpParams) => {
  const generateRef = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const { phone } = route.params;
  const dispatch = useAppDispatch();
  const { hasPin } = useAppSelector(state => state.auth);

  const [refCode, setRefCode] = useState(generateRef());
  const [submitError, setSubmitError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<OtpFormValues>({
    defaultValues: {
      otp: '',
    },
    mode: 'onChange',
  });

  const otpValue = watch('otp');

  const isValidOtp = useMemo(() => {
    return otpValue?.length === OTP_LENGTH;
  }, [otpValue]);

  const isLoading = isSigningIn || isResending;

  const onSubmit = async (data: OtpFormValues) => {
    if (isLoading) {
      return;
    }

    if (data.otp.length !== OTP_LENGTH) {
      setError('otp', {
        type: 'manual',
        message: `Please enter the full ${OTP_LENGTH}-digit OTP.`,
      });
      return;
    }

    setSubmitError('');
    setIsSigningIn(true);

    try {
      const result = await dispatch(signInWithPhone(phone, data.otp));

      if (result?.success) {
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
        return;
      }

      setSubmitError(result?.message || 'Invalid OTP. Please try again.');
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleResend = async () => {
    if (isLoading) {
      return;
    }

    setSubmitError('');
    setValue('otp', '');
    clearErrors('otp');
    setIsResending(true);

    try {
      const result = await dispatch(requestOtp(phone));

      if (result?.success) {
        setRefCode(generateRef());
        return;
      }

      setSubmitError(result?.message || 'Failed to resend OTP. Please try again.');
    } catch (error) {
      setSubmitError('Something went wrong while resending OTP.');
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

    if (submitError) {
      setSubmitError('');
    }

    if (errors.otp) {
      clearErrors('otp');
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    submitError,
    isValidOtp,
    isLoading,
    isResending,
    refCode,
    onSubmit,
    handleResend,
    handleOtpChange,
  };
};