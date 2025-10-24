import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  trainRoutes: [
    {
      id: '1',
      name: 'Colombo to Kandy',
      type: 'train',
      from: 'Colombo Fort',
      to: 'Kandy',
      duration: '2.5-3 hours',
      distance: '120 km',
      frequency: 'Every 30 mins',
      price: {
        firstClass: 300,
        secondClass: 180,
        thirdClass: 100,
      },
      scenic: true,
      popular: true,
      description: 'One of the most popular routes with beautiful hill country views',
      schedule: [
        { departure: '05:55', arrival: '08:47', class: 'All classes' },
        { departure: '07:00', arrival: '09:50', class: 'All classes' },
        { departure: '08:30', arrival: '11:20', class: 'All classes' },
        { departure: '15:35', arrival: '18:30', class: 'Intercity' },
      ],
    },
    {
      id: '2',
      name: 'Kandy to Ella',
      type: 'train',
      from: 'Kandy',
      to: 'Ella',
      duration: '6-7 hours',
      distance: '180 km',
      frequency: '4 trains daily',
      price: {
        firstClass: 400,
        secondClass: 250,
        thirdClass: 150,
      },
      scenic: true,
      popular: true,
      description: 'Most scenic train ride in Sri Lanka through tea plantations',
      schedule: [
        { departure: '08:47', arrival: '14:55', class: 'All classes' },
        { departure: '11:10', arrival: '17:35', class: 'All classes' },
      ],
    },
    {
      id: '3',
      name: 'Colombo to Galle',
      type: 'train',
      from: 'Colombo Fort',
      to: 'Galle',
      duration: '2-2.5 hours',
      distance: '115 km',
      frequency: 'Every hour',
      price: {
        firstClass: 250,
        secondClass: 150,
        thirdClass: 80,
      },
      scenic: true,
      popular: true,
      description: 'Coastal railway with ocean views',
      schedule: [
        { departure: '06:00', arrival: '08:15', class: 'All classes' },
        { departure: '09:30', arrival: '11:45', class: 'All classes' },
        { departure: '15:00', arrival: '17:20', class: 'Intercity' },
      ],
    },
    {
      id: '4',
      name: 'Colombo to Anuradhapura',
      type: 'train',
      from: 'Colombo Fort',
      to: 'Anuradhapura',
      duration: '4-5 hours',
      distance: '205 km',
      frequency: '6 trains daily',
      price: {
        firstClass: 350,
        secondClass: 200,
        thirdClass: 120,
      },
      scenic: false,
      popular: true,
      description: 'Ancient city route, comfortable journey',
      schedule: [
        { departure: '05:45', arrival: '10:05', class: 'All classes' },
        { departure: '15:30', arrival: '19:45', class: 'Intercity' },
      ],
    },
  ],
  busRoutes: [
    {
      id: '5',
      name: 'Colombo to Kandy',
      type: 'bus',
      from: 'Colombo',
      to: 'Kandy',
      duration: '3-4 hours',
      distance: '115 km',
      frequency: 'Every 15 mins',
      price: {
        luxury: 450,
        semiLuxury: 280,
        normal: 180,
      },
      acAvailable: true,
      popular: true,
      description: 'Frequent services via Kadawatha route',
    },
    {
      id: '6',
      name: 'Colombo to Galle',
      type: 'bus',
      from: 'Colombo',
      to: 'Galle',
      duration: '2.5-3 hours',
      distance: '119 km',
      frequency: 'Every 10 mins',
      price: {
        luxury: 400,
        semiLuxury: 250,
        normal: 150,
      },
      acAvailable: true,
      popular: true,
      description: 'Southern expressway route available',
    },
    {
      id: '7',
      name: 'Kandy to Ella',
      type: 'bus',
      from: 'Kandy',
      to: 'Ella',
      duration: '4-5 hours',
      distance: '105 km',
      frequency: 'Every hour',
      price: {
        luxury: 500,
        semiLuxury: 350,
        normal: 200,
      },
      acAvailable: true,
      popular: true,
      description: 'Scenic hill country route',
    },
    {
      id: '8',
      name: 'Colombo to Anuradhapura',
      type: 'bus',
      from: 'Colombo',
      to: 'Anuradhapura',
      duration: '4-5 hours',
      distance: '206 km',
      frequency: 'Every 30 mins',
      price: {
        luxury: 550,
        semiLuxury: 380,
        normal: 220,
      },
      acAvailable: true,
      popular: false,
      description: 'Ancient city express services',
    },
  ],
  taxis: [
    {
      id: '9',
      name: 'Uber Sri Lanka',
      type: 'taxi',
      serviceType: 'Ride-hailing',
      pricePerKm: 95,
      basePrice: 150,
      available24x7: true,
      appRequired: true,
      description: 'International ride-hailing service',
      rating: 4.5,
    },
    {
      id: '10',
      name: 'PickMe',
      type: 'taxi',
      serviceType: 'Ride-hailing',
      pricePerKm: 85,
      basePrice: 120,
      available24x7: true,
      appRequired: true,
      description: 'Local ride-hailing app, most popular',
      rating: 4.6,
    },
    {
      id: '11',
      name: 'Kangaroo Cabs',
      type: 'taxi',
      serviceType: 'Radio Taxi',
      pricePerKm: 100,
      basePrice: 200,
      available24x7: true,
      appRequired: false,
      phone: '+94 11 2 588 588',
      description: 'Reliable radio taxi service',
      rating: 4.3,
    },
  ],
  tuktuks: [
    {
      id: '12',
      name: 'Local Tuk-tuk',
      type: 'tuktuk',
      pricePerKm: 60,
      basePrice: 100,
      negotiable: true,
      description: 'Traditional three-wheeler, prices negotiable',
      rating: 4.0,
      tips: 'Always negotiate fare before journey',
    },
    {
      id: '13',
      name: 'PickMe Tuk',
      type: 'tuktuk',
      pricePerKm: 55,
      basePrice: 80,
      negotiable: false,
      appRequired: true,
      description: 'App-based tuk-tuk service with fixed pricing',
      rating: 4.4,
    },
  ],
  carRentals: [
    {
      id: '14',
      name: 'Casons Rent-A-Car',
      type: 'carRental',
      vehicleTypes: ['Economy', 'Sedan', 'SUV', 'Van'],
      pricePerDay: {
        economy: 4500,
        sedan: 6500,
        suv: 8500,
        van: 10000,
      },
      withDriver: true,
      selfDrive: true,
      description: 'Premium car rental service',
      rating: 4.7,
      contact: '+94 11 2 422 422',
    },
    {
      id: '15',
      name: 'Malkey Rent-A-Car',
      type: 'carRental',
      vehicleTypes: ['Economy', 'Sedan', 'SUV'],
      pricePerDay: {
        economy: 4000,
        sedan: 6000,
        suv: 8000,
      },
      withDriver: true,
      selfDrive: true,
      description: 'Affordable and reliable',
      rating: 4.5,
      contact: '+94 11 2 505 050',
    },
  ],
  savedBookings: [],
  recentSearches: [],
};

