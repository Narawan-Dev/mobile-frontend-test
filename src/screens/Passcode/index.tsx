import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import CustomAppText from '../../components/CustomAppText';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './styles';
import CustomLogo from '../../components/CustomLogo';

type Props = NativeStackScreenProps<RootStackParamList, 'Passcode'>;

const PasscodeScreen = ({ navigation, route }: Props) => {
  const { mode, initialPasscode } = route.params;
  const [passcode, setPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCreateMode = mode === 'create';
  const isConfirmCreateMode = mode === 'confirmCreate';
  const isResetMode = mode === 'reset';
  const isConfirmResetMode = mode === 'confirmReset';

  const title = useMemo(() => {
    if (isCreateMode) return 'ตั้งรหัสผ่าน 6 หลัก';
    if (isConfirmCreateMode) return 'ยืนยันรหัสผ่าน';
    if (isResetMode) return 'ตั้ง PIN ใหม่';
    return 'ยืนยัน PIN ใหม่';
  }, [isCreateMode, isConfirmCreateMode, isResetMode]);

  const subtitle = useMemo(() => {
    if (isCreateMode) {
      return 'เพื่อใช้สำหรับเข้าสู่ระบบ และเบิกเงินล่วงหน้า';
    }
    if (isConfirmCreateMode) {
      return 'โดยใส่ตัวเลขให้ตรงกับหน้าที่แล้ว';
    }
    if (isResetMode) {
      return 'กรุณาตั้งรหัส PIN ใหม่ 6 หลัก';
    }
    return 'กรุณาใส่ PIN ใหม่อีกครั้งเพื่อยืนยัน';
  }, [isCreateMode, isConfirmCreateMode, isResetMode]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        const actionType = e.data.action.type;

        const allowNavigation =
          actionType === 'RESET' || actionType === 'REPLACE';

        if (allowNavigation) {
          return;
        }

        e.preventDefault();
      });

      return unsubscribe;
    }, [navigation]),
  );

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
          mode: 'confirmCreate',
          initialPasscode: passcode,
        });
        return;
      }

      if (isResetMode) {
        navigation.replace('Passcode', {
          mode: 'confirmReset',
          initialPasscode: passcode,
        });
        return;
      }

      if (passcode !== initialPasscode) {
        Alert.alert('รหัสผ่านไม่ตรงกัน', 'กรุณาลองอีกครั้ง');
        setPasscode('');
        return;
      }

      setIsSubmitting(true);

      const successMessage = isConfirmResetMode
        ? 'รีเซ็ต PIN เรียบร้อยแล้ว'
        : 'ตั้งรหัสผ่านเรียบร้อยแล้ว';

      Alert.alert('สำเร็จ', successMessage, [
        {
          text: 'ตกลง',
          onPress: () => {
            if (isConfirmResetMode) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'MainTab' }],
                }),
              );
            } else {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'MainTab' }],
                }),
              );
            }
          },
        },
      ]);
    }, 200);

    return () => clearTimeout(timer);
  }, [
    passcode,
    isCreateMode,
    isResetMode,
    isConfirmResetMode,
    navigation,
    initialPasscode,
  ]);

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
            <View style={styles.content}>
              <View style={styles.logoWrapper}>
                <CustomLogo color="#3c1ecb" />
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