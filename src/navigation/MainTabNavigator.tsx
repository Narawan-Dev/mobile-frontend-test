import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { AppState, AppStateStatus } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPasscodeVerified } from '../store/slices/authSlice';

import HomeScreen from '../screens/Home';
import WithdrawScreen from '../screens/Withdraw';
import SettingScreen from '../screens/Setting';
import { MainTabParamList, RootStackParamList } from './typs';

const Tab = createBottomTabNavigator<MainTabParamList>();

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

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

  const token = useAppSelector(s => s.auth.token);
  const hasPin = useAppSelector(s => s.auth.hasPin);
  const isPasscodeVerified = useAppSelector(
    s => s.auth.isPasscodeVerified,
  );

  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener('change', nextAppState => {
      const prevAppState = appState.current;

      const isComingBackToForeground =
        (prevAppState === 'background' || prevAppState === 'inactive') &&
        nextAppState === 'active';

      if (
        isComingBackToForeground &&
        token &&
        hasPin &&
        isPasscodeVerified
      ) {
        dispatch(setPasscodeVerified(false));
        navigation.navigate('Passcode', { mode: 'enter' });
      }

      appState.current = nextAppState;
    });

    return () => sub.remove();
  }, [token, hasPin, isPasscodeVerified, navigation, dispatch]);

  useEffect(() => {
    if (token && hasPin && !isPasscodeVerified) {
      navigation.navigate('Passcode', { mode: 'enter' });
    }
  }, [token, hasPin, isPasscodeVerified, navigation]);

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