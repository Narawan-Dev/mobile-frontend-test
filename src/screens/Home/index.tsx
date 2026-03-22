import React, { useCallback, useState } from 'react';
import { View, FlatList, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useFocusEffect } from '@react-navigation/native';

import CustomAppText from '../../components/CustomAppText';
import { styles } from './styles';
import CustomLogo from '../../components/CustomLogo';
import { colors } from '../../theme/colors';
import { useAppSelector } from '../../store/hooks';
import { userApi } from '../../services/api/userApi';
import { Transaction } from './types';

const defaultTransactions: Transaction[] = [];

const HomeScreen = () => {
  const token = useAppSelector(s => s.auth.token);

  const [userName, setUserName] = useState('');
  const [available, setAvailable] = useState<number | null>(null);
  const [txns, setTxns] = useState<Transaction[]>(defaultTransactions);

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const fetchData = useCallback(async () => {
    if (!token) {
      return;
    }

    try {
      const profile = await userApi.getProfile(token);
      setUserName(
        profile?.data?.firstname
          ? `${profile.data.firstname} ${profile.data.lastname ?? ''}`.trim()
          : profile?.data?.email ?? '',
      );

      const transactionsRes = await userApi.getTransactions(token);
      setAvailable(transactionsRes?.data?.available ?? null);

      const transactions = transactionsRes?.data?.transactions ?? [];
      setTxns([...transactions].reverse());
    } catch (error) {
      // swallow for now
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
        translucent={false}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.screen}>
          <View style={styles.topSection}>
            <View style={styles.headerRow}>
              <CustomLogo color={colors.background} />

              <View style={styles.profileRow}>
                <CustomAppText style={styles.userName}>
                  {userName || 'User'}
                </CustomAppText>

                <View style={styles.avatar}>
                  <Image
                    source={require('../../assets/images/avatar.png')}
                    style={styles.avatarImage}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.balanceCard}>
              <CustomAppText style={styles.balanceLabel}>
                Available Balance
              </CustomAppText>

              <CustomAppText
                style={styles.balanceAmount}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {available !== null ? formatCurrency(available) : '-'}
              </CustomAppText>
            </View>

            <View style={styles.historySection}>
              <CustomAppText style={styles.sectionTitle}>
                Transaction History
              </CustomAppText>

              <View style={styles.historyCard}>
                <FlatList
                  data={txns}
                  keyExtractor={item => String(item.uid)}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContent}
                  ItemSeparatorComponent={() => <View style={styles.divider} />}
                  renderItem={({ item }) => (
                    <View style={styles.transactionItem}>
                      <View style={styles.transactionIcon}>
                        <MaterialIcons
                          name="check-circle"
                          size={18}
                          color={colors.success}
                        />
                      </View>

                      <View style={styles.transactionLeft}>
                        <View style={styles.dateRow}>
                          <CustomAppText style={styles.transactionDate}>
                            {item.date}
                          </CustomAppText>
                        </View>

                        <CustomAppText style={styles.transactionStatus}>
                          Completed
                        </CustomAppText>
                      </View>

                      <View style={styles.transactionRight}>
                        <CustomAppText
                          style={styles.transactionAmount}
                          numberOfLines={1}
                          adjustsFontSizeToFit
                        >
                          {formatCurrency(item.amount)}
                        </CustomAppText>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;