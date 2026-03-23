import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
    minHeight: 64,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.background,
  },
  wrapperFocused: {
    borderColor: colors.primary,
  },
  wrapperError: {
    borderColor: colors.error,
  },

  inlineLabel: {
    marginBottom: 8,
    fontSize: 12,
    color: colors.textMuted,
  },

  floatingLabel: {
    position: 'absolute',
    top: -8,
    zIndex: 10,
    fontSize: 12,
    color: colors.textMuted,
    backgroundColor: colors.background,
    paddingHorizontal: 6,
  },

  labelLeft: {
    left: 14,
    right: undefined,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  labelCenter: {
    left: 0,
    right: 0,
    textAlign: 'center',
    alignSelf: 'center',
  },
  labelRight: {
    right: 14,
    left: undefined,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },

  input: {
    minHeight: 64,
    paddingHorizontal: 16,
    color: colors.textPrimary,
    fontSize: 18,
  },
  inputLeft: {
    textAlign: 'left',
  },
  inputCenter: {
    textAlign: 'center',
  },
  inputRight: {
    textAlign: 'right',
  },

  errorText: {
    marginTop: 6,
    marginLeft: 4,
    fontSize: 12,
    color: colors.error,
  },
});