import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

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
  },
  floatingLabel: {
    position: 'absolute',
    top: -8,
    zIndex: 10,
    backgroundColor: colors.background,
    paddingHorizontal: 6,
  },
  labelLeft: {
    left: 14,
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
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  input: {
    ...typography.input,
    minHeight: 64,
    paddingHorizontal: 16,
    color: colors.textPrimary,
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
  },
});