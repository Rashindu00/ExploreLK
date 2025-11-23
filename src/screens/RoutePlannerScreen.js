import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

// Platform-specific imports
let MapView, Marker, Polyline, Location;

// Only import maps on native platforms
const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

if (isNative) {
  try {
    const RNMaps = require('react-native-maps');
    MapView = RNMaps.default || RNMaps;
    Marker = RNMaps.Marker;
    Polyline = RNMaps.Polyline;
    Location = require('expo-location');
  } catch (e) {
    console.log('Maps not available on this platform');
  }
}

const RoutePlannerScreen = ({ navigation, route }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [from, setFrom] = useState(route.params?.from || '');
  const [to, setTo] = useState(route.params?.to || '');
  const [showResults, setShowResults] = useState(false);
  const [region, setRegion] = useState(null);

  // Sri Lankan cities coordinates
  const cityCoordinates = {
    'Colombo': { latitude: 6.9271, longitude: 79.8612 },
    'Kandy': { latitude: 7.2906, longitude: 80.6337 },
    'Galle': { latitude: 6.0535, longitude: 80.2210 },
    'Ella': { latitude: 6.8667, longitude: 81.0467 },
    'Anuradhapura': { latitude: 8.3114, longitude: 80.4037 },
    'Jaffna': { latitude: 9.6615, longitude: 80.0255 },
    'Trincomalee': { latitude: 8.5874, longitude: 81.2152 },
    'Nuwara Eliya': { latitude: 6.9497, longitude: 80.7891 },
    'Mirissa': { latitude: 5.9470, longitude: 80.4560 },
    'Arugam Bay': { latitude: 6.8417, longitude: 81.8364 },
  };

  useEffect(() => {
    // Auto-search if params are provided
    if (route.params?.from && route.params?.to) {
      setShowResults(true);
    }
  }, [route.params]);

  useEffect(() => {
    // Skip location request on web
    if (!isNative) {
      setRegion({
        latitude: 7.8731,
        longitude: 80.7718,
        latitudeDelta: 2,
        longitudeDelta: 2,
      });
      return;
    }

    (async () => {
      if (!Location) return;
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is needed to show the map.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 2,
        longitudeDelta: 2,
      });
    })();
  }, []);

  const openInGoogleMaps = () => {
    const fromCoords = cityCoordinates[from];
    const toCoords = cityCoordinates[to];
    
    if (!fromCoords || !toCoords) {
      Alert.alert('Error', 'Please select valid cities from the list');
      return;
    }

    const url = Platform.select({
      ios: `maps://app?saddr=${fromCoords.latitude},${fromCoords.longitude}&daddr=${toCoords.latitude},${toCoords.longitude}`,
      android: `google.navigation:q=${toCoords.latitude},${toCoords.longitude}&origin=${fromCoords.latitude},${fromCoords.longitude}`,
    });

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // Fallback to web
        const webUrl = `https://www.google.com/maps/dir/?api=1&origin=${fromCoords.latitude},${fromCoords.longitude}&destination=${toCoords.latitude},${toCoords.longitude}&travelmode=driving`;
        Linking.openURL(webUrl);
      }
    });
  };

  const getRouteCoordinates = () => {
    const fromCoords = cityCoordinates[from];
    const toCoords = cityCoordinates[to];
    
    if (!fromCoords || !toCoords) return [];
    
    return [
      { latitude: fromCoords.latitude, longitude: fromCoords.longitude },
      { latitude: toCoords.latitude, longitude: toCoords.longitude },
    ];
  };

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
            <View style={styles.routeHeader}>
              <Text style={styles.resultsTitle}>Route: {from} → {to}</Text>
              <TouchableOpacity 
                style={styles.navigateButton}
                onPress={openInGoogleMaps}
              >
                <Feather name="navigation" size={18} color="#FFF" />
                <Text style={styles.navigateButtonText}>Navigate</Text>
              </TouchableOpacity>
            </View>

            {/* Map View - Only on Native Platforms */}
            {isNative && MapView && region && cityCoordinates[from] && cityCoordinates[to] && (
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: (cityCoordinates[from].latitude + cityCoordinates[to].latitude) / 2,
                    longitude: (cityCoordinates[from].longitude + cityCoordinates[to].longitude) / 2,
                    latitudeDelta: Math.abs(cityCoordinates[from].latitude - cityCoordinates[to].latitude) * 1.5,
                    longitudeDelta: Math.abs(cityCoordinates[from].longitude - cityCoordinates[to].longitude) * 1.5,
                  }}
                >
                  {/* From Marker */}
                  <Marker
                    coordinate={cityCoordinates[from]}
                    title={from}
                    pinColor={Colors.forestGreen}
                  />
                  
                  {/* To Marker */}
                  <Marker
                    coordinate={cityCoordinates[to]}
                    title={to}
                    pinColor={Colors.coral}
                  />
                  
                  {/* Route Line */}
                  <Polyline
                    coordinates={getRouteCoordinates()}
                    strokeColor={Colors.deepSaffron}
                    strokeWidth={3}
                  />
                </MapView>
              </View>
            )}
            
            {/* Transport Options */}
            <Text style={styles.optionsTitle}>Transport Options</Text>
            
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
    routeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    resultsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      flex: 1,
    },
    navigateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.oceanBlue,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    navigateButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FFF',
      marginLeft: 6,
    },
    mapContainer: {
      height: 250,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 20,
      borderWidth: 2,
      borderColor: isDarkMode ? Colors.darkBorder : Colors.lightGray,
    },
    map: {
      flex: 1,
    },
    optionsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 12,
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
