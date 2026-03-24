import { Alert, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';

import { PHONE_LENGTH } from '../../constants/app';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { requestOtp } from '../../store/thunks/authThunks';
import { SignInFormValues, SignInNavigationProp } from './types';

const useSignIn = (navigation: SignInNavigationProp) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      phone: '',
    },
  });

  const phoneRules = {
    required: 'Phone number is required',
    pattern: {
      value: /^0\d{9}$/,
      message: 'Please enter a valid phone number',
    },
  };

  const sanitizePhone = (text: string) => {
    return text.replace(/\D/g, '').slice(0, PHONE_LENGTH);
  };

  const onSubmit = async (values: SignInFormValues) => {
    if (loading) {
      return;
    }

    Keyboard.dismiss();

    const cleanedPhone = sanitizePhone(values.phone);
    const result = await dispatch(requestOtp(cleanedPhone));

    if (result?.success) {
      navigation.navigate('Otp', { phone: cleanedPhone });
      return;
    }

    Alert.alert('Failed to send OTP', result?.message || 'Please try again');
  };

  return {
    control,
    handleSubmit,
    errors,
    loading,
    error,
    onSubmit,
    phoneRules,
    sanitizePhone,
  };
};

export default useSignIn;