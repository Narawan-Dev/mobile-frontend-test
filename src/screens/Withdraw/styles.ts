import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#efeff0',
  },

  container: {
    flex: 1,
    backgroundColor: '#efeff0', // 👈 ใช้ theme เดียวกับ home
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },

  headerTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 28,
  },

  section: {
    marginBottom: 22,
  },

  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  // ✅ amount card (เอา shadow ออก + ใช้ border แบบเดียวกัน)
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },

  currencySymbol: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    marginRight: 4,
  },

  amountInput: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    color: '#111827',
    minWidth: 120,
    textAlign: 'center',
    paddingVertical: 0,
  },

  // ✅ info card (เหมือน history card)
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F6',
  },

  lastInfoRow: {
    borderBottomWidth: 0,
  },

  infoLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#6B7280',
  },

  infoValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#111827',
  },

  feeValue: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: '#3c1ecb',
  },

  // ✅ ปุ่ม (เอา shadow ออกให้ match ทั้งแอป)
  withdrawButton: {
    backgroundColor: '#3c1ecb',
    minHeight: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  withdrawButtonDisabled: {
    opacity: 0.5,
  },

  withdrawButtonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // bottom tab (คงเดิม แต่ clean อยู่แล้ว)
  bottomTab: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 14,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.8,
    borderColor: '#9CA3AF',
    marginBottom: 6,
  },

  activeTabIcon: {
    borderColor: '#3c1ecb',
    backgroundColor: '#EDE9FE',
  },

  tabText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: '#6B7280',
  },

  activeTabText: {
    color: '#3c1ecb',
    fontWeight: '700',
  },
});
