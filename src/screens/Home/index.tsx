import React from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAppText from '../../components/CustomAppText';
import { styles } from './styles';

const transactions = [
  { id: '1', date: '15 Feb 2023', amount: '$100.00', status: 'Completed' },
  { id: '2', date: '16 Feb 2023', amount: '$250.00', status: 'Completed' },
  { id: '3', date: '17 Feb 2023', amount: '$80.00', status: 'Completed' },
  { id: '4', date: '18 Feb 2023', amount: '$300.00', status: 'Completed' },
  { id: '5', date: '19 Feb 2023', amount: '$120.00', status: 'Completed' },
  { id: '6', date: '20 Feb 2023', amount: '$500.00', status: 'Completed' },
  { id: '7', date: '21 Feb 2023', amount: '$90.00', status: 'Completed' },
  { id: '8', date: '22 Feb 2023', amount: '$60.00', status: 'Completed' },
  { id: '9', date: '23 Feb 2023', amount: '$1,200.00', status: 'Completed' },
  { id: '10', date: '24 Feb 2023', amount: '$45.00', status: 'Completed' },
];

const HomeScreen = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#3c1ecb"
        translucent={false}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.screen}>
          {/* Header Section */}
          <View style={styles.topSection}>
            <View style={styles.headerRow}>
              <View style={styles.profileRow}>
                <CustomAppText style={styles.userName}>John Doe</CustomAppText>
                <View style={styles.avatar}>
                  <CustomAppText style={styles.avatarText}>J</CustomAppText>
                </View>
              </View>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.bottomSection}>
            {/* Balance Card: แก้ไขเรื่องเงินล้นขอบ */}
            <View style={styles.balanceCard}>
              <CustomAppText style={styles.balanceLabel}>
                Available Balance
              </CustomAppText>
              <CustomAppText 
                style={styles.balanceAmount}
                numberOfLines={1}
                adjustsFontSizeToFit // ย่อขนาดอักษรอัตโนมัติถ้าเลขยาวเกิน
              >
                $10,000.00
              </CustomAppText>
            </View>

            {/* History Section: แก้ไขเรื่อง Scroll และ Tab ทับ */}
            <View style={styles.historySection}>
              <CustomAppText style={styles.sectionTitle}>
                Transaction History
              </CustomAppText>

              <View style={styles.historyCard}>
                <FlatList
                  data={transactions}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  // paddingBottom: 100 ช่วยดันรายการสุดท้ายขึ้นมาจาก Tab Bar
                  contentContainerStyle={styles.listContent}
                  ItemSeparatorComponent={() => <View style={styles.divider} />}
                  renderItem={({ item }) => (
                    <View style={styles.transactionItem}>
                      <View style={styles.transactionLeft}>
                        <CustomAppText style={styles.transactionDate}>
                          {item.date}
                        </CustomAppText>
                        <CustomAppText style={styles.transactionStatus}>
                          {item.status}
                        </CustomAppText>
                      </View>
                      <CustomAppText style={styles.transactionAmount}>
                        {item.amount}
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