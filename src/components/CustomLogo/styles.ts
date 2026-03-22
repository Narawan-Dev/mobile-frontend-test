import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  logoShape: {
    width: 42,
    height: 42,
    position: 'relative',
  },
  logoTopRight: {
    position: 'absolute',
    top: 0,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  logoMiddleLeft: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 18,
    height: 18,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  logoBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  logoBottomRight: {
    position: 'absolute',
    bottom: 2,
    right: 10,
    width: 18,
    height: 18,
    borderBottomRightRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
  },
});