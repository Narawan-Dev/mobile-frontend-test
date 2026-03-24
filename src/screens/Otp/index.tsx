import React from 'react';
import {
  View,
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
import CustomInput from '../../components/CustomInput';
import CustomAuthCard from '../../components/CustomAuthCard';
import CustomButton from '../../components/CustomButton';
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
    isLoading,
    refCode,
    otpRules,
    onSubmit,
    handleResend,
    handleOtpChange,
    isResendDisabled,
    resendText,
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
        style={styles.safeArea}
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
                  <CustomInput
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

              <View style={styles.row}>
                <CustomAppText
                  variant="caption"
                  color={colors.textMuted}
                >
                  Ref Code: {refCode}
                </CustomAppText>

                <View
                  style={[
                    styles.resendContainer,
                    isResendDisabled && styles.resendDisabled,
                  ]}
                >
                  <MaterialIcons
                    name="refresh"
                    size={20}
                    color={colors.textMuted}
                  />

                  <CustomAppText
                    variant="caption"
                    color={colors.textMuted}
                    style={styles.resendText}
                    onPress={handleResend}
                  >
                    {resendText}
                  </CustomAppText>
                </View>
              </View>
            </View>

            <CustomButton
              title="Next"
              disabled={isLoading}
              onPress={handleSubmit(onSubmit)}
              containerStyle={styles.button}
            />
          </CustomAuthCard>
        </KeyboardAvoidingView>

        <CustomLoadingOverlay visible={isLoading} />
      </SafeAreaView>
    </>
  );
};

export default OtpScreen;