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
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32, // ปรับลดลงเล็กน้อยเพื่อความสมดุล
    color: '#111827',
    fontWeight: '700',
  },
  historySection: {
    flex: 1, // สำคัญเพื่อให้กินพื้นที่ที่เหลือ
    marginBottom: 0, 
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '700',
    marginBottom: 12,
  },
  historyCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: 'hidden',
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 130, 
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: '#111827',
    fontWeight: '600',
  },
  transactionStatus: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '700',
    marginLeft: 12,
  },
});