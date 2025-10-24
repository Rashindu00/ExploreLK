import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destinations: [],
  categories: [
    'All',
    'Historical Sites',
    'Beaches',
    'Hill Country',
    'Wildlife',
    'Adventure Sports',
    'Cultural Sites',
    'Food & Restaurants',
  ],
  selectedCategory: 'All',
  loading: false,
  error: null,
};

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    fetchDestinationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDestinationsSuccess: (state, action) => {
      state.loading = false;
      state.destinations = action.payload;
      state.error = null;
    },
    fetchDestinationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    updateDestinationRating: (state, action) => {
      const { destinationId, rating } = action.payload;
      const destination = state.destinations.find(d => d.id === destinationId);
      if (destination) {
        destination.rating = rating;
      }
    },
  },
});

export const {
  fetchDestinationsStart,
  fetchDestinationsSuccess,
  fetchDestinationsFailure,
  setSelectedCategory,
  updateDestinationRating,
} = destinationsSlice.actions;

// Mock data for Sri Lankan destinations
const mockDestinations = [
  {
    id: 1,
    title: 'Sigiriya Rock Fortress',
    description: 'Ancient rock fortress and palace ruins surrounded by extensive gardens',
    category: 'Historical Sites',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    location: { latitude: 7.9568, longitude: 80.7592 },
    entryFee: 'USD 30 (Foreigners), LKR 60 (Locals)',
    timings: '7:00 AM - 5:30 PM',
    bestTimeToVisit: 'December to April',
    howToReach: 'Train to Habarana, then bus/taxi to Sigiriya',
    nearbyPlaces: ['Dambulla Cave Temple', 'Polonnaruwa', 'Minneriya National Park'],
  },
  {
    id: 2,
    title: 'Ella Rock',
    description: 'Scenic hill station famous for tea plantations and Nine Arch Bridge',
    category: 'Hill Country',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
    location: { latitude: 6.8721, longitude: 81.0462 },
    entryFee: 'Free',
    timings: 'Best early morning (6:00 AM - 10:00 AM)',
    bestTimeToVisit: 'December to March',
    howToReach: 'Train from Kandy to Ella (scenic route)',
    nearbyPlaces: ['Nine Arch Bridge', 'Little Adams Peak', 'Ravana Falls'],
  },
  {
    id: 3,
    title: 'Galle Fort',
    description: 'Historic fortified city built by Portuguese and Dutch colonists',
    category: 'Historical Sites',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
    location: { latitude: 6.0329, longitude: 80.2168 },
    entryFee: 'Free to walk around',
    timings: 'Open 24/7',
    bestTimeToVisit: 'December to March',
    howToReach: 'Train or bus from Colombo to Galle',
    nearbyPlaces: ['Unawatuna Beach', 'Jungle Beach', 'Mirissa'],
  },
  {
    id: 4,
    title: 'Unawatuna Beach',
    description: 'Crescent-shaped golden sand beach with coral reefs',
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.4,
    location: { latitude: 6.0118, longitude: 80.2486 },
    entryFee: 'Free',
    timings: 'Open 24/7',
    bestTimeToVisit: 'November to April',
    howToReach: '10 minutes from Galle by tuk-tuk',
    nearbyPlaces: ['Galle Fort', 'Jungle Beach', 'Snake Island'],
  },
  {
    id: 5,
    title: 'Yala National Park',
    description: 'Wildlife sanctuary famous for leopards and elephants',
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    location: { latitude: 6.3725, longitude: 81.5068 },
    entryFee: 'USD 15 + Service charges',
    timings: '6:00 AM - 6:00 PM',
    bestTimeToVisit: 'February to July',
    howToReach: 'Drive from Colombo (5-6 hours) or fly to Mattala',
    nearbyPlaces: ['Kataragama Temple', 'Bundala National Park', 'Tissamaharama'],
  },
  {
    id: 6,
    title: 'Temple of the Tooth',
    description: 'Sacred Buddhist temple housing the tooth relic of Buddha',
    category: 'Cultural Sites',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    location: { latitude: 7.2936, longitude: 80.6410 },
    entryFee: 'LKR 1000 (Foreigners)',
    timings: '5:30 AM - 8:00 PM',
    bestTimeToVisit: 'Year round',
    howToReach: 'Train or bus to Kandy from Colombo',
    nearbyPlaces: ['Royal Botanical Gardens', 'Kandy Lake', 'Bahirawakanda Temple'],
  },
];

// Async actions
export const fetchDestinations = () => async (dispatch) => {
  try {
    dispatch(fetchDestinationsStart());
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Use mock data (replace with actual API call)
    dispatch(fetchDestinationsSuccess(mockDestinations));
  } catch (error) {
    dispatch(fetchDestinationsFailure('Failed to fetch destinations'));
  }
};

export default destinationsSlice.reducer;