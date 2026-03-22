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
    fontSize: 24,
    lineHeight: 30,
    color: colors.textPrimary,
    fontWeight: '700',
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
  itemText: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.textPrimary,
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 36,
  },
});