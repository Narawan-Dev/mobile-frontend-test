import React, { forwardRef, useMemo, useState } from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import CustomAppText from '../CustomAppText';
import { typography } from '../../theme/typography';
import { styles } from './styles';

type LabelMode = 'floating' | 'inline' | 'hidden';
type HorizontalAlign = 'left' | 'center' | 'right';

type Props = TextInputProps & {
  label?: string;
  errorText?: string;

  labelMode?: LabelMode;
  labelAlign?: HorizontalAlign;
  inputAlign?: HorizontalAlign;

  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
};

const CustomInput = forwardRef<TextInput, Props>(
  (
    {
      label = '',
      value,
      errorText,
      onFocus,
      onBlur,
      style,

      labelMode = 'floating',
      labelAlign = 'left',
      inputAlign = 'left',

      containerStyle,
      wrapperStyle,
      labelStyle,
      inputStyle,
      errorStyle,

      placeholder,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    const hasValue = useMemo(() => {
      if (value === undefined || value === null) {
        return false;
      }
      return String(value).length > 0;
    }, [value]);

    const shouldShowFloatingLabel = labelMode === 'floating' && !!label;
    const shouldShowInlineLabel = labelMode === 'inline' && !!label;

    const resolvedPlaceholder = useMemo(() => {
      if (placeholder !== undefined) {
        return placeholder;
      }

      if (labelMode === 'floating') {
        return '';
      }

      if (labelMode === 'hidden') {
        return label;
      }

      return '';
    }, [placeholder, labelMode, label]);

    const handleFocus: TextInputProps['onFocus'] = e => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur: TextInputProps['onBlur'] = e => {
      setFocused(false);
      onBlur?.(e);
    };

    const getLabelAlignStyle = () => {
      switch (labelAlign) {
        case 'center':
          return styles.labelCenter;
        case 'right':
          return styles.labelRight;
        case 'left':
        default:
          return styles.labelLeft;
      }
    };

    const getInputAlignStyle = () => {
      switch (inputAlign) {
        case 'center':
          return styles.inputCenter;
        case 'right':
          return styles.inputRight;
        case 'left':
        default:
          return styles.inputLeft;
      }
    };

    return (
      <View style={containerStyle}>
        {shouldShowInlineLabel && (
          <CustomAppText
            variant="label"
            style={[styles.inlineLabel, getLabelAlignStyle(), labelStyle]}
          >
            {label}
          </CustomAppText>
        )}

        <View
          style={[
            styles.wrapper,
            focused && styles.wrapperFocused,
            !!errorText && styles.wrapperError,
            wrapperStyle,
          ]}
        >
          {shouldShowFloatingLabel && (
            <CustomAppText
              variant="label"
              style={[styles.floatingLabel, getLabelAlignStyle(), labelStyle]}
            >
              {label}
            </CustomAppText>
          )}

          <TextInput
            ref={ref}
            value={value}
            style={[
              styles.input,
              typography.input,
              getInputAlignStyle(),
              inputStyle,
              style,
            ]}
            placeholder={resolvedPlaceholder}
            placeholderTextColor="#9CA3AF"
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </View>

        {!!errorText && (
          <CustomAppText style={[styles.errorText, errorStyle]}>
            {errorText}
          </CustomAppText>
        )}
      </View>
    );
  },
);

export default CustomInput;