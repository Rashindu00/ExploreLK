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
  districts: [
    'All Districts',
    'Colombo',
    'Gampaha',
    'Kalutara',
    'Kandy',
    'Matale',
    'Nuwara Eliya',
    'Galle',
    'Matara',
    'Hambantota',
    'Jaffna',
    'Kilinochchi',
    'Mannar',
    'Mullaitivu',
    'Vavuniya',
    'Puttalam',
    'Kurunegala',
    'Anuradhapura',
    'Polonnaruwa',
    'Badulla',
    'Monaragala',
    'Ratnapura',
    'Kegalle',
    'Trincomalee',
    'Batticaloa',
    'Ampara',
  ],
  selectedCategory: 'All',
  selectedDistrict: 'All Districts',
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
    setSelectedDistrict: (state, action) => {
      state.selectedDistrict = action.payload;
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
  setSelectedDistrict,
  updateDestinationRating,
} = destinationsSlice.actions;

const mockDestinations = [
  {
    id: 1,
    title: 'Sigiriya Rock Fortress',
    name: 'Sigiriya',
    description: 'Ancient rock fortress and palace ruins surrounded by extensive gardens. A UNESCO World Heritage Site and one of the best preserved examples of ancient urban planning.',
    category: 'Historical Sites',
    district: 'Matale',
    image: 'https://sigiriyafortress.com/wp-content/uploads/2020/11/Sigiriya-011.jpg',
    images: [
      'https://sigiriyafortress.com/wp-content/uploads/2020/11/Sigiriya-011.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBtiStZ9TfFJjYGhfTch4weHp7ettHMoFh4A&s',
      'https://www.atlasandboots.com/wp-content/uploads/2017/03/Sigiriya-Rock-Fortress-1.jpg',
      'https://www.freetour.com/images/tours/77485/marvel-at-sigiriya-dambulla-with-an-evening-safari-to-spot-elephants-04.jpg',
    ],
    rating: 4.8,
    location: { latitude: 7.9568, longitude: 80.7592 },
    entryFee: 'USD 30 (Foreigners), LKR 60 (Locals)',
    timings: '7:00 AM - 5:30 PM',
    bestTimeToVisit: 'December to April',
    howToReach: 'Train to Habarana, then bus/taxi to Sigiriya',
    nearbyPlaces: ['Polonnaruwa', 'Anuradhapura', 'Kandy'],
  },
  {
    id: 2,
    title: 'Ella Rock',
    name: 'Ella',
    description: 'Scenic hill station famous for tea plantations and Nine Arch Bridge. Perfect for hiking, photography, and experiencing cool climate.',
    category: 'Hill Country',
    district: 'Badulla',
    image: 'https://cdn.tripspoint.com/uploads/photos/8786/ella-rock-sunrise-hike-with-a-guide_rOcAd.jpeg',
    images: [
      'https://www.srilankainstyle.com/storage/app/media/Experiences/Ella%20Rock%20Climb/Ella-Rock-Climb-slider-4.jpg',
      'https://www.thesmoothescape.com/wp-content/uploads/2025/06/Ella-Rock-view.jpg',
      'https://roaminglanka.com/wp-content/uploads/2025/08/datingscout-ySl4ry2hjP0-unsplash-1.jpg',
    ],
    rating: 4.6,
    location: { latitude: 6.8721, longitude: 81.0462 },
    entryFee: 'Free',
    timings: 'Best early morning (6:00 AM - 10:00 AM)',
    bestTimeToVisit: 'December to March',
    howToReach: 'Train from Kandy to Ella (scenic route)',
    nearbyPlaces: ['Horton Plains', 'Yala', 'Arugam Bay'],
  },
  {
    id: 3,
    title: 'Galle Fort',
    name: 'Galle Fort',
    description: 'Historic fortified city built by Portuguese and Dutch colonists. A living UNESCO World Heritage Site with cobblestone streets and colonial architecture.',
    category: 'Historical Sites',
    district: 'Galle',
    image: 'https://do6raq9h04ex.cloudfront.net/sites/8/2021/07/galle-fort-1050x700-1.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Galle_Fort.jpg/1200px-Galle_Fort.jpg',
      'https://www.urlaub-sr-lanka.info/wp-content/uploads/2013/04/galle.jpg',
      'https://media.istockphoto.com/id/1493672027/photo/captivating-aerial-view-of-galle-fort-a-historic-gem-amidst-coastal-beauty.jpg?s=612x612&w=0&k=20&c=UCrM-bIIGdEAVR_DZJzE42l880Os4iIbjsGqYs6_DGg=',
    ],
    rating: 4.5,
    location: { latitude: 6.0329, longitude: 80.2168 },
    entryFee: 'Free to walk around',
    timings: 'Open 24/7',
    bestTimeToVisit: 'December to March',
    howToReach: 'Train or bus from Colombo to Galle',
    nearbyPlaces: ['Unawatuna', 'Mirissa', 'Yala'],
  },
  {
    id: 4,
    title: 'Unawatuna Beach',
    name: 'Unawatuna',
    description: 'Crescent-shaped golden sand beach with coral reefs. Perfect for swimming, snorkeling, and water sports.',
    category: 'Beaches',
    district: 'Galle',
    image: 'https://explore.vacations/wp-content/uploads/2024/12/Unawatuna-Beach-Sri-Lanka-.jpg',
    images: [
      'https://www.lankatourexperts.com/wp-content/uploads/2023/05/Unawatuna-Beach-Sri-Lanka.webp',
      'https://i0.wp.com/amazinglanka.com/wp/wp-content/uploads/2024/05/unavatuna-02.jpg?ssl=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/ba/21/21/caption.jpg?w=500&h=500&s=1',
    ],
    rating: 4.4,
    location: { latitude: 6.0118, longitude: 80.2486 },
    entryFee: 'Free',
    timings: 'Open 24/7',
    bestTimeToVisit: 'November to April',
    howToReach: '10 minutes from Galle by tuk-tuk',
    nearbyPlaces: ['Galle Fort', 'Mirissa', 'Yala'],
  },
  {
    id: 5,
    title: 'Yala National Park',
    name: 'Yala',
    description: 'Wildlife sanctuary famous for leopards and elephants. One of the best places in the world to observe leopards in their natural habitat.',
    category: 'Wildlife',
    district: 'Hambantota',
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/b7/13/ec.jpg',
    images: [
      'https://images.squarespace-cdn.com/content/v1/5a3bb03b4c326d76de73ddaa/a2345362-8172-4329-9fc7-010cf2a19b25/The+Common+Wanderer-8796-2.jpg',
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/f2/0f/25.jpg',
      'https://www.viacation.com/_next/image?url=https%3A%2F%2Fwp.viacation.com%2Fwp-content%2Fuploads%2F2025%2F01%2F195041.webp&w=1920&q=75',
    ],
    rating: 4.7,
    location: { latitude: 6.3725, longitude: 81.5068 },
    entryFee: 'USD 15 + Service charges',
    timings: '6:00 AM - 6:00 PM',
    bestTimeToVisit: 'February to July',
    howToReach: 'Drive from Colombo (5-6 hours) or fly to Mattala',
    nearbyPlaces: ['Ella', 'Mirissa', 'Arugam Bay'],
  },
  {
    id: 6,
    title: 'Temple of the Tooth',
    name: 'Dalada Maligawa',
    description: 'Sacred Buddhist temple housing the tooth relic of Buddha. A significant pilgrimage site and architectural marvel in Kandy.',
    category: 'Cultural Sites',
    district: 'Kandy',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT32SCzWjoRExhCTaAgsFlflHmGxRfLXemzw&s',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Q9l6jYWUh-FI140IylaZjuCWqvdJ5FEMPg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE57wkmBL8WgtOdBIIfUd7iU2qMgKCM6qjGA&s',
    ],
    rating: 4.9,
    location: { latitude: 7.2936, longitude: 80.6410 },
    entryFee: 'LKR 1000 (Foreigners)',
    timings: '5:30 AM - 8:00 PM',
    bestTimeToVisit: 'Year round',
    howToReach: 'Train or bus to Kandy from Colombo',
    nearbyPlaces: ['Sigiriya', 'Ella', 'Polonnaruwa'],
  },
  {
    id: 7,
    title: 'Anuradhapura Ancient City',
    name: 'Anuradhapura',
    description: 'Ancient capital of Sri Lanka with magnificent dagobas and monasteries. UNESCO World Heritage Site with 2,000+ years of history.',
    category: 'Historical Sites',
    district: 'Anuradhapura',
    image: 'https://www.storyofsrilanka.com/images/slider/sri-lanka-guide-destinations/anuradhapura/01.jpg',
    rating: 4.7,
    location: { latitude: 8.3114, longitude: 80.4037 },
    entryFee: 'USD 25 (Foreigners)',
    timings: '6:00 AM - 6:00 PM',
    bestTimeToVisit: 'January to September',
    howToReach: 'Train or bus from Colombo (4-5 hours)',
    nearbyPlaces: ['Sigiriya', 'Polonnaruwa', 'Kandy'],
  },
  {
    id: 8,
    title: 'Mirissa Beach',
    name: 'Mirissa',
    description: 'Beautiful beach town famous for whale watching and surfing. Golden sandy beaches with palm trees and amazing seafood.',
    category: 'Beaches',
    district: 'Matara',
    image: 'https://digitaltravelcouple.com/wp-content/uploads/2020/01/mirissa-beach-sri-lanka-1.jpg',
    rating: 4.6,
    location: { latitude: 5.9463, longitude: 80.4690 },
    entryFee: 'Free',
    timings: 'Open 24/7',
    bestTimeToVisit: 'November to April (Whale watching: December to April)',
    howToReach: 'Bus or train to Matara, then tuk-tuk to Mirissa',
    nearbyPlaces: ['Galle Fort', 'Unawatuna', 'Yala'],
  },
  {
    id: 9,
    title: 'Horton Plains National Park',
    name: 'Horton Plains',
    description: 'High-altitude plateau with unique biodiversity. Home to World\'s End cliff with a sheer drop of 880m and stunning views.',
    category: 'Hill Country',
    district: 'Nuwara Eliya',
    image: 'https://www.ceylontravelslk.com/wp-content/uploads/2024/08/Horton-Plains-1.jpg',
    rating: 4.5,
    location: { latitude: 6.8067, longitude: 80.8020 },
    entryFee: 'LKR 3000 (Foreigners)',
    timings: '6:00 AM - 6:00 PM',
    bestTimeToVisit: 'January to March',
    howToReach: 'Drive from Nuwara Eliya (1.5 hours)',
    nearbyPlaces: ['Ella', 'Kandy', 'Sigiriya'],
  },
  {
    id: 10,
    title: 'Polonnaruwa Ancient City',
    name: 'Polonnaruwa',
    description: 'Medieval capital with well-preserved ruins and Buddha statues. UNESCO World Heritage Site showcasing Sinhalese civilization.',
    category: 'Historical Sites',
    district: 'Polonnaruwa',
    image: 'https://www.world-tourism.org/wp-content/uploads/2025/10/polonnaruwa-ancient-city-private-day-tour-hidden-gems.jpg',
    rating: 4.6,
    location: { latitude: 7.9403, longitude: 81.0188 },
    entryFee: 'USD 25 (Foreigners)',
    timings: '7:00 AM - 6:00 PM',
    bestTimeToVisit: 'May to September',
    howToReach: 'Bus from Colombo or Kandy (4-5 hours)',
    nearbyPlaces: ['Sigiriya', 'Anuradhapura', 'Kandy'],
  },
  {
    id: 11,
    title: 'Udawalawe National Park',
    name: 'Udawalawe',
    description: 'Safari park renowned for large elephant herds. One of the best places to see elephants in Sri Lanka with 400-500 elephants.',
    category: 'Wildlife',
    district: 'Ratnapura',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
    location: { latitude: 6.4717, longitude: 80.9001 },
    entryFee: 'LKR 4500 + Jeep charges',
    timings: '6:00 AM - 6:00 PM',
    bestTimeToVisit: 'Year round',
    howToReach: 'Drive from Colombo (4 hours)',
    nearbyPlaces: ['Yala', 'Ella', 'Arugam Bay'],
  },
  {
    id: 12,
    title: 'Arugam Bay',
    name: 'Arugam Bay',
    description: 'World-famous surfing destination with pristine beaches. Voted one of the top 10 surf points in the world.',
    category: 'Beaches',
    district: 'Ampara',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Beach_of_Arugam_Bay.jpg',
    rating: 4.7,
    location: { latitude: 6.8409, longitude: 81.8353 },
    entryFee: 'Free',
    timings: 'Open 24/7',
    bestTimeToVisit: 'May to September (Surfing season)',
    howToReach: 'Bus from Colombo (8-10 hours)',
    nearbyPlaces: ['Yala', 'Ella', 'Udawalawe'],
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