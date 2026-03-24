import React from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CustomAppText from '../../components/CustomAppText';
import CustomAuthHeader from '../../components/CustomAuthHeader';
import CustomInput from '../../components/CustomInput';
import CustomAuthCard from '../../components/CustomAuthCard';
import CustomButton from '../../components/CustomButton';
import CustomLoadingOverlay from '../../components/CustomLoadingOverlay';

import { styles } from './styles';
import { PHONE_LENGTH } from '../../constants/app';
import { colors } from '../../theme/colors';
import { RootStackParamList } from '../../navigation/types';
import useSignIn from './useSignIn';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    errors,
    loading,
    error,
    onSubmit,
    phoneRules,
    sanitizePhone,
  } = useSignIn(navigation);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
        translucent={false}
      />

      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <CustomAuthHeader
            title="Sign In"
            subtitle="Please enter your phone number"
          />

          <CustomAuthCard style={styles.cardContent}>
            <View style={styles.formSection}>
              <Controller
                control={control}
                name="phone"
                rules={phoneRules}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    label="Phone Number"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(text: string) => {
                      onChange(sanitizePhone(text));
                    }}
                    keyboardType="number-pad"
                    maxLength={PHONE_LENGTH}
                    placeholder="Example: 0812345678"
                    errorText={errors.phone?.message}
                    editable={!loading}
                  />
                )}
              />
            </View>

            {!!error && !errors.phone && (
              <CustomAppText
                variant="body"
                color={colors.error}
                style={styles.apiErrorText}
              >
                {error}
              </CustomAppText>
            )}

            <CustomButton
              title="Send OTP"
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
              containerStyle={styles.button}
            />
          </CustomAuthCard>

          <CustomLoadingOverlay visible={loading} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default SignInScreen;