import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomAppText from '../../components/CustomAppText';
import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAuthHeader from '../../components/CustomAuthHeader';
import CustomFloatingInput from '../../components/CustomFloatingInput';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen = ({ navigation }: Props) => {
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 10);
    setPhone(cleaned);
  };

  const isValidPhone = /^0\d{9}$/.test(phone);
  const showError = touched && phone.length > 0 && !isValidPhone;

  const handleSubmit = () => {
    setTouched(true);

    if (!isValidPhone) {
      return;
    }

    navigation.navigate('Otp', { phone });
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#3c1ecb"
        translucent={false}
      />

      <SafeAreaView
        edges={['left', 'right', 'bottom']}
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <CustomAuthHeader
            title="เข้าสู่ระบบอย่างปลอดภัย"
            subtitle="กรุณาใส่เบอร์โทรศัพท์ เพื่อยืนยันตัวตน"
          />

          <View style={styles.card}>
            <View>
              <CustomFloatingInput
                label="เบอร์โทรศัพท์"
                value={phone}
                onChangeText={handlePhoneChange}
                onBlur={() => setTouched(true)}
                keyboardType="number-pad"
                maxLength={10}
                placeholder="ตัวอย่าง: 0812345678"
                errorText={
                  showError ? 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง' : undefined
                }
              />
            </View>

            <TouchableOpacity
              style={[styles.button, !isValidPhone && styles.buttonDisabled]}
              disabled={!isValidPhone}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <CustomAppText
                variant="button"
                style={[
                  styles.buttonText,
                  !isValidPhone && styles.buttonTextDisabled,
                ]}
              >
                ส่งรหัส OTP
              </CustomAppText>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default SignInScreen;
