import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

type HeaderArrowProps = {
  onPress?: () => void;
  iconColor?: string;
};

const HeaderArrow = ({
  onPress,
  iconColor = '#111827',
}: HeaderArrowProps) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.backButton, { top: insets.top + 8 }]}
      activeOpacity={0.7}
    >
      <MaterialIcons
        name="arrow-back-ios-new"
        size={22}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

export default HeaderArrow;