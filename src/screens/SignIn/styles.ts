import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
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
  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#3c1ecb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  buttonText: {
    color: '#fff',
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
});