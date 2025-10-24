import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import DestinationDetailScreen from '../screens/DestinationDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import LanguageScreen from '../screens/LanguageScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import CreateTripScreen from '../screens/CreateTripScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import WeatherScreen from '../screens/WeatherScreen';
import TravelGuidesScreen from '../screens/TravelGuidesScreen';
import Colors from '../constants/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} />
    <Stack.Screen name="Weather" component={WeatherScreen} />
    <Stack.Screen name="Reviews" component={ReviewsScreen} />
    <Stack.Screen name="TravelGuides" component={TravelGuidesScreen} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FavoritesMain" component={FavoritesScreen} />
    <Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} />
    <Stack.Screen name="Weather" component={WeatherScreen} />
    <Stack.Screen name="Reviews" component={ReviewsScreen} />
    <Stack.Screen name="TravelGuides" component={TravelGuidesScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="Language" component={LanguageScreen} />
    <Stack.Screen name="MyTrips" component={MyTripsScreen} />
    <Stack.Screen name="CreateTrip" component={CreateTripScreen} />
    <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
    <Stack.Screen name="Achievements" component={AchievementsScreen} />
  </Stack.Navigator>
);

const MainTabs = () => {
  const { isDarkMode } = useSelector((state) => ({
    isDarkMode: state.theme.isDarkMode,
  }));

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.deepSaffron,
        tabBarInactiveTintColor: Colors.mediumGray,
        tabBarStyle: {
          backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
          borderTopColor: isDarkMode ? Colors.mediumGray : Colors.lightGray,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorites" component={FavoritesStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;