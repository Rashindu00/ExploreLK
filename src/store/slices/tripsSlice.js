import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  trips: [],
  currentTrip: null,
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.trips = action.payload;
    },
    addTrip: (state, action) => {
      state.trips.push(action.payload);
    },
    updateTrip: (state, action) => {
      const index = state.trips.findIndex(trip => trip.id === action.payload.id);
      if (index !== -1) {
        state.trips[index] = action.payload;
      }
    },
    deleteTrip: (state, action) => {
      state.trips = state.trips.filter(trip => trip.id !== action.payload);
    },
    setCurrentTrip: (state, action) => {
      state.currentTrip = action.payload;
    },
    addDestinationToTrip: (state, action) => {
      const { tripId, destination } = action.payload;
      const trip = state.trips.find(t => t.id === tripId);
      if (trip) {
        trip.destinations.push(destination);
      }
    },
    removeDestinationFromTrip: (state, action) => {
      const { tripId, destinationId } = action.payload;
      const trip = state.trips.find(t => t.id === tripId);
      if (trip) {
        trip.destinations = trip.destinations.filter(d => d.id !== destinationId);
      }
    },
  },
});

export const {
  setTrips,
  addTrip,
  updateTrip,
  deleteTrip,
  setCurrentTrip,
  addDestinationToTrip,
  removeDestinationFromTrip,
} = tripsSlice.actions;

// Async actions
export const loadTrips = () => async (dispatch) => {
  try {
    const tripsData = await AsyncStorage.getItem('trips');
    if (tripsData) {
      dispatch(setTrips(JSON.parse(tripsData)));
    }
  } catch (error) {
    console.error('Load trips error:', error);
  }
};

export const saveTrip = (trip) => async (dispatch, getState) => {
  try {
    const newTrip = {
      id: Date.now().toString(),
      ...trip,
      createdAt: new Date().toISOString(),
      destinations: trip.destinations || [],
    };
    
    dispatch(addTrip(newTrip));
    
    const { trips } = getState().trips;
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
  } catch (error) {
    console.error('Save trip error:', error);
  }
};

export const updateTripData = (trip) => async (dispatch, getState) => {
  try {
    dispatch(updateTrip(trip));
    
    const { trips } = getState().trips;
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
  } catch (error) {
    console.error('Update trip error:', error);
  }
};

export const removeTripData = (tripId) => async (dispatch, getState) => {
  try {
    dispatch(deleteTrip(tripId));
    
    const { trips } = getState().trips;
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
  } catch (error) {
    console.error('Delete trip error:', error);
  }
};

export const addDestinationToTripAsync = (tripId, destination) => async (dispatch, getState) => {
  try {
    dispatch(addDestinationToTrip({ tripId, destination }));
    
    const { trips } = getState().trips;
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
  } catch (error) {
    console.error('Add destination error:', error);
  }
};

export const removeDestinationFromTripAsync = (tripId, destinationId) => async (dispatch, getState) => {
  try {
    dispatch(removeDestinationFromTrip({ tripId, destinationId }));
    
    const { trips } = getState().trips;
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
  } catch (error) {
    console.error('Remove destination error:', error);
  }
};

export default tripsSlice.reducer;
