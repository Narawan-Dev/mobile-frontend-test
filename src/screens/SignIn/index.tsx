import React from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CustomAppText from '../../components/CustomAppText';
import CustomAuthHeader from '../../components/CustomAuthHeader';
import CustomFloatingInput from '../../components/CustomFloatingInput';
import CustomAuthCard from '../../components/CustomAuthCard';

import { styles } from './styles';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { PHONE_LENGTH } from '../../constants/app';
import { colors } from '../../theme/colors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signInWithPhone } from '../../store/thunks/authThunks';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

type SignInFormValues = {
  phone: string;
};

const SignInScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormValues>({
    mode: 'onChange',
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    if (loading) {
      return;
    }

    Keyboard.dismiss();

    const cleanedPhone = values.phone.replace(/\D/g, '').slice(0, PHONE_LENGTH);

    const result = await dispatch(signInWithPhone(cleanedPhone));

    if (result?.success) {
      navigation.navigate('Otp', { phone: cleanedPhone });
      return;
    }

    Alert.alert('เข้าสู่ระบบไม่สำเร็จ', result?.message || 'กรุณาลองใหม่อีกครั้ง');
  };

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
            title="เข้าสู่ระบบอย่างปลอดภัย"
            subtitle="กรุณาใส่เบอร์โทรศัพท์ เพื่อยืนยันตัวตน"
          />

          <CustomAuthCard style={styles.cardContent}>
            <View style={styles.formSection}>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: 'กรุณากรอกเบอร์โทรศัพท์',
                  pattern: {
                    value: /^0\d{9}$/,
                    message: 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomFloatingInput
                    label="เบอร์โทรศัพท์"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(text: string) => {
                      const cleaned = text.replace(/\D/g, '').slice(0, PHONE_LENGTH);
                      onChange(cleaned);
                    }}
                    keyboardType="number-pad"
                    maxLength={PHONE_LENGTH}
                    placeholder="ตัวอย่าง: 0812345678"
                    errorText={errors.phone?.message}
                  />
                )}
              />
            </View>

            {!!error && !errors.phone && (
              <CustomAppText style={styles.apiErrorText}>
                {error}
              </CustomAppText>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                (!isValid || loading) && styles.buttonDisabled,
              ]}
              disabled={!isValid || loading}
              activeOpacity={0.85}
              onPress={handleSubmit(onSubmit)}
            >
              <CustomAppText
                variant="button"
                style={[
                  styles.buttonText,
                  (!isValid || loading) && styles.buttonTextDisabled,
                ]}
              >
                {loading ? 'กำลังส่ง...' : 'ส่งรหัส OTP'}
              </CustomAppText>
            </TouchableOpacity>
          </CustomAuthCard>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default SignInScreen;