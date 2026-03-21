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
  content: {
    flex: 1,
    paddingTop: 72,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  backButton: {
    position: 'absolute',
    top: 18,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  logoWrapper: {
    marginTop: 70,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoShape: {
    width: 42,
    height: 42,
    position: 'relative',
  },
  logoTopRight: {
    position: 'absolute',
    top: 0,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4F2EDC',
  },
  logoMiddleLeft: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 18,
    height: 18,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: '#4F2EDC',
  },
  logoBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4F2EDC',
  },
  logoBottomRight: {
    position: 'absolute',
    bottom: 2,
    right: 10,
    width: 18,
    height: 18,
    borderBottomRightRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
    backgroundColor: '#4F2EDC',
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
  screen: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
});
