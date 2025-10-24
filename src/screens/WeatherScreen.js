import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

const WeatherScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock weather data - In production, use OpenWeatherMap API or similar
    setTimeout(() => {
      setWeather({
        temperature: 28,
        condition: 'Partly Cloudy',
        humidity: 75,
        windSpeed: 12,
        feelsLike: 30,
        visibility: 10,
        pressure: 1013,
        uvIndex: 7,
      });

      setForecast([
        { day: 'Mon', high: 29, low: 22, condition: 'sunny', icon: 'sun' },
        { day: 'Tue', high: 27, low: 21, condition: 'cloudy', icon: 'cloud' },
        { day: 'Wed', high: 26, low: 20, condition: 'rainy', icon: 'cloud-rain' },
        { day: 'Thu', high: 28, low: 22, condition: 'sunny', icon: 'sun' },
        { day: 'Fri', high: 30, low: 23, condition: 'sunny', icon: 'sun' },
        { day: 'Sat', high: 28, low: 22, condition: 'cloudy', icon: 'cloud' },
        { day: 'Sun', high: 27, low: 21, condition: 'partly cloudy', icon: 'cloud' },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const styles = getStyles(isDarkMode);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.deepSaffron} />
        <Text style={styles.loadingText}>Loading weather data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.title}>Weather</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Current Weather */}
        <View style={styles.currentWeather}>
          <Text style={styles.locationName}>{destination.name}</Text>
          <View style={styles.mainTemp}>
            <Feather name="cloud" size={80} color={Colors.oceanBlue} />
            <Text style={styles.temperature}>{weather.temperature}°C</Text>
          </View>
          <Text style={styles.condition}>{weather.condition}</Text>
          <Text style={styles.feelsLike}>Feels like {weather.feelsLike}°C</Text>
        </View>

        {/* Weather Details */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <Feather name="droplet" size={24} color={Colors.oceanBlue} />
            <Text style={styles.detailValue}>{weather.humidity}%</Text>
            <Text style={styles.detailLabel}>Humidity</Text>
          </View>
          <View style={styles.detailCard}>
            <Feather name="wind" size={24} color={Colors.oceanBlue} />
            <Text style={styles.detailValue}>{weather.windSpeed} km/h</Text>
            <Text style={styles.detailLabel}>Wind Speed</Text>
          </View>
          <View style={styles.detailCard}>
            <Feather name="eye" size={24} color={Colors.oceanBlue} />
            <Text style={styles.detailValue}>{weather.visibility} km</Text>
            <Text style={styles.detailLabel}>Visibility</Text>
          </View>
          <View style={styles.detailCard}>
            <Feather name="activity" size={24} color={Colors.oceanBlue} />
            <Text style={styles.detailValue}>{weather.pressure} hPa</Text>
            <Text style={styles.detailLabel}>Pressure</Text>
          </View>
        </View>

        {/* UV Index */}
        <View style={styles.uvCard}>
          <View style={styles.uvHeader}>
            <Feather name="sun" size={24} color={Colors.gold} />
            <Text style={styles.uvTitle}>UV Index</Text>
          </View>
          <Text style={styles.uvValue}>{weather.uvIndex}</Text>
          <Text style={styles.uvWarning}>
            {weather.uvIndex >= 8 ? 'Very High - Protect your skin' : 
             weather.uvIndex >= 6 ? 'High - Use sunscreen' : 
             'Moderate - Take precautions'}
          </Text>
        </View>

        {/* 7-Day Forecast */}
        <View style={styles.forecastSection}>
          <Text style={styles.forecastTitle}>7-Day Forecast</Text>
          {forecast.map((day, index) => (
            <View key={index} style={styles.forecastCard}>
              <Text style={styles.forecastDay}>{day.day}</Text>
              <Feather name={day.icon} size={24} color={Colors.deepSaffron} />
              <View style={styles.tempRange}>
                <Text style={styles.highTemp}>{day.high}°</Text>
                <Text style={styles.lowTemp}>{day.low}°</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Best Time to Visit */}
        <View style={styles.tipsCard}>
          <Feather name="info" size={20} color={Colors.forestGreen} />
          <View style={styles.tipsContent}>
            <Text style={styles.tipsTitle}>Best Time to Visit</Text>
            <Text style={styles.tipsText}>
              The best time to visit {destination.name} is during December to April 
              when the weather is dry and pleasant with temperatures around 25-30°C.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightGray,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.mediumGray,
    marginTop: 15,
  },
  currentWeather: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    padding: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  locationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 20,
  },
  mainTemp: {
    alignItems: 'center',
    marginVertical: 20,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginTop: 10,
  },
  condition: {
    fontSize: 20,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginBottom: 5,
  },
  feelsLike: {
    fontSize: 16,
    color: Colors.mediumGray,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 10,
  },
  detailCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '48%',
  },
  detailValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginTop: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginTop: 5,
  },
  uvCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 12,
  },
  uvHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  uvTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  uvValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.gold,
    marginBottom: 10,
  },
  uvWarning: {
    fontSize: 16,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
  },
  forecastSection: {
    padding: 20,
    paddingTop: 0,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 15,
  },
  forecastCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  forecastDay: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    width: 50,
  },
  tempRange: {
    flexDirection: 'row',
    gap: 15,
  },
  highTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  lowTemp: {
    fontSize: 16,
    color: Colors.mediumGray,
  },
  tipsCard: {
    backgroundColor: Colors.forestGreen + '15',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.forestGreen,
  },
  tipsContent: {
    flex: 1,
    marginLeft: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    lineHeight: 20,
  },
});

export default WeatherScreen;
