import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  headerTitle: {
    marginBottom: 28,
  },
  section: {
    marginBottom: 22,
  },
  sectionLabel: {
    marginBottom: 12,
  },
  amountCard: {
    backgroundColor: colors.background,
    borderRadius: 20,
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  amountCardError: {
    borderColor: colors.error,
  },
  currencySymbol: {
    marginRight: 4,
  },
  amountInputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  amountInputWrapper: {
    width: '100%',
  },
  amountInputInnerWrapper: {
    minHeight: 0,
    height: 'auto',
    borderWidth: 0,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  amountInput: {
    fontFamily: fonts.semiBold,
    fontSize: 32,
    lineHeight: 50,
    color: colors.textPrimary,
    textAlign: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    minHeight: 40,
  },
  availableText: {
    marginTop: 8,
  },
  errorText: {
    marginTop: 6,
  },
  infoCard: {
    backgroundColor: colors.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastInfoRow: {
    borderBottomWidth: 0,
  },
});
