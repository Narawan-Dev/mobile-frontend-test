import React, { useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import HomeScreen from '../screens/Home';
import WithdrawScreen from '../screens/Withdraw';
import SettingScreen from '../screens/Setting';

import { colors } from '../theme/colors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPasscodeMode, setPasscodeVerified } from '../store/slices/authSlice';
import { MainTabParamList, MaterialIconName } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<keyof MainTabParamList, MaterialIconName> = {
  Home: 'home',
  Withdraw: 'account-balance-wallet',
  Setting: 'settings',
};

const MainTabNavigator = () => {
  const dispatch = useAppDispatch();

  const { isAuthenticated, hasPin, isPasscodeVerified } = useAppSelector(
    state => state.auth,
  );

  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const shouldRequirePasscode = isAuthenticated && hasPin;

  const lockAppWithPasscode = useCallback(() => {
    if (!shouldRequirePasscode || !isPasscodeVerified) {
      return;
    }

    dispatch(setPasscodeMode(null));
    dispatch(setPasscodeVerified(false));
  }, [dispatch, isPasscodeVerified, shouldRequirePasscode]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      const prevAppState = appStateRef.current;

      const isReturningToForeground =
        (prevAppState === 'background' || prevAppState === 'inactive') &&
        nextAppState === 'active';

      if (isReturningToForeground) {
        lockAppWithPasscode();
      }

      appStateRef.current = nextAppState;
    });

    return () => subscription.remove();
  }, [lockAppWithPasscode]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          height: 64,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons
            name={TAB_ICONS[route.name]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Withdraw" component={WithdrawScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;