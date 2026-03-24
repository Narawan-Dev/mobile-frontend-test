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
  cardContent: {
    justifyContent: 'space-between',
  },
  formSection: {
    marginBottom: 8,
  },
  apiErrorText: {
    marginTop: 8,
    marginBottom: 12,
  },
  button: {
    marginTop: 4,
  },
});