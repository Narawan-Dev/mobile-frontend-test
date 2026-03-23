import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  Image,
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';

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
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
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

      setLastUpdated(new Date());
    } catch (error) {
      Alert.alert('Error', (error as Error)?.message || 'Failed to fetch data');
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  }, [fetchData]);

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

          <ScrollView
            style={styles.bottomSection}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary}
              />
            }
          >
            {lastUpdated && (
              <CustomAppText style={styles.lastUpdatedText}>
                Last updated {formatLastUpdated(lastUpdated)}
              </CustomAppText>
            )}

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
                <View style={styles.listContent}>
                  {txns.map((item, index) => (
                    <React.Fragment key={String(item.uid)}>
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

                      {index < txns.length - 1 && (
                        <View style={styles.divider} />
                      )}
                    </React.Fragment>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;