import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
    height: 64,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  wrapperFocused: {
    borderColor: '#7C3AED',
  },
  wrapperError: {
    borderColor: '#EF4444',
  },
  floatingLabel: {
    position: 'absolute',
    top: -8,
    left: 14,
    zIndex: 10,
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
  },
  input: {
    height: '100%',
    paddingHorizontal: 16,
    color: '#111827',
    fontSize: 18,
  },
  errorText: {
    marginTop: 6,
    marginLeft: 4,
    fontSize: 12,
    color: '#EF4444',
  },
});