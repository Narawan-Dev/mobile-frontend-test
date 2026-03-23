import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppState, AppStateStatus } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import { colors } from '../theme/colors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPasscodeVerified } from '../store/slices/authSlice';

import HomeScreen from '../screens/Home';
import WithdrawScreen from '../screens/Withdraw';
import SettingScreen from '../screens/Setting';
import { MainTabParamList, MaterialIconName, RootStackParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const getIconName = (
  routeName: keyof MainTabParamList,
): MaterialIconName => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Withdraw':
      return 'account-balance-wallet';
    case 'Setting':
      return 'settings';
    default:
      return 'home';
  }
};

const MainTabNavigator = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(s => s.auth.isAuthenticated);
  const hasPin = useAppSelector(s => s.auth.hasPin);
  const isPasscodeVerified = useAppSelector(s => s.auth.isPasscodeVerified);

  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener('change', nextAppState => {
      const prevAppState = appState.current;

      const isComingBackToForeground =
        (prevAppState === 'background' || prevAppState === 'inactive') &&
        nextAppState === 'active';

      if (isComingBackToForeground && isAuthenticated && hasPin) {
        const state = navigation.getState();
        const currentRoute = state.routes[state.index]?.name;

        if (currentRoute !== 'Passcode') {
          dispatch(setPasscodeVerified(false));
          navigation.navigate('Passcode', { mode: 'enter' });
        }
      }

      appState.current = nextAppState;
    });

    return () => sub.remove();
  }, [dispatch, hasPin, isAuthenticated, navigation]);

  useEffect(() => {
    const state = navigation.getState();
    const currentRoute = state.routes[state.index]?.name;

    if (
      isAuthenticated &&
      hasPin &&
      !isPasscodeVerified &&
      currentRoute !== 'Passcode'
    ) {
      navigation.navigate('Passcode', { mode: 'enter' });
    }
  }, [hasPin, isAuthenticated, isPasscodeVerified, navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons
            name={getIconName(route.name)}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Withdraw"
        component={WithdrawScreen}
        options={{ tabBarLabel: 'Withdraw' }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{ tabBarLabel: 'Setting' }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;