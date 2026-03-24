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
  const { isAuthenticated, hasPin, isPasscodeVerified, passcodeMode } =
    useAppSelector(state => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
        </>
      ) : passcodeMode === 'reset' ? (
        <Stack.Screen
          name="Passcode"
          component={PasscodeScreen}
          initialParams={{ mode: 'reset' }}
        />
      ) : !hasPin ? (
        <Stack.Screen
          name="Passcode"
          component={PasscodeScreen}
          initialParams={{ mode: 'create' }}
        />
      ) : !isPasscodeVerified ? (
        <Stack.Screen
          name="Passcode"
          component={PasscodeScreen}
          initialParams={{ mode: 'enter' }}
        />
      ) : (
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;