import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

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
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 28,
    color: colors.textPrimary,
  },
  section: {
    marginBottom: 22,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.textPrimary,
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
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    marginRight: 4,
    color: colors.textPrimary,
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
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    minHeight: 40,
  },

  availableText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted,
  },
  errorText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: colors.error,
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
  infoLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.textMuted,
  },
  infoValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  feeValue: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  withdrawButton: {
    backgroundColor: colors.primary,
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
    color: colors.background,
  },
});