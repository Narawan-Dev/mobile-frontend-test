import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { useAppSelector } from '../../store/hooks';
import { userApi } from '../../services/api/userApi';
import { WithdrawFormValues } from './types';
import * as secureAuth from '../../services/storage/secureAuth';

const useWithdraw = () => {
  const [loading, setLoading] = useState(false);

  const availableBalance = useAppSelector(s => s.auth.availableBalance ?? 0);
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<WithdrawFormValues>({
    defaultValues: {
      amount: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const watchedAmount = watch('amount');

  const isButtonDisabled = loading;

  const handleAmountChange = (
    text: string,
    onChange: (value: string) => void,
  ) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    onChange(cleaned);
  };

  const getDisplayAmount = (value: string) => {
    return value ? Number(value).toLocaleString() : '';
  };

  const onSubmit = async (data: WithdrawFormValues) => {
    try {
      setLoading(true);

      const token = await secureAuth.getToken();

      if (!token) {
        Alert.alert('Not signed in');
        return;
      }

      const result = await userApi.withdraw(token, data.amount);

      if (result?.message === 'success') {
        reset();

        Alert.alert('Success', 'Withdrawal successful', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home', {
                shouldRefetch: true,
              });
            },
          },
        ]);

        return;
      }

      Alert.alert('Failed', result?.message || 'Withdrawal failed');
    } catch (error) {
      Alert.alert('Error', 'Unable to complete withdrawal');
    } finally {
      setLoading(false);
    }
  };

  const amountRules = {
    required: 'Please enter withdrawal amount',
    validate: {
      greaterThanZero: (value: string) =>
        Number(value) > 0 || 'Amount must be greater than 0',
      maxAvailable: (value: string) =>
        Number(value) <= availableBalance ||
        `Amount cannot exceed available balance ($${availableBalance.toLocaleString()})`,
    },
  };

  return {
    control,
    errors,
    loading,
    availableBalance,
    watchedAmount,
    isButtonDisabled,
    handleSubmit,
    onSubmit,
    handleAmountChange,
    getDisplayAmount,
    amountRules,
  };
};

export default useWithdraw;