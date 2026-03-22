import React, { useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';

import CustomAppText from '../../components/CustomAppText';
import CustomHeaderArrow from '../../components/CustomHeaderArrow';
import CustomAuthHeader from '../../components/CustomAuthHeader';
import CustomFloatingInput from '../../components/CustomFloatingInput';
import CustomAuthCard from '../../components/CustomAuthCard';

import { RootStackParamList } from '../../navigation/AppNavigator';
import { OTP_LENGTH } from '../../constants/app';
import { colors } from '../../theme/colors';
import { styles } from './styles';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { signInWithPhone } from '../../store/thunks/authThunks';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

type OtpFormValues = {
  otp: string;
};

const OtpScreen = ({ navigation, route }: Props) => {
  const generateRef = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const { phone } = route.params;
  const dispatch = useAppDispatch();
  const hasPin = useAppSelector(state => state.auth.hasPin);

  const [refCode] = useState(generateRef());
  const [submitError, setSubmitError] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
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

  const onSubmit = async (data: OtpFormValues) => {
    if (data.otp.length !== OTP_LENGTH) {
      setError('otp', {
        type: 'manual',
        message: `Please enter the full ${OTP_LENGTH}-digit OTP.`,
      });
      return;
    }

    setSubmitError('');

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
  };

  const handleResend = () => {
    console.log('resend OTP');
    setValue('otp', '');
    clearErrors('otp');
    setSubmitError('');
  };

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
              onPress={() => navigation.goBack()}
              iconColor={colors.background}
            />
          </View>

          <CustomAuthCard style={styles.cardContent}>
            <View>
              <Controller
                control={control}
                name="otp"
                rules={{
                  required: 'OTP is required.',
                  validate: value =>
                    value.length === OTP_LENGTH ||
                    `Please enter the full ${OTP_LENGTH}-digit OTP.`,
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomFloatingInput
                    label="OTP"
                    placeholder="Enter OTP"
                    value={value}
                    onChangeText={text => {
                      const cleaned = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
                      onChange(cleaned);

                      if (submitError) {
                        setSubmitError('');
                      }

                      if (errors.otp) {
                        clearErrors('otp');
                      }
                    }}
                    keyboardType="number-pad"
                    maxLength={OTP_LENGTH}
                  />
                )}
              />

              {!!errors.otp?.message && (
                <CustomAppText
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: colors.error ?? '#DC2626',
                  }}
                >
                  {errors.otp.message}
                </CustomAppText>
              )}

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
                >
                  <MaterialIcons
                    name="refresh"
                    size={20}
                    color={colors.textMuted}
                  />
                  <CustomAppText style={styles.resendText}>
                    Resend OTP
                  </CustomAppText>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                (!isValidOtp || isSubmitting) && styles.buttonDisabled,
              ]}
              disabled={!isValidOtp || isSubmitting}
              activeOpacity={0.8}
              onPress={handleSubmit(onSubmit)}
            >
              <CustomAppText
                variant="button"
                style={[
                  styles.buttonText,
                  (!isValidOtp || isSubmitting) && styles.buttonTextDisabled,
                ]}
              >
                Next
              </CustomAppText>
            </TouchableOpacity>
          </CustomAuthCard>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default OtpScreen;