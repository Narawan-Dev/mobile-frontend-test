import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { colors } from '../../theme/colors';

type Props = {
  color?: string;
};

const CustomLogo = ({ color = colors.primary }: Props) => {
  return (
    <View style={styles.logoShape}>
      <View style={[styles.logoTopRight, { backgroundColor: color }]} />
      <View style={[styles.logoMiddleLeft, { backgroundColor: color }]} />
      <View style={[styles.logoBottomLeft, { backgroundColor: color }]} />
      <View style={[styles.logoBottomRight, { backgroundColor: color }]} />
    </View>
  );
};

export default CustomLogo;