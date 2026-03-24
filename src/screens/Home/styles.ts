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
  },
  bottomContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginLeft: 16,
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
    flexShrink: 1,
  },
  lastUpdatedText: {
    marginTop: 8,
    marginRight: 4,
    marginBottom: 12,
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
    marginBottom: 4,
  },
  balanceAmount: {},
  historySection: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 12,
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
  transactionDate: {},
  transactionStatus: {
    marginTop: 4,
  },
  transactionAmount: {
    textAlign: 'right',
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});