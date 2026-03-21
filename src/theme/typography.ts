import { StyleSheet } from 'react-native';
import { fonts } from './fonts';

export const typography = StyleSheet.create({
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 34,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 18,
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 24,
  },
  button: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 22,
  },
});