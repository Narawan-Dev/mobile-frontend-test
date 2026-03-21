import React from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CustomAppText from '../../components/CustomAppText';
import { styles } from './styles';

const SettingScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <CustomAppText style={styles.title}>Setting</CustomAppText>

          <View style={styles.buttonGroup}>
            <TouchableOpacity activeOpacity={0.85} style={styles.primaryButton}>
              <View style={styles.buttonLeft}>
                <View style={styles.primaryIconWrap}>
                  <MaterialIcons name="lock-reset" size={20} color="#3c1ecb" />
                </View>
                <CustomAppText style={styles.primaryText}>Reset PIN</CustomAppText>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} style={styles.secondaryButton}>
              <View style={styles.buttonLeft}>
                <View style={styles.secondaryIconWrap}>
                  <MaterialIcons name="logout" size={20} color="#EF4444" />
                </View>
                <CustomAppText style={styles.secondaryText}>Logout</CustomAppText>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SettingScreen;