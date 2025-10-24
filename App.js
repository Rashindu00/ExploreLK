import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/store/store';
import { loadUserFromStorage } from './src/store/slices/authSlice';
import { loadTheme } from './src/store/slices/themeSlice';
import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/constants/colors';

const AppContent = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => ({
    isDarkMode: state.theme.isDarkMode,
  }));

  useEffect(() => {
    // Load user data and theme on app start
    dispatch(loadUserFromStorage());
    dispatch(loadTheme());
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
