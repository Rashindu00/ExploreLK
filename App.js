import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/store/store';
import { loadUserFromStorage } from './src/store/slices/authSlice';
import { loadTheme } from './src/store/slices/themeSlice';
import { loadFavorites } from './src/store/slices/favoritesSlice';
import { loadTrips } from './src/store/slices/tripsSlice';
import { loadReviews } from './src/store/slices/reviewsSlice';
import { loadAchievements } from './src/store/slices/achievementsSlice';
import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/constants/colors';

const AppContent = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    // Load all persisted data on app start
    dispatch(loadUserFromStorage());
    dispatch(loadTheme());
    dispatch(loadFavorites());
    dispatch(loadTrips());
    dispatch(loadReviews());
    dispatch(loadAchievements());
  }, [dispatch]);

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} backgroundColor={isDarkMode ? Colors.darkBackground : Colors.white} />
      <AppNavigator />
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
