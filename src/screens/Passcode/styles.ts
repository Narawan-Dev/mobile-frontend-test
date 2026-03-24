import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const horizontalPadding = 20;
const keypadWidth = width - horizontalPadding * 2;
const keySize = keypadWidth / 3;
const keyHeight = Math.min(keySize * 0.9, height * 0.105);

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  logoWrapper: {
    marginTop: 24,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 24,
  },
  dotsWrapper: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 26,
    justifyContent: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.backgroundSecondary,
  },
  dotFilled: {
    backgroundColor: colors.primary,
  },
  keypad: {
    width: '100%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
  },
  key: {
    flex: 1,
    height: keyHeight,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  keyEmpty: {
    flex: 1,
    height: keyHeight,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  keyDisabled: {
    opacity: 0.4,
  },
  keyText: {
    fontSize: 24,
    color: colors.textPrimary,
  },
});