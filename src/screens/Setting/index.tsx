import React from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import CustomAppText from '../../components/CustomAppText';
import { styles } from './styles';
import { colors } from '../../theme/colors';

import { Props } from './types';
import { useSetting } from './useSetting';

const SettingScreen = ({ navigation }: Props) => {
  const { handleResetPin, handleLogout } = useSetting({ navigation });

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