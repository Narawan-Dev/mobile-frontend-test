import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomAppText from '../../components/CustomAppText';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeaderArrow from '../../components/CustomHeaderArrow';
import CustomAuthHeader from '../../components/CustomAuthHeader';
import CustomFloatingInput from '../../components/CustomFloatingInput';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

const OtpScreen = ({ navigation, route }: Props) => {
  const generateRef = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const [refCode] = useState(generateRef());

  const handleOtpChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 6);
    setOtp(cleaned);
  };

  const isValidOtp = otp.length === 6;

  const handleNext = () => {
    if (!isValidOtp) return;

    console.log('verify otp:', otp, 'phone:', phone);

    navigation.navigate('Passcode', {
      mode: 'create',
    });
  };

  const handleResend = () => {
    console.log('resend OTP');
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
          <View style={styles.headerWrapper}>
            <CustomAuthHeader
              title="เข้าสู่ระบบอย่างปลอดภัย"
              subtitle="OTP จะถูกส่งไปที่เบอร์โทรศัพท์ของคุณ"
            />

            <CustomHeaderArrow
              onPress={() => navigation.goBack()}
              iconColor="#FFFFFF"
            />
          </View>

          <View style={styles.card}>
            <View>
              <CustomFloatingInput
                label="OTP"
                placeholder="กรุณาใส่รหัส OTP"
                value={otp}
                onChangeText={handleOtpChange}
                keyboardType="number-pad"
                maxLength={6}
              />

              <View style={styles.row}>
                <CustomAppText style={styles.refText}>
                  รหัสอ้างอิง: {refCode}
                </CustomAppText>

                <TouchableOpacity
                  style={styles.resendContainer}
                  onPress={handleResend}
                  activeOpacity={0.8}
                >
                  <MaterialIcons name="refresh" size={20} color="#6B7280" />
                  <CustomAppText style={styles.resendText}>
                    ส่งรหัส OTP อีกครั้ง
                  </CustomAppText>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, !isValidOtp && styles.buttonDisabled]}
              disabled={!isValidOtp}
              activeOpacity={0.8}
              onPress={handleNext}
            >
              <CustomAppText
                variant="button"
                style={[
                  styles.buttonText,
                  !isValidOtp && styles.buttonTextDisabled,
                ]}
              >
                ต่อไป
              </CustomAppText>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default OtpScreen;