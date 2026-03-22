import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  title: {
    fontSize: 24,
    lineHeight: 30,
    color: '#111111',
    fontWeight: '700',
    marginBottom: 28,
  },

  listArea: {
    backgroundColor: '#FFFFFF',
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
    color: '#111111',
    fontWeight: '400',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: 36,
  },
});