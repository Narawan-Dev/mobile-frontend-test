import React, { useMemo, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAppText from '../../components/CustomAppText';
import CustomLoadingOverlay from '../../components/CustomLoadingOverlay';
import { styles } from './styles';
import { colors } from '../../theme/colors';
import { useAppSelector } from '../../store/hooks';
import { userApi } from '../../services/api/userApi';

const FEE_AMOUNT = 5;

const WithdrawScreen = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const token = useAppSelector(s => s.auth.token);

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setAmount(cleaned);
  };

  const displayAmount = useMemo(() => {
    if (!amount) {
      return '';
    }

    return Number(amount).toLocaleString();
  }, [amount]);

  const isButtonDisabled = !amount || Number(amount) <= 0 || loading;

  const handleWithdraw = async () => {
    if (!token) {
      Alert.alert('Not signed in');
      return;
    }

    try {
      setLoading(true);

      const result = await userApi.withdraw(token, amount);

      if (result?.message === 'success') {
        Alert.alert('Success', 'Withdrawal successful');
        setAmount('');
        return;
      }

      Alert.alert('Failed', result?.message || 'Withdrawal failed');
    } catch (error) {
      Alert.alert('Error', 'Unable to complete withdrawal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
        translucent={false}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <CustomAppText style={styles.headerTitle}>Withdrawal</CustomAppText>

            <View style={styles.section}>
              <CustomAppText style={styles.sectionLabel}>
                Amount for Withdrawal
              </CustomAppText>

              <View style={styles.amountCard}>
                <CustomAppText style={styles.currencySymbol}>$</CustomAppText>

                <TextInput
                  value={displayAmount}
                  onChangeText={handleAmountChange}
                  placeholder="0"
                  placeholderTextColor={colors.disabledText}
                  keyboardType="number-pad"
                  style={styles.amountInput}
                  editable={!loading}
                />
              </View>
            </View>

            <View style={styles.section}>
              <CustomAppText style={styles.sectionLabel}>
                Transfer To
              </CustomAppText>

              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <CustomAppText style={styles.infoLabel}>Name</CustomAppText>
                  <CustomAppText style={styles.infoValue}>
                    John Doe
                  </CustomAppText>
                </View>

                <View style={styles.infoRow}>
                  <CustomAppText style={styles.infoLabel}>Company</CustomAppText>
                  <CustomAppText style={styles.infoValue}>
                    Salary Hero
                  </CustomAppText>
                </View>

                <View style={styles.infoRow}>
                  <CustomAppText style={styles.infoLabel}>Bank</CustomAppText>
                  <CustomAppText style={styles.infoValue}>SCB</CustomAppText>
                </View>

                <View style={styles.infoRow}>
                  <CustomAppText style={styles.infoLabel}>
                    Bank Account
                  </CustomAppText>
                  <CustomAppText style={styles.infoValue}>
                    XXX-XXX-2231
                  </CustomAppText>
                </View>

                <View style={[styles.infoRow, styles.lastInfoRow]}>
                  <CustomAppText style={styles.infoLabel}>Fee</CustomAppText>
                  <CustomAppText style={styles.feeValue}>
                    ${FEE_AMOUNT}
                  </CustomAppText>
                </View>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.withdrawButton,
                isButtonDisabled && styles.withdrawButtonDisabled,
              ]}
              disabled={isButtonDisabled}
              onPress={handleWithdraw}
            >
              <CustomAppText style={styles.withdrawButtonText}>
                Withdraw
              </CustomAppText>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>

      <CustomLoadingOverlay visible={loading} />
    </>
  );
};

export default WithdrawScreen;