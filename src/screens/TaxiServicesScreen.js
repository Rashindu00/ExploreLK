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

const TaxiServicesScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const taxis = useSelector((state) => state.transport.taxis);

  const calculatePrice = (service, distance) => {
    const distanceNum = parseFloat(distance) || 10;
    return service.basePrice + (service.pricePerKm * distanceNum);
  };

  const openApp = (serviceName) => {
    const urls = {
      'Uber Sri Lanka': 'https://www.uber.com/',
      'PickMe': 'https://www.pickme.lk/',
      'Kangaroo Cabs': 'tel:+94112588588',
    };
    
    if (urls[serviceName]) {
      Linking.openURL(urls[serviceName]);
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Taxi Services</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Feather name="info" size={20} color={Colors.deepSaffron} />
          <Text style={styles.infoBannerText}>
            Download apps for best rates and convenience
          </Text>
        </View>

        {/* Taxi Services List */}
        {taxis.map((taxi) => (
          <View key={taxi.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceHeaderLeft}>
                <View style={styles.iconContainer}>
                  <Feather name="navigation" size={28} color={Colors.deepSaffron} />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{taxi.name}</Text>
                  <Text style={styles.serviceType}>{taxi.serviceType}</Text>
                  <View style={styles.ratingRow}>
                    <Feather name="star" size={14} color={Colors.gold} />
                    <Text style={styles.ratingText}>{taxi.rating}</Text>
                  </View>
                </View>
              </View>
              {taxi.available24x7 && (
                <View style={styles.availableBadge}>
                  <Feather name="clock" size={12} color="#FFF" />
                  <Text style={styles.availableText}>24/7</Text>
                </View>
              )}
            </View>

            <Text style={styles.description}>{taxi.description}</Text>

            {/* Pricing */}
            <View style={styles.pricingSection}>
              <Text style={styles.pricingTitle}>Pricing</Text>
              <View style={styles.pricingRow}>
                <View style={styles.pricingItem}>
                  <Text style={styles.pricingLabel}>Base Fare</Text>
                  <Text style={styles.pricingValue}>රු {taxi.basePrice}</Text>
                </View>
                <View style={styles.pricingItem}>
                  <Text style={styles.pricingLabel}>Per KM</Text>
                  <Text style={styles.pricingValue}>රු {taxi.pricePerKm}</Text>
                </View>
                <View style={styles.pricingItem}>
                  <Text style={styles.pricingLabel}>10 KM Trip</Text>
                  <Text style={styles.pricingValue}>රු {calculatePrice(taxi, 10)}</Text>
                </View>
              </View>
            </View>

            {/* Features */}
            <View style={styles.featuresSection}>
              <View style={styles.featureItem}>
                <Feather 
                  name={taxi.appRequired ? 'check-circle' : 'x-circle'} 
                  size={16} 
                  color={taxi.appRequired ? Colors.forestGreen : Colors.coral} 
                />
                <Text style={styles.featureText}>
                  {taxi.appRequired ? 'App Required' : 'Phone Booking Available'}
                </Text>
              </View>
              {taxi.phone && (
                <View style={styles.featureItem}>
                  <Feather name="phone" size={16} color={Colors.oceanBlue} />
                  <Text style={styles.featureText}>{taxi.phone}</Text>
                </View>
              )}
            </View>

            {/* Action Button */}
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => openApp(taxi.name)}
            >
              <Feather name="external-link" size={18} color="#FFF" />
              <Text style={styles.bookButtonText}>
                {taxi.appRequired ? 'Open App/Website' : 'Call Now'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Booking Tips</Text>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Compare prices before booking</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Book during off-peak hours for better availability</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Check driver ratings before confirming</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Keep emergency contact numbers handy</Text>
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
      backgroundColor: Colors.deepSaffron + '20',
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
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    serviceHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Colors.deepSaffron + '20',
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
    serviceType: {
      fontSize: 13,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
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
    availableBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.forestGreen,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
    },
    availableText: {
      fontSize: 11,
      color: '#FFF',
      marginLeft: 4,
      fontWeight: '600',
    },
    description: {
      fontSize: 14,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      lineHeight: 20,
      marginBottom: 16,
    },
    pricingSection: {
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
      padding: 12,
      borderRadius: 12,
      marginBottom: 12,
    },
    pricingTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 12,
    },
    pricingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      color: Colors.deepSaffron,
    },
    featuresSection: {
      marginBottom: 16,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    featureText: {
      fontSize: 13,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginLeft: 8,
    },
    bookButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.deepSaffron,
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
    tipText: {
      flex: 1,
      fontSize: 14,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginLeft: 12,
      lineHeight: 20,
    },
  });

export default TaxiServicesScreen;
