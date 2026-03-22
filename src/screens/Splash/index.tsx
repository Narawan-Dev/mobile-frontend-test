import React, { useEffect } from 'react';
import {
  ImageBackground,
  StatusBar,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignIn');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3c1ecb" />
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/splash_bg.png')}
          style={styles.background}
          resizeMode="cover"
        />
      </View>
    </>
  );
};

export default SplashScreen;