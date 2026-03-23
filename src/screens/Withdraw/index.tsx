import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';

import CustomAppText from '../../components/CustomAppText';
import CustomLoadingOverlay from '../../components/CustomLoadingOverlay';
import { styles } from './styles';
import { colors } from '../../theme/colors';
import useWithdraw from './useWithdraw';
import { FEE_AMOUNT } from '../../constants/app';

const WithdrawScreen = () => {
  const {
    control,
    errors,
    loading,
    isButtonDisabled,
    handleSubmit,
    onSubmit,
    handleAmountChange,
    getDisplayAmount,
    amountRules,
  } = useWithdraw();

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
                rules={amountRules}
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
                        value={getDisplayAmount(value)}
                        onChangeText={text => handleAmountChange(text, onChange)}
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