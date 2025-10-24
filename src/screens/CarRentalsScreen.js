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

const CarRentalsScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const carRentals = useSelector((state) => state.transport.carRentals);

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Car Rentals</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoBanner}>
          <Feather name="info" size={20} color={Colors.coral} />
          <Text style={styles.infoBannerText}>
            Perfect for exploring at your own pace
          </Text>
        </View>

        {carRentals.map((rental) => (
          <View key={rental.id} style={styles.rentalCard}>
            <View style={styles.rentalHeader}>
              <View style={styles.iconContainer}>
                <Feather name="briefcase" size={28} color={Colors.coral} />
              </View>
              <View style={styles.rentalInfo}>
                <Text style={styles.rentalName}>{rental.name}</Text>
                <View style={styles.ratingRow}>
                  <Feather name="star" size={14} color={Colors.gold} />
                  <Text style={styles.ratingText}>{rental.rating}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.description}>{rental.description}</Text>

            {/* Vehicle Types */}
            <View style={styles.vehicleSection}>
              <Text style={styles.sectionTitle}>Vehicle Types</Text>
              <View style={styles.vehicleGrid}>
                {rental.vehicleTypes.map((type, index) => (
                  <View key={index} style={styles.vehicleBadge}>
                    <Feather name="check" size={14} color={Colors.forestGreen} />
                    <Text style={styles.vehicleText}>{type}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Pricing */}
            <View style={styles.pricingSection}>
              <Text style={styles.sectionTitle}>Daily Rates (LKR)</Text>
              <View style={styles.priceGrid}>
                {Object.entries(rental.pricePerDay).map(([type, price]) => (
                  <View key={type} style={styles.priceItem}>
                    <Text style={styles.priceType}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                    <Text style={styles.priceValue}>රු {price.toLocaleString()}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Services */}
            <View style={styles.servicesSection}>
              <View style={styles.serviceItem}>
                <Feather 
                  name={rental.withDriver ? 'check-circle' : 'x-circle'} 
                  size={16} 
                  color={rental.withDriver ? Colors.forestGreen : Colors.coral} 
                />
                <Text style={styles.serviceText}>With Driver</Text>
              </View>
              <View style={styles.serviceItem}>
                <Feather 
                  name={rental.selfDrive ? 'check-circle' : 'x-circle'} 
                  size={16} 
                  color={rental.selfDrive ? Colors.forestGreen : Colors.coral} 
                />
                <Text style={styles.serviceText}>Self-Drive</Text>
              </View>
            </View>

            {/* Contact */}
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => Linking.openURL(`tel:${rental.contact}`)}
            >
              <Feather name="phone" size={18} color="#FFF" />
              <Text style={styles.contactButtonText}>Call {rental.contact}</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Rental Tips</Text>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Check insurance coverage before booking</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Inspect vehicle condition thoroughly</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Valid driving license required for self-drive</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Book in advance for peak seasons</Text>
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
      backgroundColor: Colors.coral + '20',
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
    rentalCard: {
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
    rentalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Colors.coral + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    rentalInfo: {
      flex: 1,
    },
    rentalName: {
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
    vehicleSection: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 8,
    },
    vehicleGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    vehicleBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.forestGreen + '20',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      marginRight: 8,
      marginBottom: 8,
    },
    vehicleText: {
      fontSize: 12,
      color: Colors.forestGreen,
      marginLeft: 4,
      fontWeight: '600',
    },
    pricingSection: {
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
      padding: 12,
      borderRadius: 12,
      marginBottom: 12,
    },
    priceGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    priceItem: {
      width: '48%',
      alignItems: 'center',
      marginBottom: 8,
    },
    priceType: {
      fontSize: 12,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginBottom: 4,
    },
    priceValue: {
      fontSize: 15,
      fontWeight: 'bold',
      color: Colors.coral,
    },
    servicesSection: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
    },
    serviceItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    serviceText: {
      fontSize: 13,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginLeft: 6,
    },
    contactButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.coral,
      paddingVertical: 14,
      borderRadius: 12,
    },
    contactButtonText: {
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

export default CarRentalsScreen;
