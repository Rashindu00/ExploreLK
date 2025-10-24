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

const RoutePlannerScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showResults, setShowResults] = useState(false);

  const popularCities = [
    'Colombo', 'Kandy', 'Galle', 'Ella', 'Anuradhapura',
    'Jaffna', 'Trincomalee', 'Nuwara Eliya', 'Mirissa', 'Arugam Bay'
  ];

  const handleSearch = () => {
    if (from && to) {
      setShowResults(true);
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Route Planner</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.inputContainer}>
            <Feather name="map-pin" size={20} color={Colors.forestGreen} />
            <TextInput
              style={styles.input}
              placeholder="From (City)"
              placeholderTextColor={Colors.mediumGray}
              value={from}
              onChangeText={setFrom}
            />
          </View>

          <View style={styles.swapContainer}>
            <View style={styles.verticalLine} />
            <TouchableOpacity 
              style={styles.swapButton}
              onPress={() => {
                const temp = from;
                setFrom(to);
                setTo(temp);
              }}
            >
              <Feather name="repeat" size={20} color={Colors.deepSaffron} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Feather name="navigation" size={20} color={Colors.coral} />
            <TextInput
              style={styles.input}
              placeholder="To (City)"
              placeholderTextColor={Colors.mediumGray}
              value={to}
              onChangeText={setTo}
            />
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Feather name="search" size={20} color="#FFF" />
            <Text style={styles.searchButtonText}>Find Routes</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Cities */}
        <View style={styles.citiesSection}>
          <Text style={styles.sectionTitle}>Popular Cities</Text>
          <View style={styles.citiesGrid}>
            {popularCities.map((city, index) => (
              <TouchableOpacity
                key={index}
                style={styles.cityChip}
                onPress={() => {
                  if (!from) setFrom(city);
                  else if (!to) setTo(city);
                }}
              >
                <Text style={styles.cityText}>{city}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Results */}
        {showResults && from && to && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Route: {from} → {to}</Text>
            
            {/* Train Option */}
            <View style={styles.optionCard}>
              <View style={styles.optionHeader}>
                <View style={styles.optionIcon}>
                  <Feather name="activity" size={24} color={Colors.oceanBlue} />
                </View>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>By Train</Text>
                  <Text style={styles.optionDetail}>Scenic & Economical</Text>
                </View>
                <TouchableOpacity 
                  style={styles.viewButton}
                  onPress={() => navigation.navigate('TrainRoutes')}
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.optionStats}>
                <View style={styles.statItem}>
                  <Feather name="clock" size={14} color={Colors.mediumGray} />
                  <Text style={styles.statText}>2-3 hrs</Text>
                </View>
                <View style={styles.statItem}>
                  <Feather name="dollar-sign" size={14} color={Colors.mediumGray} />
                  <Text style={styles.statText}>රු 100-300</Text>
                </View>
              </View>
            </View>

            {/* Bus Option */}
            <View style={styles.optionCard}>
              <View style={styles.optionHeader}>
                <View style={[styles.optionIcon, { backgroundColor: Colors.forestGreen + '20' }]}>
                  <Feather name="truck" size={24} color={Colors.forestGreen} />
                </View>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>By Bus</Text>
                  <Text style={styles.optionDetail}>Frequent Services</Text>
                </View>
                <TouchableOpacity 
                  style={styles.viewButton}
                  onPress={() => navigation.navigate('BusRoutes')}
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.optionStats}>
                <View style={styles.statItem}>
                  <Feather name="clock" size={14} color={Colors.mediumGray} />
                  <Text style={styles.statText}>3-4 hrs</Text>
                </View>
                <View style={styles.statItem}>
                  <Feather name="dollar-sign" size={14} color={Colors.mediumGray} />
                  <Text style={styles.statText}>රු 180-450</Text>
                </View>
              </View>
            </View>

            {/* Taxi Option */}
            <View style={styles.optionCard}>
              <View style={styles.optionHeader}>
                <View style={[styles.optionIcon, { backgroundColor: Colors.deepSaffron + '20' }]}>
                  <Feather name="navigation" size={24} color={Colors.deepSaffron} />
                </View>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>By Taxi</Text>
                  <Text style={styles.optionDetail}>Comfortable & Fast</Text>
                </View>
                <TouchableOpacity 
                  style={styles.viewButton}
                  onPress={() => navigation.navigate('TaxiServices')}
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.optionStats}>
                <View style={styles.statItem}>
                  <Feather name="clock" size={14} color={Colors.mediumGray} />
                  <Text style={styles.statText}>2.5-3 hrs</Text>
                </View>
                <View style={styles.statItem}>
                  <Feather name="dollar-sign" size={14} color={Colors.mediumGray} />
                  <Text style={styles.statText}>රු 6,000-8,000</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Feather name="lightbulb" size={20} color={Colors.gold} />
          <View style={styles.tipsContent}>
            <Text style={styles.tipsTitle}>Planning Tips</Text>
            <Text style={styles.tipsText}>
              • Compare prices and timings{'\n'}
              • Book in advance for popular routes{'\n'}
              • Consider scenic routes for better experience{'\n'}
              • Check weather before hill country trips
            </Text>
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
    searchSection: {
      padding: 20,
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 12,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginLeft: 12,
    },
    swapContainer: {
      alignItems: 'center',
      marginVertical: -6,
      zIndex: 1,
    },
    verticalLine: {
      width: 2,
      height: 20,
      backgroundColor: isDarkMode ? Colors.darkBorder : Colors.lightGray,
      position: 'absolute',
      top: -14,
    },
    swapButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: isDarkMode ? Colors.darkBorder : Colors.lightGray,
    },
    searchButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.deepSaffron,
      borderRadius: 12,
      paddingVertical: 16,
      marginTop: 8,
    },
    searchButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFF',
      marginLeft: 8,
    },
    citiesSection: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 16,
    },
    citiesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    cityChip: {
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    cityText: {
      fontSize: 14,
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      fontWeight: '500',
    },
    resultsSection: {
      padding: 20,
    },
    resultsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 16,
    },
    optionCard: {
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    optionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    optionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: Colors.oceanBlue + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    optionInfo: {
      flex: 1,
    },
    optionName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 2,
    },
    optionDetail: {
      fontSize: 13,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    },
    viewButton: {
      backgroundColor: Colors.deepSaffron,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    viewButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#FFF',
    },
    optionStats: {
      flexDirection: 'row',
      gap: 24,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statText: {
      fontSize: 13,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginLeft: 6,
    },
    tipsCard: {
      flexDirection: 'row',
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      margin: 20,
      padding: 16,
      borderRadius: 12,
      marginBottom: 40,
    },
    tipsContent: {
      flex: 1,
      marginLeft: 12,
    },
    tipsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 8,
    },
    tipsText: {
      fontSize: 13,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      lineHeight: 20,
    },
  });

export default RoutePlannerScreen;
