import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  points: 0,
  badges: [],
  visitedDestinations: [],
  level: 1,
  achievements: [
    { id: '1', name: 'First Steps', description: 'Visit your first destination', icon: 'award', points: 10, unlocked: false },
    { id: '2', name: 'Explorer', description: 'Visit 5 destinations', icon: 'compass', points: 50, unlocked: false },
    { id: '3', name: 'Travel Master', description: 'Visit 10 destinations', icon: 'star', points: 100, unlocked: false },
    { id: '4', name: 'Review Writer', description: 'Write 5 reviews', icon: 'edit', points: 25, unlocked: false },
    { id: '5', name: 'Planner Pro', description: 'Create 3 trip plans', icon: 'map', points: 30, unlocked: false },
    { id: '6', name: 'Social Butterfly', description: 'Share 10 destinations', icon: 'share-2', points: 20, unlocked: false },
    { id: '7', name: 'Photo Enthusiast', description: 'Upload 20 photos', icon: 'camera', points: 40, unlocked: false },
    { id: '8', name: 'Local Guide', description: 'Get 50 helpful votes on reviews', icon: 'thumbs-up', points: 75, unlocked: false },
  ],
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    setAchievements: (state, action) => {
      return { ...state, ...action.payload };
    },
    addPoints: (state, action) => {
      state.points += action.payload;
      state.level = Math.floor(state.points / 100) + 1;
    },
    unlockBadge: (state, action) => {
      const achievement = state.achievements.find(a => a.id === action.payload);
      if (achievement) {
        achievement.unlocked = true;
        state.badges.push(achievement);
      }
    },
    markDestinationVisited: (state, action) => {
      if (!state.visitedDestinations.includes(action.payload)) {
        state.visitedDestinations.push(action.payload);
      }
    },
  },
});

export const { setAchievements, addPoints, unlockBadge, markDestinationVisited } = achievementsSlice.actions;

// Async actions
export const loadAchievements = () => async (dispatch) => {
  try {
    const achievementsData = await AsyncStorage.getItem('achievements');
    if (achievementsData) {
      dispatch(setAchievements(JSON.parse(achievementsData)));
    }
  } catch (error) {
    console.error('Load achievements error:', error);
  }
};

export const saveAchievementsData = () => async (dispatch, getState) => {
  try {
    const { achievements } = getState();
    await AsyncStorage.setItem('achievements', JSON.stringify(achievements));
  } catch (error) {
    console.error('Save achievements error:', error);
  }
};

export const checkAndUnlockAchievements = () => async (dispatch, getState) => {
  const state = getState();
  const { visitedDestinations, achievements } = state.achievements;
  const { reviews } = state.reviews;
  const { trips } = state.trips;
  
  // Check First Steps
  if (visitedDestinations.length >= 1 && !achievements[0].unlocked) {
    dispatch(unlockBadge('1'));
    dispatch(addPoints(10));
  }
  
  // Check Explorer
  if (visitedDestinations.length >= 5 && !achievements[1].unlocked) {
    dispatch(unlockBadge('2'));
    dispatch(addPoints(50));
  }
  
  // Check Travel Master
  if (visitedDestinations.length >= 10 && !achievements[2].unlocked) {
    dispatch(unlockBadge('3'));
    dispatch(addPoints(100));
  }
  
  // Check Review Writer
  const totalReviews = Object.values(reviews).flat().length;
  if (totalReviews >= 5 && !achievements[3].unlocked) {
    dispatch(unlockBadge('4'));
    dispatch(addPoints(25));
  }
  
  // Check Planner Pro
  if (trips.trips.length >= 3 && !achievements[4].unlocked) {
    dispatch(unlockBadge('5'));
    dispatch(addPoints(30));
  }
  
  await dispatch(saveAchievementsData());
};

export default achievementsSlice.reducer;
