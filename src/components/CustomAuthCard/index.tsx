import React, { ReactNode } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { styles } from './styles';

type AuthCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const AuthCard = ({ children, style }: AuthCardProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default AuthCard;