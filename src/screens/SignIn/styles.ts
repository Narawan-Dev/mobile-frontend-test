import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  cardContent: {
    justifyContent: 'space-between',
  },
  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.disabledBg,
  },
  buttonText: {
    color: colors.textSecondary,
  },
  buttonTextDisabled: {
    color: colors.disabledText,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  formSection: {
    marginBottom: 8,
  },
  apiErrorText: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 14,
    lineHeight: 20,
    color: colors.error,
  },
});
