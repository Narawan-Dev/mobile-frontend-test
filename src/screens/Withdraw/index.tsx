import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import CustomAppText from '../../components/CustomAppText';
import CustomLoadingOverlay from '../../components/CustomLoadingOverlay';
import { styles } from './styles';
import { colors } from '../../theme/colors';
import { useAppSelector } from '../../store/hooks';
import { userApi } from '../../services/api/userApi';

const FEE_AMOUNT = 5;

type WithdrawFormValues = {
  amount: string;
};

const WithdrawScreen = () => {
  const [loading, setLoading] = useState(false);

  const token = useAppSelector(s => s.auth.token);
  const availableBalance = useAppSelector(s => s.auth.available ?? 0);
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
    mode: 'onChange',
  });

  const watchedAmount = watch('amount');

  const isButtonDisabled =
    !watchedAmount || Number(watchedAmount) <= 0 || !!errors.amount || loading;

  const onSubmit = async (data: WithdrawFormValues) => {
    if (!token) {
      Alert.alert('Not signed in');
      return;
    }

    try {
      setLoading(true);

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

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
        translucent={false}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <CustomAppText style={styles.headerTitle}>Withdrawal</CustomAppText>

            <View style={styles.section}>
              <CustomAppText style={styles.sectionLabel}>
                Amount for Withdrawal
              </CustomAppText>

              <Controller
                control={control}
                name="amount"
                rules={{
                  required: 'Please enter withdrawal amount',
                  validate: {
                    greaterThanZero: value =>
                      Number(value) > 0 || 'Amount must be greater than 0',
                    maxAvailable: value =>
                      Number(value) <= availableBalance ||
                      `Amount cannot exceed available balance ($${availableBalance.toLocaleString()})`,
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <View
                      style={[
                        styles.amountCard,
                        errors.amount && styles.amountCardError,
                      ]}
                    >
                      <CustomAppText style={styles.currencySymbol}>
                        $
                      </CustomAppText>

                      <TextInput
                        value={value ? Number(value).toLocaleString() : ''}
                        onChangeText={text => {
                          const cleaned = text.replace(/[^0-9]/g, '');
                          onChange(cleaned);
                        }}
                        placeholder="0"
                        placeholderTextColor={colors.disabledText}
                        keyboardType="number-pad"
                        style={styles.amountInput}
                        editable={!loading}
                      />
                    </View>

                    {errors.amount && (
                      <CustomAppText style={styles.errorText}>
                        {errors.amount.message}
                      </CustomAppText>
                    )}
                  </>
                )}
              />
            </View>

            <View style={styles.section}>
              <CustomAppText style={styles.sectionLabel}>
                Transfer To
              </CustomAppText>

              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <CustomAppText style={styles.infoLabel}>Name</CustomAppText>
                  <CustomAppText style={styles.infoValue}>
                    John Doe
                  </CustomAppText>
                </View>

                <View style={styles.infoRow}>
                  <CustomAppText style={styles.infoLabel}>Company</CustomAppText>
                  <CustomAppText style={styles.infoValue}>
                    Salary Hero
                  </CustomAppText>
                </View>

                <View style={styles.infoRow}>
                  <CustomAppText style={styles.infoLabel}>Bank</CustomAppText>
                  <CustomAppText style={styles.infoValue}>SCB</CustomAppText>
                </View>

                <View style={styles.infoRow}>
                  <CustomAppText style={styles.infoLabel}>
                    Bank Account
                  </CustomAppText>
                  <CustomAppText style={styles.infoValue}>
                    XXX-XXX-2231
                  </CustomAppText>
                </View>

                <View style={[styles.infoRow, styles.lastInfoRow]}>
                  <CustomAppText style={styles.infoLabel}>Fee</CustomAppText>
                  <CustomAppText style={styles.feeValue}>
                    ${FEE_AMOUNT}
                  </CustomAppText>
                </View>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.withdrawButton,
                isButtonDisabled && styles.withdrawButtonDisabled,
              ]}
              disabled={isButtonDisabled}
              onPress={handleSubmit(onSubmit)}
            >
              <CustomAppText style={styles.withdrawButtonText}>
                Withdraw
              </CustomAppText>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>

      <CustomLoadingOverlay visible={loading} />
    </>
  );
};

export default WithdrawScreen;