import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

const TukTukServicesScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const tuktuks = useSelector((state) => state.transport.tuktuks);

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tuk-tuk Services</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoBanner}>
          <Feather name="info" size={20} color={Colors.gold} />
          <Text style={styles.infoBannerText}>
            Most economical way to travel short distances
          </Text>
        </View>

        {tuktuks.map((tuktuk) => (
          <View key={tuktuk.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.iconContainer}>
                <Feather name="zap" size={28} color={Colors.gold} />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{tuktuk.name}</Text>
                <View style={styles.ratingRow}>
                  <Feather name="star" size={14} color={Colors.gold} />
                  <Text style={styles.ratingText}>{tuktuk.rating}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.description}>{tuktuk.description}</Text>

            <View style={styles.pricingSection}>
              <View style={styles.pricingItem}>
                <Text style={styles.pricingLabel}>Base Fare</Text>
                <Text style={styles.pricingValue}>රු {tuktuk.basePrice}</Text>
              </View>
              <View style={styles.pricingItem}>
                <Text style={styles.pricingLabel}>Per KM</Text>
                <Text style={styles.pricingValue}>රු {tuktuk.pricePerKm}</Text>
              </View>
              <View style={styles.pricingItem}>
                <Text style={styles.pricingLabel}>Negotiable</Text>
                <Text style={styles.pricingValue}>{tuktuk.negotiable ? 'Yes' : 'No'}</Text>
              </View>
            </View>

            {tuktuk.tips && (
              <View style={styles.tipBox}>
                <Feather name="alert-circle" size={16} color={Colors.deepSaffron} />
                <Text style={styles.tipText}>{tuktuk.tips}</Text>
              </View>
            )}

            {tuktuk.appRequired && (
              <TouchableOpacity 
                style={styles.bookButton}
                onPress={() => Linking.openURL('https://www.pickme.lk/')}
              >
                <Feather name="smartphone" size={18} color="#FFF" />
                <Text style={styles.bookButtonText}>Download App</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Safety Tips</Text>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipItemText}>Always agree on fare before starting</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipItemText}>Use metered tuk-tuks when available</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipItemText}>Keep small change for payment</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipItemText}>Share your ride details with someone</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
    },
    infoBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.gold + '20',
      margin: 20,
      padding: 16,
      borderRadius: 12,
    },
    infoBannerText: {
      flex: 1,
      fontSize: 14,
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginLeft: 12,
    },
    serviceCard: {
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderRadius: 16,
      marginHorizontal: 20,
      marginBottom: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    serviceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Colors.gold + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    serviceInfo: {
      flex: 1,
    },
    serviceName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 4,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      fontSize: 13,
      fontWeight: '600',
      color: Colors.gold,
      marginLeft: 4,
    },
    description: {
      fontSize: 14,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      lineHeight: 20,
      marginBottom: 16,
    },
    pricingSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
      padding: 12,
      borderRadius: 12,
      marginBottom: 12,
    },
    pricingItem: {
      alignItems: 'center',
    },
    pricingLabel: {
      fontSize: 11,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginBottom: 4,
    },
    pricingValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.gold,
    },
    tipBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.deepSaffron + '20',
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
    },
    tipText: {
      flex: 1,
      fontSize: 13,
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginLeft: 8,
      fontStyle: 'italic',
    },
    bookButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.gold,
      paddingVertical: 14,
      borderRadius: 12,
    },
    bookButtonText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#FFF',
      marginLeft: 8,
    },
    tipsSection: {
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      margin: 20,
      padding: 20,
      borderRadius: 16,
      marginBottom: 40,
    },
    tipsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 16,
    },
    tipItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    tipItemText: {
      flex: 1,
      fontSize: 14,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginLeft: 12,
      lineHeight: 20,
    },
  });

export default TukTukServicesScreen;
