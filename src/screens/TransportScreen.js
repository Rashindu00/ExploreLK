import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

const TransportScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');

  const transportOptions = [
    {
      id: '1',
      title: 'Trains',
      subtitle: 'Scenic routes & schedules',
      icon: 'activity',
      color: Colors.oceanBlue,
      route: 'TrainRoutes',
      count: '4 popular routes',
    },
    {
      id: '2',
      title: 'Buses',
      subtitle: 'Frequent & affordable',
      icon: 'truck',
      color: Colors.forestGreen,
      route: 'BusRoutes',
      count: '4 major routes',
    },
    {
      id: '3',
      title: 'Taxis & Ride-hailing',
      subtitle: 'Comfortable & convenient',
      icon: 'navigation',
      color: Colors.deepSaffron,
      route: 'TaxiServices',
      count: '3 services',
    },
    {
      id: '4',
      title: 'Tuk-tuks',
      subtitle: 'Local experience',
      icon: 'zap',
      color: Colors.gold,
      route: 'TukTukServices',
      count: 'Local & app-based',
    },
    {
      id: '5',
      title: 'Car Rentals',
      subtitle: 'Self-drive or with driver',
      icon: 'briefcase',
      color: Colors.coral,
      route: 'CarRentals',
      count: '2 rental companies',
    },
    {
      id: '6',
      title: 'Route Planner',
      subtitle: 'Plan your journey',
      icon: 'map',
      color: Colors.purple,
      route: 'RoutePlanner',
      count: 'Find best routes',
    },
  ];

  const quickRoutes = [
    { from: 'Colombo', to: 'Kandy', icon: '🏔️' },
    { from: 'Kandy', to: 'Ella', icon: '🚂' },
    { from: 'Colombo', to: 'Galle', icon: '🏖️' },
    { from: 'Galle', to: 'Mirissa', icon: '🐋' },
  ];

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Transportation</Text>
            <Text style={styles.headerSubtitle}>Travel across Sri Lanka</Text>
          </View>
          <TouchableOpacity
            style={styles.bookingsButton}
            onPress={() => navigation.navigate('MyBookings')}
          >
            <Feather name="bookmark" size={24} color={Colors.deepSaffron} />
          </TouchableOpacity>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Feather name="map-pin" size={18} color={Colors.forestGreen} />
            <TextInput
              style={styles.searchInput}
              placeholder="From (e.g., Colombo)"
              placeholderTextColor={Colors.mediumGray}
              value={searchFrom}
              onChangeText={setSearchFrom}
            />
          </View>
          
          <View style={styles.swapButtonContainer}>
            <TouchableOpacity 
              style={styles.swapButton}
              onPress={() => {
                const temp = searchFrom;
                setSearchFrom(searchTo);
                setSearchTo(temp);
              }}
            >
              <Feather name="repeat" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchInputContainer}>
            <Feather name="navigation" size={18} color={Colors.coral} />
            <TextInput
              style={styles.searchInput}
              placeholder="To (e.g., Kandy)"
              placeholderTextColor={Colors.mediumGray}
              value={searchTo}
              onChangeText={setSearchTo}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => {
              if (searchFrom && searchTo) {
                navigation.navigate('RoutePlanner', { 
                  from: searchFrom, 
                  to: searchTo 
                });
              }
            }}
          >
            <Feather name="search" size={20} color="#FFF" />
            <Text style={styles.searchButtonText}>Search Routes</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quick Routes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickRoutes.map((route, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickRouteCard}
                onPress={() => {
                  setSearchFrom(route.from);
                  setSearchTo(route.to);
                }}
              >
                <Text style={styles.routeEmoji}>{route.icon}</Text>
                <Text style={styles.routeFrom}>{route.from}</Text>
                <Feather name="arrow-right" size={16} color={Colors.mediumGray} />
                <Text style={styles.routeTo}>{route.to}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Transport Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transport Options</Text>
          <View style={styles.optionsGrid}>
            {transportOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionCard}
                onPress={() => navigation.navigate(option.route)}
              >
                <View style={[styles.optionIconContainer, { backgroundColor: option.color + '20' }]}>
                  <Feather name={option.icon} size={28} color={option.color} />
                </View>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                <View style={styles.optionFooter}>
                  <Text style={styles.optionCount}>{option.count}</Text>
                  <Feather name="chevron-right" size={16} color={Colors.mediumGray} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Travel Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Tips</Text>
          <View style={styles.tipCard}>
            <Feather name="info" size={20} color={Colors.oceanBlue} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Book train tickets early</Text>
              <Text style={styles.tipText}>
                Popular scenic routes like Kandy-Ella fill up quickly
              </Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Feather name="clock" size={20} color={Colors.gold} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Best travel times</Text>
              <Text style={styles.tipText}>
                Avoid peak hours (7-9 AM, 5-7 PM) for comfortable travel
              </Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Feather name="dollar-sign" size={20} color={Colors.forestGreen} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Budget friendly</Text>
              <Text style={styles.tipText}>
                Buses and trains are the most economical options
              </Text>
            </View>
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
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 20,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    },
    bookingsButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchSection: {
      marginTop: 8,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginLeft: 12,
    },
    swapButtonContainer: {
      alignItems: 'center',
      marginBottom: 12,
    },
    swapButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: Colors.deepSaffron,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    searchButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.deepSaffron,
      borderRadius: 12,
      paddingVertical: 16,
      marginTop: 4,
    },
    searchButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFF',
      marginLeft: 8,
    },
    section: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 16,
    },
    quickRouteCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderRadius: 16,
      padding: 16,
      marginRight: 12,
      minWidth: 200,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    routeEmoji: {
      fontSize: 24,
      marginRight: 8,
    },
    routeFrom: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginRight: 8,
    },
    routeTo: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginLeft: 8,
    },
    optionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    optionCard: {
      width: '48%',
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    optionIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 4,
    },
    optionSubtitle: {
      fontSize: 12,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginBottom: 12,
    },
    optionFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    optionCount: {
      fontSize: 11,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    },
    tipCard: {
      flexDirection: 'row',
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    tipContent: {
      flex: 1,
      marginLeft: 12,
    },
    tipTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 4,
    },
    tipText: {
      fontSize: 12,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      lineHeight: 18,
    },
  });

export default TransportScreen;
