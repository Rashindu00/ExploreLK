import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError, updateProfileSuccess } = authSlice.actions;

// Async actions
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    // Simulate API call - Replace with actual API
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store user data in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(data));
      dispatch(loginSuccess(data));
    } else {
      dispatch(loginFailure(data.message || 'Login failed'));
    }
  } catch (error) {
    dispatch(loginFailure('Network error. Please try again.'));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    // Simulate registration - Replace with actual API
    const mockUser = {
      id: Date.now(),
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      token: 'mock-token-' + Date.now(),
    };
    
    // Store user data in AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    dispatch(loginSuccess(mockUser));
  } catch (error) {
    dispatch(loginFailure('Registration failed. Please try again.'));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('user');
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const loadUserFromStorage = () => async (dispatch) => {
  try {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      dispatch(loginSuccess(user));
    }
  } catch (error) {
    console.error('Load user error:', error);
  }
};

export const updateUserProfile = (profileData) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const updatedUser = { ...auth.user, ...profileData };
    
    // Store updated user data in AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    dispatch(updateProfileSuccess(profileData));
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

export default authSlice.reducer;