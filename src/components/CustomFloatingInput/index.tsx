import React, { forwardRef, useMemo, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import CustomAppText from '../CustomAppText';
import { typography } from '../../theme/typography';
import { styles } from './styles';

type Props = TextInputProps & {
  label: string;
  errorText?: string;
};

const CustomFloatingInput = forwardRef<TextInput, Props>(
  ({ label, value, style, errorText, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    const handleFocus: TextInputProps['onFocus'] = e => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur: TextInputProps['onBlur'] = e => {
      setFocused(false);
      onBlur?.(e);
    };

    return (
      <View>
        <View
          style={[
            styles.wrapper,
            focused && styles.wrapperFocused,
            !!errorText && styles.wrapperError,
          ]}
        >
          <CustomAppText variant="label" style={styles.floatingLabel}>
            {label}
          </CustomAppText>

          <TextInput
            ref={ref}
            value={value}
            style={[styles.input, typography.input, style]}
            placeholder={focused ? '' : label}
            placeholderTextColor="#9CA3AF"
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </View>

        {!!errorText && (
          <CustomAppText style={styles.errorText}>{errorText}</CustomAppText>
        )}
      </View>
    );
  },
);

export default CustomFloatingInput;
