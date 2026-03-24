import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useAppSelector } from '../../store/hooks';
import { userApi } from '../../services/api/userApi';
import { WithdrawFormValues } from './types';
import * as secureAuth from '../../services/storage/secureAuth';
import {
  formatDecimalAmount,
  sanitizeDecimalInput,
  normalizeDecimalAmount,
} from '../../utils/number';
import { MainTabParamList } from '../../navigation/types';

const useWithdraw = () => {
  const [loading, setLoading] = useState(false);

  const availableBalance = useAppSelector(s => s.auth.availableBalance ?? 0);
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<WithdrawFormValues>({
    defaultValues: {
      amount: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const isButtonDisabled = loading;

  const handleAmountChange = (
    text: string,
    onChange: (value: string) => void,
  ) => {
    onChange(sanitizeDecimalInput(text, 2));
  };

  const handleAmountBlur = (
    value: string,
    onChange: (value: string) => void,
  ) => {
    const normalized = normalizeDecimalAmount(value, 2);
    onChange(normalized);
  };

  const getDisplayAmount = (value: string) => {
    return formatDecimalAmount(value);
  };

  const onSubmit = async (data: WithdrawFormValues) => {
    try {
      setLoading(true);

      const token = await secureAuth.getToken();

      if (!token) {
        Alert.alert('Not signed in');
        return;
      }

      const normalizedAmount = normalizeDecimalAmount(data.amount, 2);

      setValue('amount', normalizedAmount, {
        shouldValidate: true,
      });

      const result = await userApi.withdraw(token, normalizedAmount);

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
      Alert.alert('Error', (error as Error).message || 'Unable to complete withdrawal');
    } finally {
      setLoading(false);
    }
  };

  const amountRules = {
    required: 'Please enter withdrawal amount',
    validate: {
      validNumber: (value: string) => !isNaN(Number(value)) || 'Invalid amount',
      greaterThanZero: (value: string) =>
        Number(value) > 0 || 'Amount must be greater than 0',
      maxAvailable: (value: string) => {
        const num = Number(value);
        const max = (availableBalance ?? 0) * 0.5;

        return (
          num <= max ||
          `Amount cannot exceed available balance ($${max.toLocaleString()})`
        );
      },
    },
  };

  return {
    control,
    errors,
    loading,
    isButtonDisabled,
    handleSubmit,
    onSubmit,
    handleAmountChange,
    handleAmountBlur,
    getDisplayAmount,
    amountRules,
  };
};

export default useWithdraw;