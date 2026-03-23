import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAvailable as setAvailableAction } from '../../store/slices/authSlice';
import { userApi } from '../../services/api/userApi';
import { Transaction } from './types';

const useHome = () => {
  const token = useAppSelector(s => s.auth.token);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [userName, setUserName] = useState('');
  const [available, setAvailable] = useState<number | null>(null);
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

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

      const availableFromApi = transactionsRes?.data?.available ?? null;
      setAvailable(availableFromApi);
      dispatch(setAvailableAction(availableFromApi));

      const transactions = transactionsRes?.data?.transactions ?? [];
      setTxns([...transactions].reverse());

      setLastUpdated(new Date());
    } catch (error) {
      Alert.alert('Error', (error as Error)?.message || 'Failed to fetch data');
    }
  }, [token, dispatch]);

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
    available,
    txns,
    refreshing,
    lastUpdated,
    onRefresh,
  };
};

export default useHome;