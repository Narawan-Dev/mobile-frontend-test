import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAppDispatch } from '../../store/hooks';
import { setAvailableBalance as setAvailableAction } from '../../store/slices/authSlice';
import { userApi } from '../../services/api/userApi';
import * as secureAuth from '../../services/storage/secureAuth';
import { TransactionItem } from '../../services/api/types';

const useHome = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [userName, setUserName] = useState('');
  const [availableBalance, setAvailableBalance] = useState<number | null>(null);
  const [txns, setTxns] = useState<TransactionItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const token = await secureAuth.getToken();

      if (!token) return;

      const profile = await userApi.getProfile(token);

      setUserName(
        profile?.data?.firstname
          ? `${profile.data.firstname} ${profile.data.lastname ?? ''}`.trim()
          : profile?.data?.email ?? '',
      );

      const transactionsRes = await userApi.getTransactions(token);

      const availableFromApi = transactionsRes?.data?.available ?? null;
      setAvailableBalance(availableFromApi);
      dispatch(setAvailableAction(availableFromApi));

      const transactions = transactionsRes?.data?.transactions ?? [];
      setTxns([...transactions].reverse());

      setLastUpdated(new Date());
    } catch (error) {
      Alert.alert('Error', (error as Error).message || 'Failed to fetch data');
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (route.params?.shouldRefetch) {
      fetchData();

      navigation.setParams({
        shouldRefetch: undefined,
      });
    }
  }, [route.params?.shouldRefetch, fetchData, navigation]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  }, [fetchData]);

  return {
    userName,
    availableBalance,
    txns,
    refreshing,
    lastUpdated,
    onRefresh,
  };
};

export default useHome;