import React from 'react';
import { View, FlatList, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CustomAppText from '../../components/CustomAppText';
import { styles } from './styles';
import CustomLogo from '../../components/CustomLogo';

const transactions = [
  { id: '1', date: '15 Feb 2023', amount: 100, status: 'Completed' },
  { id: '2', date: '16 Feb 2023', amount: 250, status: 'Completed' },
  { id: '3', date: '17 Feb 2023', amount: 80, status: 'Completed' },
  { id: '4', date: '18 Feb 2023', amount: 300, status: 'Completed' },
  { id: '5', date: '19 Feb 2023', amount: 120, status: 'Completed' },
  { id: '6', date: '20 Feb 2023', amount: 500, status: 'Completed' },
  { id: '7', date: '21 Feb 2023', amount: 90, status: 'Completed' },
  { id: '8', date: '22 Feb 2023', amount: 60, status: 'Completed' },
  { id: '9', date: '23 Feb 2023', amount: 1200, status: 'Completed' },
  { id: '10', date: '24 Feb 2023', amount: 45, status: 'Completed' },
];

const HomeScreen = () => {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#3c1ecb"
        translucent={false}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.screen}>
          <View style={styles.topSection}>
            <View style={styles.headerRow}>
              <CustomLogo color="#FFFFFF" />
              <View style={styles.profileRow}>
                <CustomAppText style={styles.userName}>John Doe</CustomAppText>
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
                {formatCurrency(10000)}
              </CustomAppText>
            </View>

            <View style={styles.historySection}>
              <CustomAppText style={styles.sectionTitle}>
                Transaction History
              </CustomAppText>

              <View style={styles.historyCard}>
                <FlatList
                  data={transactions}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContent}
                  ItemSeparatorComponent={() => <View style={styles.divider} />}
                  renderItem={({ item }) => (
                    <View style={styles.transactionItem}>
                      <View style={styles.transactionIcon}>
                        <MaterialIcons
                          name="check-circle"
                          size={18}
                          color="#22C55E"
                        />
                      </View>
                      <View style={styles.transactionLeft}>
                        <View style={styles.dateRow}>
                          <CustomAppText style={styles.transactionDate}>
                            {item.date}
                          </CustomAppText>
                        </View>

                        <CustomAppText style={styles.transactionStatus}>
                          {item.status}
                        </CustomAppText>
                      </View>

                      <CustomAppText style={styles.transactionAmount}>
                        {formatCurrency(item.amount)}
                      </CustomAppText>
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
