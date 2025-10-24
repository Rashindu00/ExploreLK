# ExploreLK - Tourist Destinations & Travel Planner 🏖️

A comprehensive React Native mobile application for exploring Sri Lankan tourist destinations, built with Expo.

## 🌟 Features

### Core Features
- **User Authentication**: Secure login/registration with form validation
- **Tourist Destinations**: Browse curated Sri Lankan destinations
- **Categories**: Filter by Historical Sites, Beaches, Hill Country, Wildlife, etc.
- **Detailed Information**: Entry fees, timings, how to reach, best time to visit
- **Favorites System**: Save and manage favorite destinations
- **Search Functionality**: Find destinations by name or description
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for various screen sizes

### Destination Information
- 🏰 Top destinations (Sigiriya, Ella, Galle, etc.)
- 📸 High-quality photo galleries
- 📝 Detailed descriptions and history
- ⭐ Ratings & reviews
- 🗺️ Location mapping integration
- 🚗 Transportation guide (train/bus/car)
- 💰 Entry fees & opening hours
- 🏨 Nearby hotels/restaurants suggestions
- 📅 Best time to visit recommendations
- 🌤️ Weather information

### Categories
- Historical Sites
- Beaches
- Hill Country
- Wildlife
- Adventure Sports
- Cultural Sites
- Food & Restaurants

## 🛠️ Technology Stack

- **Framework**: React Native with Expo CLI
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **Form Handling**: React Hook Form with Yup validation
- **Data Persistence**: AsyncStorage
- **Icons**: Feather Icons (@expo/vector-icons)
- **API Integration**: DummyJSON for authentication
- **Maps**: React Native Maps integration

## 🎨 Design System

### Primary Colors
- **Deep Saffron**: #FF9933 (warm, inviting - represents Sri Lankan sunsets)
- **Ocean Blue**: #0077BE (represents beaches and ocean)
- **Forest Green**: #2D5016 (hill country, nature)

### Secondary Colors
- **Gold**: #FFD700 (cultural richness, temples)
- **Coral**: #FF6B6B (accent for CTAs and highlights)

### Neutral Colors
- **White**: #FFFFFF (backgrounds)
- **Light Gray**: #F5F5F5 (card backgrounds)
- **Dark Gray**: #333333 (text)
- **Medium Gray**: #757575 (secondary text)

## 📱 Screens

1. **Authentication Flow**
   - Login Screen with demo credentials
   - Registration Screen with validation

2. **Main Application**
   - Home Screen with destinations grid
   - Destination Detail Screen
   - Favorites Screen
   - Profile Screen with settings

3. **Navigation**
   - Bottom Tab Navigation
   - Stack Navigation for details
   - Smooth transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ExploreLK.git
cd ExploreLK
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Scan the QR code with Expo Go app or run on simulator:
```bash
npm run android  # For Android
npm run ios      # For iOS
npm run web      # For web browser
```

## 🔐 Demo Credentials

For testing the app, use these demo credentials:
- **Username**: emilys
- **Password**: emilyspass

## 📦 Project Structure

```
ExploreLK/
├── src/
│   ├── components/          # Reusable components
│   │   └── DestinationCard.js
│   ├── constants/           # Color schemes and constants
│   │   └── colors.js
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.js
│   ├── screens/            # Screen components
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── DestinationDetailScreen.js
│   │   ├── FavoritesScreen.js
│   │   └── ProfileScreen.js
│   ├── store/              # Redux store and slices
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── destinationsSlice.js
│   │       ├── favoritesSlice.js
│   │       └── themeSlice.js
│   └── utils/              # Utility functions
│       └── validations.js
├── App.js                  # Main app component
└── package.json
```

## 🔧 Key Features Implementation

### State Management
- Redux Toolkit for global state management
- Persistent storage with AsyncStorage
- Separate slices for auth, destinations, favorites, and theme

### Form Validation
- React Hook Form for form management
- Yup schema validation
- Real-time error handling

### Data Persistence
- User authentication state
- Favorite destinations
- Theme preferences (dark/light mode)

### Navigation
- Stack navigator for authentication flow
- Bottom tab navigator for main app
- Proper navigation state management

### UI/UX Features
- Smooth animations and transitions
- Responsive design for various screen sizes
- Dark mode support
- Consistent color scheme
- Loading states and error handling

## 🌐 API Integration

The app uses mock data for destinations and integrates with:
- DummyJSON API for user authentication
- Google Maps for location services
- Booking.com for activity bookings (external links)

## 📋 Assignment Requirements Compliance

✅ **User Authentication**: Complete login/registration flow with form validation  
✅ **Navigation Structure**: React Navigation with stack and bottom tab navigation  
✅ **Home Screen**: Dynamic destination list with API integration  
✅ **State Management**: Redux Toolkit implementation  
✅ **Favorites**: Persistent favorites with AsyncStorage  
✅ **Styling**: Consistent UI with Feather Icons  
✅ **Responsive Design**: Works on various screen sizes  
✅ **Dark Mode**: Theme toggle functionality (Bonus Feature)  

## 🔄 Best Practices

- **Modular Code Structure**: Feature-based organization
- **Reusable Components**: DRY principle implementation
- **Error Handling**: Proper error states and user feedback
- **Performance**: Optimized rendering and state updates
- **Security**: Secure authentication state management
- **Accessibility**: Proper labeling and navigation

## 🚀 Future Enhancements

- Offline functionality
- Push notifications
- Social sharing
- Trip planning features
- Real-time weather integration
- User-generated content (reviews, photos)
- Multi-language support

## 📄 License

This project is created for educational purposes as part of the IN3210 Mobile Applications Development Assignment.

---

**ExploreLK** - Discover the Pearl of the Indian Ocean 🇱🇰