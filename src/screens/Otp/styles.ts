import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  headerWrapper: {
    position: 'relative',
  },
  card: {
    flex: 1,
    marginTop: -20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  row: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refText: {
    fontSize: 13,
    color: '#6B7280',
  },
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7C3AED',
  },
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
});