const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.savedBookings.push(action.payload);
    },
    removeBooking: (state, action) => {
      state.savedBookings = state.savedBookings.filter(b => b.id !== action.payload);
    },
    addRecentSearch: (state, action) => {
      state.recentSearches.unshift(action.payload);
      if (state.recentSearches.length > 10) {
        state.recentSearches.pop();
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
  },
});

export const {
  addBooking,
  removeBooking,
  addRecentSearch,
  clearRecentSearches,
} = transportSlice.actions;

// Async actions
export const loadBookings = () => async (dispatch) => {
  try {
    const bookingsData = await AsyncStorage.getItem('transportBookings');
    if (bookingsData) {
      const bookings = JSON.parse(bookingsData);
      bookings.forEach(booking => dispatch(addBooking(booking)));
    }
  } catch (error) {
    console.error('Load bookings error:', error);
  }
};

export const saveBooking = (booking) => async (dispatch, getState) => {
  try {
    const newBooking = {
      id: Date.now().toString(),
      ...booking,
      createdAt: new Date().toISOString(),
    };
    
    dispatch(addBooking(newBooking));
    
    const { savedBookings } = getState().transport;
    await AsyncStorage.setItem('transportBookings', JSON.stringify(savedBookings));
  } catch (error) {
    console.error('Save booking error:', error);
  }
};

export default transportSlice.reducer;
