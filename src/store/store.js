import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import destinationsReducer from './slices/destinationsSlice';
import favoritesReducer from './slices/favoritesSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    destinations: destinationsReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
});