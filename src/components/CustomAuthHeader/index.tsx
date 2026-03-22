import React from 'react';
import { View } from 'react-native';
import CustomAppText from '../CustomAppText';
import { styles } from './styles';
import CustomLogo from '../CustomLogo';

type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.topRightCircle} />
      <View style={styles.bottomLeftCircle} />

      <View style={styles.logoRow}>
        <CustomLogo color="white" />
      </View>

      <CustomAppText variant="title" style={styles.title}>
        {title}
      </CustomAppText>

      <CustomAppText variant="subtitle" style={styles.subtitle}>
        {subtitle}
      </CustomAppText>
    </View>
  );
};

export default AuthHeader;