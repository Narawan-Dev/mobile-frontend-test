import React from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import CustomAppText from '../../components/CustomAppText';
import CustomLogo from '../../components/CustomLogo';
import { PASSCODE_LENGTH } from '../../constants/app';
import { colors } from '../../theme/colors';
import { styles } from './styles';

import { Props } from './types';
import { usePasscode } from './usePasscode';

const PasscodeScreen = ({ navigation, route }: Props) => {
  const insets = useSafeAreaInsets();

  const {
    passcode,
    getTitle,
    getSubtitle,
    handlePressNumber,
    handleDelete,
  } = usePasscode({ navigation, route });

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

            <View
              style={[
                styles.keypad,
                { paddingBottom: Math.max(insets.bottom, 12) },
              ]}
            >
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