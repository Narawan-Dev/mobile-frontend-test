import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { colors } from '../theme/colors';

import HomeScreen from '../screens/Home';
import WithdrawScreen from '../screens/Withdraw';
import SettingScreen from '../screens/Setting';

export type MainTabParamList = {
  Home: undefined;
  Withdraw: undefined;
  Setting: undefined;
};

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