import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  title: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    color: '#111827',
    marginBottom: 40,
    fontWeight: '700',
  },

  buttonGroup: {
    gap: 16,
  },

  primaryButton: {
    backgroundColor: '#3c1ecb',
    borderRadius: 20,
    minHeight: 64,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#3c1ecb',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    minHeight: 64,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  buttonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  primaryIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  secondaryIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  primaryText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  secondaryText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#EF4444',
    fontWeight: '700',
  },
});