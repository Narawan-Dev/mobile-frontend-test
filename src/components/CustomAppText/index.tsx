import React from 'react';
import { Text, TextProps, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { typography } from '../../theme/typography';
import { styles } from './styles';

type Variant = 'title' | 'subtitle' | 'label' | 'button';

interface AppTextProps extends TextProps {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
}

const AppText = ({
  children,
  variant = 'subtitle',
  style,
  ...props
}: AppTextProps) => {
  return (
    <Text {...props} style={[styles.base, typography[variant], style]}>
      {children}
    </Text>
  );
};

export default AppText;