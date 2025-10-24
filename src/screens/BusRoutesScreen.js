import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

const BusRoutesScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const busRoutes = useSelector((state) => state.transport.busRoutes);

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bus Routes</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Feather name="info" size={20} color={Colors.forestGreen} />
          <Text style={styles.infoBannerText}>
            Frequent services available from major bus stations
          </Text>
        </View>

        {/* Bus Routes List */}
        {busRoutes.map((route) => (
          <View key={route.id} style={styles.routeCard}>
            <View style={styles.routeHeader}>
              <View style={styles.routeHeaderLeft}>
                <View style={styles.routeIconContainer}>
                  <Feather name="truck" size={24} color={Colors.forestGreen} />
                </View>
                <View style={styles.routeHeaderText}>
                  <Text style={styles.routeName}>{route.name}</Text>
                  {route.acAvailable && (
                    <View style={styles.acBadge}>
                      <Feather name="wind" size={12} color={Colors.oceanBlue} />
                      <Text style={styles.acText}>AC Available</Text>
                    </View>
                  )}
                </View>
              </View>
              {route.popular && (
                <View style={styles.popularBadge}>
                  <Feather name="star" size={12} color="#FFF" />
                  <Text style={styles.popularText}>Popular</Text>
                </View>
              )}
            </View>

            <View style={styles.routeDetails}>
              <View style={styles.routeRow}>
                <View style={styles.routePoint}>
                  <View style={[styles.dot, { backgroundColor: Colors.forestGreen }]} />
                  <Text style={styles.locationText}>{route.from}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routePoint}>
                  <View style={[styles.dot, { backgroundColor: Colors.coral }]} />
                  <Text style={styles.locationText}>{route.to}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Feather name="clock" size={16} color={Colors.mediumGray} />
                  <Text style={styles.infoText}>{route.duration}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Feather name="navigation" size={16} color={Colors.mediumGray} />
                  <Text style={styles.infoText}>{route.distance}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Feather name="calendar" size={16} color={Colors.mediumGray} />
                  <Text style={styles.infoText}>{route.frequency}</Text>
                </View>
              </View>

              <Text style={styles.description}>{route.description}</Text>

              {/* Price Info */}
              <View style={styles.priceSection}>
                <Text style={styles.priceLabel}>Ticket Prices (LKR):</Text>
                <View style={styles.priceRow}>
                  <View style={styles.priceItem}>
                    <Text style={styles.priceClass}>Luxury</Text>
                    <Text style={styles.priceValue}>රු {route.price.luxury}</Text>
                  </View>
                  <View style={styles.priceItem}>
                    <Text style={styles.priceClass}>Semi-Luxury</Text>
                    <Text style={styles.priceValue}>රු {route.price.semiLuxury}</Text>
                  </View>
                  <View style={styles.priceItem}>
                    <Text style={styles.priceClass}>Normal</Text>
                    <Text style={styles.priceValue}>රු {route.price.normal}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Travel Tips</Text>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Expressway buses are faster but costlier</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>AC buses recommended for long journeys</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Book tickets early for holiday seasons</Text>
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
      backgroundColor: Colors.forestGreen + '20',
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
    routeCard: {
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderRadius: 16,
      marginHorizontal: 20,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    routeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 16,
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
    },
    routeHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    routeIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: Colors.forestGreen + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    routeHeaderText: {
      flex: 1,
    },
    routeName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 4,
    },
    acBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.oceanBlue + '20',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    acText: {
      fontSize: 11,
      color: Colors.oceanBlue,
      marginLeft: 4,
      fontWeight: '600',
    },
    popularBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.deepSaffron,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
    },
    popularText: {
      fontSize: 11,
      color: '#FFF',
      marginLeft: 4,
      fontWeight: '600',
    },
    routeDetails: {
      padding: 16,
    },
    routeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    routePoint: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 8,
    },
    locationText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
    },
    routeLine: {
      height: 2,
      flex: 0.3,
      backgroundColor: isDarkMode ? Colors.darkBorder : Colors.lightGray,
      marginHorizontal: 8,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoText: {
      fontSize: 12,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginLeft: 6,
    },
    description: {
      fontSize: 13,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      lineHeight: 20,
      marginBottom: 16,
    },
    priceSection: {
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
      padding: 12,
      borderRadius: 12,
    },
    priceLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 8,
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priceItem: {
      alignItems: 'center',
    },
    priceClass: {
      fontSize: 11,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginBottom: 4,
    },
    priceValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.forestGreen,
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

export default BusRoutesScreen;
