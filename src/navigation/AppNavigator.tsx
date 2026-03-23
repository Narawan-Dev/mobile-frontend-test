import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../store/hooks';

import SignInScreen from '../screens/SignIn';
import OtpScreen from '../screens/Otp';
import PasscodeScreen from '../screens/Passcode';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isAuthenticated = useAppSelector(s => s.auth.isAuthenticated);
  const hasPin = useAppSelector(s => s.auth.hasPin);
  const isPasscodeVerified = useAppSelector(s => s.auth.isPasscodeVerified);

  let initialRoute: keyof RootStackParamList = 'SignIn';
  let passcodeMode: 'create' | 'enter' = 'create';

  if (isAuthenticated) {
    if (!hasPin) {
      initialRoute = 'Passcode';
      passcodeMode = 'create';
    } else if (!isPasscodeVerified) {
      initialRoute = 'Passcode';
      passcodeMode = 'enter';
    } else {
      initialRoute = 'MainTab';
    }
  }

  return (
    <Stack.Navigator
      key={`${isAuthenticated}-${hasPin}-${isPasscodeVerified}`}
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen
        name="Passcode"
        component={PasscodeScreen}
        initialParams={{ mode: passcodeMode }}
      />
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;