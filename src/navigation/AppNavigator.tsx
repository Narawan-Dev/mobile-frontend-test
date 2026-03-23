import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignIn';
import OtpScreen from '../screens/Otp';
import PasscodeScreen from '../screens/Passcode';
import MainTabNavigator from './MainTabNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Passcode" component={PasscodeScreen} />
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;