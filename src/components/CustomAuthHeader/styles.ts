import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 36,
    minHeight: 280,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  topRightCircle: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.backgroundTertiary,
  },
  bottomLeftCircle: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.backgroundTertiary,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoDotSmall: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.background,
    marginRight: 8,
  },
  logoBigCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.background,
    marginRight: 8,
  },
  logoDotRight: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.textSecondary,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSubTitle,
  },
});