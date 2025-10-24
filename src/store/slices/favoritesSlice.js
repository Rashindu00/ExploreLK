import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favorites: [],
  loading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addToFavorites: (state, action) => {
      const destinationId = action.payload;
      if (!state.favorites.includes(destinationId)) {
        state.favorites.push(destinationId);
      }
    },
    removeFromFavorites: (state, action) => {
      const destinationId = action.payload;
      state.favorites = state.favorites.filter(id => id !== destinationId);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setFavorites, addToFavorites, removeFromFavorites, setLoading } = favoritesSlice.actions;

// Async actions
export const loadFavorites = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites) {
      dispatch(setFavorites(JSON.parse(favorites)));
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const toggleFavorite = (destinationId) => async (dispatch, getState) => {
  try {
    const { favorites } = getState().favorites;
    const isFavorite = favorites.includes(destinationId);
    
    if (isFavorite) {
      dispatch(removeFromFavorites(destinationId));
    } else {
      dispatch(addToFavorites(destinationId));
    }
    
    // Update AsyncStorage
    const updatedFavorites = getState().favorites.favorites;
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};

export default favoritesSlice.reducer;