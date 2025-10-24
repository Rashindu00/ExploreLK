import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// Async actions
export const loadTheme = () => async (dispatch) => {
  try {
    const theme = await AsyncStorage.getItem('isDarkMode');
    if (theme !== null) {
      dispatch(setTheme(JSON.parse(theme)));
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
};

export const saveTheme = (isDarkMode) => async (dispatch) => {
  try {
    await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    dispatch(setTheme(isDarkMode));
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export default themeSlice.reducer;