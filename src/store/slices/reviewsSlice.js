import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  reviews: {},
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    addReview: (state, action) => {
      const { destinationId, review } = action.payload;
      if (!state.reviews[destinationId]) {
        state.reviews[destinationId] = [];
      }
      state.reviews[destinationId].push(review);
    },
    updateReview: (state, action) => {
      const { destinationId, reviewId, updatedReview } = action.payload;
      if (state.reviews[destinationId]) {
        const index = state.reviews[destinationId].findIndex(r => r.id === reviewId);
        if (index !== -1) {
          state.reviews[destinationId][index] = updatedReview;
        }
      }
    },
    deleteReview: (state, action) => {
      const { destinationId, reviewId } = action.payload;
      if (state.reviews[destinationId]) {
        state.reviews[destinationId] = state.reviews[destinationId].filter(r => r.id !== reviewId);
      }
    },
  },
});

export const { setReviews, addReview, updateReview, deleteReview } = reviewsSlice.actions;

// Async actions
export const loadReviews = () => async (dispatch) => {
  try {
    const reviewsData = await AsyncStorage.getItem('reviews');
    if (reviewsData) {
      dispatch(setReviews(JSON.parse(reviewsData)));
    }
  } catch (error) {
    console.error('Load reviews error:', error);
  }
};

export const saveReview = (destinationId, reviewData) => async (dispatch, getState) => {
  try {
    const newReview = {
      id: Date.now().toString(),
      ...reviewData,
      userId: getState().auth.user?.id,
      userName: `${getState().auth.user?.firstName} ${getState().auth.user?.lastName}`,
      createdAt: new Date().toISOString(),
    };
    
    dispatch(addReview({ destinationId, review: newReview }));
    
    const { reviews } = getState().reviews;
    await AsyncStorage.setItem('reviews', JSON.stringify(reviews));
  } catch (error) {
    console.error('Save review error:', error);
  }
};

export const removeReview = (destinationId, reviewId) => async (dispatch, getState) => {
  try {
    dispatch(deleteReview({ destinationId, reviewId }));
    
    const { reviews } = getState().reviews;
    await AsyncStorage.setItem('reviews', JSON.stringify(reviews));
  } catch (error) {
    console.error('Delete review error:', error);
  }
};

export default reviewsSlice.reducer;
