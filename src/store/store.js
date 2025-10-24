import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import destinationsReducer from './slices/destinationsSlice';
import favoritesReducer from './slices/favoritesSlice';
import themeReducer from './slices/themeSlice';
import tripsReducer from './slices/tripsSlice';
import reviewsReducer from './slices/reviewsSlice';
import achievementsReducer from './slices/achievementsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    destinations: destinationsReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
    trips: tripsReducer,
    reviews: reviewsReducer,
    achievements: achievementsReducer,
  },
});