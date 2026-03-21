import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomAppText from '../../components/CustomAppText';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './styles';
import CustomHeaderArrow from '../../components/CustomHeaderArrow';

type Props = NativeStackScreenProps<RootStackParamList, 'Passcode'>;

const PasscodeScreen = ({ navigation, route }: Props) => {
  const { mode, initialPasscode } = route.params;
  const [passcode, setPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCreateMode = mode === 'create';

  const title = useMemo(() => {
    return isCreateMode ? 'ตั้งรหัสผ่าน 6 หลัก' : 'ยืนยันรหัสผ่าน';
  }, [isCreateMode]);

  const subtitle = useMemo(() => {
    return isCreateMode
      ? 'เพื่อใช้สำหรับเข้าสู่ระบบ และเบิกเงินล่วงหน้า'
      : 'โดยใส่ตัวเลขให้ตรงกับหน้าที่แล้ว';
  }, [isCreateMode]);

  const handlePressNumber = (num: string) => {
    if (passcode.length >= 6 || isSubmitting) return;
    setPasscode(prev => prev + num);
  };

  const handleDelete = () => {
    if (isSubmitting) return;
    setPasscode(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    if (passcode.length !== 6) return;

    const timer = setTimeout(() => {
      if (isCreateMode) {
        navigation.replace('Passcode', {
          mode: 'confirm',
          initialPasscode: passcode,
        });
        return;
      }

      if (passcode !== initialPasscode) {
        Alert.alert('รหัสผ่านไม่ตรงกัน', 'กรุณาลองยืนยันรหัสผ่านอีกครั้ง');
        setPasscode('');
        return;
      }

      setIsSubmitting(true);

      Alert.alert('สำเร็จ', 'ตั้งรหัสผ่านเรียบร้อยแล้ว', [
        {
          text: 'ตกลง',
          onPress: () => {
            navigation.navigate('MainTab');
          },
        },
      ]);
    }, 200);

    return () => clearTimeout(timer);
  }, [passcode, isCreateMode, navigation, initialPasscode]);

  const renderDot = (filled: boolean, index: number) => (
    <View key={index} style={[styles.dot, filled && styles.dotFilled]} />
  );

  const renderNumberButton = (value: string) => (
    <TouchableOpacity
      key={value}
      style={styles.key}
      activeOpacity={0.7}
      onPress={() => handlePressNumber(value)}
    >
      <CustomAppText style={styles.keyText}>{value}</CustomAppText>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
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
          <View style={styles.screen}>
            <CustomHeaderArrow onPress={() => navigation.goBack()} />

            <View style={styles.content}>
              <View style={styles.logoWrapper}>
                <View style={styles.logoShape}>
                  <View style={styles.logoTopRight} />
                  <View style={styles.logoMiddleLeft} />
                  <View style={styles.logoBottomLeft} />
                  <View style={styles.logoBottomRight} />
                </View>
              </View>

              <CustomAppText variant="title" style={styles.title}>
                {title}
              </CustomAppText>

              <CustomAppText variant="subtitle" style={styles.subtitle}>
                {subtitle}
              </CustomAppText>

              <View style={styles.dotsWrapper}>
                {Array.from({ length: 6 }).map((_, index) =>
                  renderDot(index < passcode.length, index),
                )}
              </View>

              <View style={styles.keypad}>
                <View style={styles.row}>
                  {renderNumberButton('1')}
                  {renderNumberButton('2')}
                  {renderNumberButton('3')}
                </View>

                <View style={styles.row}>
                  {renderNumberButton('4')}
                  {renderNumberButton('5')}
                  {renderNumberButton('6')}
                </View>

                <View style={styles.row}>
                  {renderNumberButton('7')}
                  {renderNumberButton('8')}
                  {renderNumberButton('9')}
                </View>

                <View style={styles.row}>
                  <View style={styles.keyEmpty} />
                  {renderNumberButton('0')}
                  <TouchableOpacity
                    style={styles.key}
                    activeOpacity={0.7}
                    onPress={handleDelete}
                  >
                    <MaterialIcons name="backspace" size={28} color="#111827" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default PasscodeScreen;