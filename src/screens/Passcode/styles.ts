import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const horizontalPadding = 20;
const keypadWidth = width - horizontalPadding * 2;
const keySize = keypadWidth / 3;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screen: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: 72,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  logoWrapper: {
    marginTop: 70,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 30,
  },
  dotsWrapper: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 26,
    marginBottom: 42,
    justifyContent: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  dotFilled: {
    backgroundColor: '#4F2EDC',
  },
  keypad: {
    width: keypadWidth,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 'auto',
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
  },
  key: {
    width: keySize,
    height: keySize * 0.9,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  keyEmpty: {
    width: keySize,
    height: keySize * 0.9,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  keyText: {
    fontSize: 24,
    color: '#111827',
  },
});