import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topSection: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.disabledBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  userName: {
    fontSize: 20,
    color: colors.background,
    fontWeight: '700',
  },
  balanceCard: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 26,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  historySection: {
    flex: 1,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.textPrimary,
  },
  historyCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  transactionIcon: {
    width: 24,
    marginRight: 8,
    marginTop: 2,
    alignItems: 'flex-start',
  },
  transactionLeft: {
    flex: 1,
    minWidth: 0,
  },
  transactionRight: {
    width: 110,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginLeft: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  transactionStatus: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'right',
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  lastUpdatedText: {
    marginTop: 8,
    marginRight: 4,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'right',
  },
});