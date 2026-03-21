import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import SplashScreen from './src/screens/Splash';
import SignInScreen from './src/screens/SignIn';
import OtpScreen from './src/screens/Otp';
import PasscodeScreen from './src/screens/Passcode';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  Otp: { phone: string };
  Passcode: {
    mode: 'create' | 'confirm';
    initialPasscode?: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  useEffect(() => {
    const init = async () => {
      await BootSplash.hide({ fade: true });
    };

    init();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#3c1ecb" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="Passcode" component={PasscodeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
