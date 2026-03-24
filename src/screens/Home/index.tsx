import React from 'react';
import {
  View,
  StatusBar,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import CustomAppText from '../../components/CustomAppText';
import CustomLogo from '../../components/CustomLogo';
import { styles } from './styles';
import { colors } from '../../theme/colors';
import useHome from './useHome';
import { formatCurrency } from '../../utils/number';
import { formatLastUpdated } from '../../utils/date';

const HomeScreen = () => {
  const {
    userName,
    availableBalance,
    txns,
    refreshing,
    lastUpdated,
    onRefresh,
  } = useHome();

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
                <CustomAppText
                  variant="sectionTitle"
                  color={colors.background}
                  style={styles.userName}
                  numberOfLines={1}
                >
                  {userName || ''}
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
            contentContainerStyle={styles.bottomContent}
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
              <CustomAppText
                variant="caption"
                color={colors.textMuted}
                align="right"
                style={styles.lastUpdatedText}
              >
                Last updated {formatLastUpdated(lastUpdated)}
              </CustomAppText>
            )}

            <View style={styles.balanceCard}>
              <CustomAppText
                variant="body"
                color={colors.textMuted}
                style={styles.balanceLabel}
              >
                Available Balance
              </CustomAppText>

              <CustomAppText
                variant="amount"
                color={colors.textPrimary}
                style={styles.balanceAmount}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {availableBalance !== null
                  ? formatCurrency(availableBalance)
                  : '-'}
              </CustomAppText>
            </View>

            <View style={styles.historySection}>
              <CustomAppText
                variant="sectionTitle"
                color={colors.textPrimary}
                style={styles.sectionTitle}
              >
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
                            <CustomAppText
                              variant="bodyMedium"
                              color={colors.textPrimary}
                              style={styles.transactionDate}
                            >
                              {item.date}
                            </CustomAppText>
                          </View>

                          <CustomAppText
                            variant="caption"
                            color={colors.textMuted}
                            style={styles.transactionStatus}
                          >
                            Completed
                          </CustomAppText>
                        </View>

                        <View style={styles.transactionRight}>
                          <CustomAppText
                            variant="bodyMedium"
                            color={colors.textPrimary}
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