import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  headerWrapper: {
    position: 'relative',
  },
  cardContent: {
    justifyContent: 'space-between',
  },
  row: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendDisabled: {
    opacity: 0.5,
  },
  resendText: {
    marginLeft: 6,
  },
  button: {
    marginTop: 8,
  },
});