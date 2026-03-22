import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3c1ecb',
  },
  screen: {
    flex: 1,
    backgroundColor: '#3c1ecb',
  },
  topSection: {
    backgroundColor: '#3c1ecb',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#efeff0', // 👈 เปลี่ยนตรงนี้
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  avatarText: {
    fontSize: 22,
    color: '#3c1ecb',
    fontWeight: '700',
  },
  userName: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    color: '#111827',
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
  },

  historyCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },

  listContent: {
    paddingTop: 8,
    paddingBottom: 0,
  },

  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  transactionLeft: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  transactionDate: {
    fontSize: 15,
    fontWeight: '600',
  },
  transactionStatus: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 24,
    marginRight: 8,
    marginTop: 2,
    alignItems: 'flex-start',
  },
});
