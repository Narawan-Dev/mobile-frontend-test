import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import CustomAppText from '../CustomAppText';
import { styles } from './styles';
import { colors } from '../../theme/colors';

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const CustomButton = ({
  title,
  loading = false,
  fullWidth = true,
  variant = 'primary',
  disabled = false,
  containerStyle,
  activeOpacity = 0.85,
  ...props
}: Props) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={isDisabled}
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        variant === 'primary' && styles.primaryButton,
        variant === 'secondary' && styles.secondaryButton,
        variant === 'outline' && styles.outlineButton,
        isDisabled && styles.disabledButton,
        containerStyle,
      ]}
      {...props}
    >
      <CustomAppText
        variant="button"
        color={
          variant === 'outline' ? colors.primary : colors.background
        }
      >
        {loading ? 'Loading...' : title}
      </CustomAppText>
    </TouchableOpacity>
  );
};

export default CustomButton;