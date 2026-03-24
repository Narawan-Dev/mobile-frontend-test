import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: colors.background,
  },
  title: {
    marginBottom: 28,
  },
  listArea: {
    backgroundColor: colors.background,
  },
  listItem: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 36,
  },
});