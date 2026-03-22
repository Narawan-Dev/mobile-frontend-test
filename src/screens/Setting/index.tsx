import React from 'react';
import { View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CustomAppText from '../../components/CustomAppText';
import { styles } from './styles';
import { MainTabParamList } from '../../navigation/MainTabNavigator';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Setting'>,
  NativeStackScreenProps<RootStackParamList>
>;

const SettingScreen = ({ navigation }: Props) => {
  const handleResetPin = () => {
    Alert.alert(
      'Reset PIN',
      'You will need to set a new PIN. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: () =>
            navigation.navigate('Passcode', {
              mode: 'reset',
            }),
        },
      ],
      { cancelable: true },
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            const parentNavigation = navigation.getParent();

            if (parentNavigation) {
              parentNavigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'SignIn' }],
                }),
              );
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <CustomAppText style={styles.title}>Settings</CustomAppText>

          <View style={styles.listArea}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.listItem}
              onPress={handleResetPin}
            >
              <View style={styles.leftSection}>
                <MaterialIcons
                  name="lock-reset"
                  size={22}
                  color={colors.textPrimary}
                />
                <CustomAppText style={styles.itemText}>Reset PIN</CustomAppText>
              </View>

              <MaterialIcons
                name="chevron-right"
                size={22}
                color={colors.textPrimary}
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.listItem}
              onPress={handleLogout}
            >
              <View style={styles.leftSection}>
                <MaterialIcons
                  name="logout"
                  size={22}
                  color={colors.textPrimary}
                />
                <CustomAppText style={styles.itemText}>Logout</CustomAppText>
              </View>

              <MaterialIcons
                name="chevron-right"
                size={22}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SettingScreen;