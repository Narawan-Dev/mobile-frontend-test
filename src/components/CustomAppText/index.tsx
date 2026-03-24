import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

type Variant = keyof typeof typography;

type Props = TextProps & {
  variant?: Variant;
  align?: 'left' | 'center' | 'right';
  color?: string;
  style?: StyleProp<TextStyle>;
};

const CustomAppText = ({
  variant = 'body',
  align = 'left',
  color = colors.textPrimary,
  style,
  children,
  ...props
}: Props) => {
  return (
    <Text
      {...props}
      style={[
        typography[variant],
        { textAlign: align, color },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomAppText;