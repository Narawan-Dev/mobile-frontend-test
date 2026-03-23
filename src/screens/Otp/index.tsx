import React from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';

import CustomAppText from '../../components/CustomAppText';
import CustomHeaderArrow from '../../components/CustomHeaderArrow';
import CustomAuthHeader from '../../components/CustomAuthHeader';
import CustomFloatingInput from '../../components/CustomFloatingInput';
import CustomAuthCard from '../../components/CustomAuthCard';
import CustomLoadingOverlay from '../../components/CustomLoadingOverlay';

import { colors } from '../../theme/colors';
import { styles } from './styles';

import { Props } from './types';
import { useOtp } from './useOtp';

const OtpScreen = ({ navigation, route }: Props) => {
  const {
    control,
    handleSubmit,
    errors,
    submitError,
    isLoading,
    isResending,
    refCode,
    otpRules,
    onSubmit,
    handleResend,
    handleOtpChange,
  } = useOtp({ navigation, route });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
        translucent={false}
      />

      <SafeAreaView
        edges={['left', 'right', 'bottom']}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.headerWrapper}>
            <CustomAuthHeader
              title="Sign In"
              subtitle="An OTP will be sent to your phone number"
            />

            <CustomHeaderArrow
              onPress={() => {
                if (!isLoading) {
                  navigation.goBack();
                }
              }}
              iconColor={colors.background}
            />
          </View>

          <CustomAuthCard style={styles.cardContent}>
            <View>
              <Controller
                control={control}
                name="otp"
                rules={otpRules}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomFloatingInput
                    label="OTP"
                    placeholder="Enter OTP"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={text => handleOtpChange(text, onChange)}
                    keyboardType="number-pad"
                    maxLength={6}
                    editable={!isLoading}
                    errorText={errors.otp?.message}
                  />
                )}
              />

              {!errors.otp?.message && !!submitError && (
                <CustomAppText
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: colors.error ?? '#DC2626',
                  }}
                >
                  {submitError}
                </CustomAppText>
              )}

              <View style={styles.row}>
                <CustomAppText style={styles.refText}>
                  Ref Code: {refCode}
                </CustomAppText>

                <TouchableOpacity
                  style={styles.resendContainer}
                  onPress={handleResend}
                  activeOpacity={0.8}
                  disabled={isLoading}
                >
                  <MaterialIcons
                    name="refresh"
                    size={20}
                    color={colors.textMuted}
                  />
                  <CustomAppText style={styles.resendText}>
                    {isResending ? 'Resending...' : 'Resend OTP'}
                  </CustomAppText>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                isLoading && styles.buttonDisabled,
              ]}
              disabled={isLoading}
              activeOpacity={0.8}
              onPress={handleSubmit(onSubmit)}
            >
              <CustomAppText
                variant="button"
                style={[
                  styles.buttonText,
                  isLoading && styles.buttonTextDisabled,
                ]}
              >
                Next
              </CustomAppText>
            </TouchableOpacity>
          </CustomAuthCard>
        </KeyboardAvoidingView>

        <CustomLoadingOverlay visible={isLoading} />
      </SafeAreaView>
    </>
  );
};

export default OtpScreen;