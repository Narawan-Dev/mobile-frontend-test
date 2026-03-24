import React from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';

import CustomAppText from '../../components/CustomAppText';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomLoadingOverlay from '../../components/CustomLoadingOverlay';
import { styles } from './styles';
import { colors } from '../../theme/colors';
import useWithdraw from './useWithdraw';
import { FEE_AMOUNT } from '../../constants/app';
import { formatCurrency } from '../../utils/number';

const WithdrawScreen = () => {
  const {
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
            <CustomAppText
              variant="heading"
              align="center"
              color={colors.textPrimary}
              style={styles.headerTitle}
            >
              Withdrawal
            </CustomAppText>

            <View style={styles.section}>
              <CustomAppText
                variant="sectionTitle"
                color={colors.textPrimary}
                style={styles.sectionLabel}
              >
                Amount for Withdrawal
              </CustomAppText>

              <Controller
                control={control}
                name="amount"
                rules={amountRules}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <View
                      style={[
                        styles.amountCard,
                        errors.amount && styles.amountCardError,
                      ]}
                    >
                      <CustomAppText
                        variant="display"
                        style={styles.currencySymbol}
                      >
                        $
                      </CustomAppText>

                      <View style={styles.amountInputContainer}>
                        <CustomInput
                          value={getDisplayAmount(value)}
                          onBlur={() => {
                            handleAmountBlur(value, onChange);
                            onBlur();
                          }}
                          onChangeText={text =>
                            handleAmountChange(text, onChange)
                          }
                          placeholder="0.00"
                          placeholderTextColor={colors.disabledText}
                          keyboardType="decimal-pad"
                          editable={!loading}
                          labelMode="hidden"
                          inputAlign="center"
                          containerStyle={styles.amountInputWrapper}
                          wrapperStyle={styles.amountInputInnerWrapper}
                          inputStyle={styles.amountInput}
                        />
                      </View>
                    </View>

                    {errors.amount && (
                      <CustomAppText
                        variant="errorText"
                        color={colors.error}
                        style={styles.errorText}
                      >
                        {errors.amount.message}
                      </CustomAppText>
                    )}
                  </>
                )}
              />
            </View>

            <View style={styles.section}>
              <CustomAppText
                variant="sectionTitle"
                color={colors.textPrimary}
                style={styles.sectionLabel}
              >
                Transfer To
              </CustomAppText>

              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <CustomAppText variant="bodyMedium" color={colors.textMuted}>
                    Name
                  </CustomAppText>
                  <CustomAppText variant="bodyMedium">
                    John Doe
                  </CustomAppText>
                </View>

                <View style={styles.infoRow}>
                  <CustomAppText variant="bodyMedium" color={colors.textMuted}>
                    Company
                  </CustomAppText>
                  <CustomAppText variant="bodyMedium">
                    Salary Hero
                  </CustomAppText>
                </View>

                <View style={styles.infoRow}>
                  <CustomAppText variant="bodyMedium" color={colors.textMuted}>
                    Bank
                  </CustomAppText>
                  <CustomAppText variant="bodyMedium">
                    SCB
                  </CustomAppText>
                </View>

                <View style={styles.infoRow}>
                  <CustomAppText variant="bodyMedium" color={colors.textMuted}>
                    Bank Account
                  </CustomAppText>
                  <CustomAppText variant="bodyMedium">
                    XXX-XXX-2231
                  </CustomAppText>
                </View>

                <View style={[styles.infoRow, styles.lastInfoRow]}>
                  <CustomAppText variant="bodyMedium" color={colors.textMuted}>
                    Fee
                  </CustomAppText>
                  <CustomAppText
                    variant="bodyMedium"
                    color={colors.primary}
                  >
                    -{formatCurrency(FEE_AMOUNT)}
                  </CustomAppText>
                </View>
              </View>
            </View>

            <CustomButton
              title="Withdraw"
              disabled={isButtonDisabled}
              onPress={handleSubmit(onSubmit)}
            />
          </ScrollView>
        </View>
      </SafeAreaView>

      <CustomLoadingOverlay visible={loading} />
    </>
  );
};

export default WithdrawScreen;