import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

import CustomAppText from '../../components/CustomAppText';
import CustomLogo from '../../components/CustomLogo';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { PASSCODE_LENGTH, SUBMIT_DELAY } from '../../constants/app';
import { colors } from '../../theme/colors';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Passcode'>;

const PasscodeScreen = ({ navigation, route }: Props) => {
  const { mode, initialPasscode } = route.params;
  const insets = useSafeAreaInsets();

  const [passcode, setPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCreateMode = mode === 'create';
  const isResetMode = mode === 'reset';
  const isConfirmCreateMode = mode === 'confirmCreate';
  const isConfirmResetMode = mode === 'confirmReset';
  const isConfirmMode = isConfirmCreateMode || isConfirmResetMode;

  const getTitle = () => {
    if (isCreateMode) return 'Set a 6-digit Passcode';
    if (isConfirmCreateMode) return 'Confirm Passcode';
    if (isResetMode) return 'Set New PIN';
    return 'Confirm New PIN';
  };

  const getSubtitle = () => {
    if (isCreateMode) {
      return 'This passcode will be used for login';
    }

    if (isConfirmCreateMode) {
      return 'Re-enter the same passcode as before';
    }

    if (isResetMode) {
      return 'Please set a new 6-digit PIN';
    }

    return 'Please re-enter your new PIN to confirm';
  };

  const resetToMainTab = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTab' }],
      }),
    );
  };

  const goToConfirmScreen = () => {
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
    }
  };

  const handlePasscodeMismatch = () => {
    Alert.alert('Passcode mismatch', 'Please try again');
    setPasscode('');
  };

  const handlePasscodeSuccess = () => {
    setIsSubmitting(true);

    const successMessage = isConfirmResetMode
      ? 'PIN has been reset successfully'
      : 'Passcode has been set successfully';

    Alert.alert('Success', successMessage, [
      {
        text: 'OK',
        onPress: resetToMainTab,
      },
    ]);
  };

  const handlePressNumber = (num: string) => {
    if (passcode.length >= PASSCODE_LENGTH || isSubmitting) {
      return;
    }

    setPasscode(prev => prev + num);
  };

  const handleDelete = () => {
    if (isSubmitting) {
      return;
    }

    setPasscode(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    if (passcode.length !== PASSCODE_LENGTH) {
      return;
    }

    const timer = setTimeout(() => {
      if (isCreateMode || isResetMode) {
        goToConfirmScreen();
        return;
      }

      if (isConfirmMode && passcode !== initialPasscode) {
        handlePasscodeMismatch();
        return;
      }

      if (isConfirmMode) {
        handlePasscodeSuccess();
      }
    }, SUBMIT_DELAY);

    return () => clearTimeout(timer);
  }, [
    passcode,
    initialPasscode,
    isCreateMode,
    isResetMode,
    isConfirmMode,
    isConfirmResetMode,
  ]);

  const renderDot = (filled: boolean, index: number) => {
    return <View key={index} style={[styles.dot, filled && styles.dotFilled]} />;
  };

  const renderNumberButton = (value: string) => {
    return (
      <TouchableOpacity
        key={value}
        style={styles.key}
        activeOpacity={0.7}
        onPress={() => handlePressNumber(value)}
      >
        <CustomAppText style={styles.keyText}>{value}</CustomAppText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
        translucent={false}
      />

      <SafeAreaView
        edges={['top', 'left', 'right', 'bottom']}
        style={styles.safeArea}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.screen}>
            <View style={styles.content}>
              <View style={styles.logoWrapper}>
                <CustomLogo color={colors.primary} />
              </View>

              <CustomAppText variant="title" style={styles.title}>
                {getTitle()}
              </CustomAppText>

              <CustomAppText variant="subtitle" style={styles.subtitle}>
                {getSubtitle()}
              </CustomAppText>

              <View style={styles.dotsWrapper}>
                {Array.from({ length: PASSCODE_LENGTH }).map((_, index) =>
                  renderDot(index < passcode.length, index),
                )}
              </View>
            </View>

            <View style={[styles.keypad, { paddingBottom: Math.max(insets.bottom, 12) }]}>
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
                  <MaterialIcons
                    name="backspace"
                    size={28}
                    color={colors.textPrimary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default PasscodeScreen;