import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');

const DestinationDetailScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const dispatch = useDispatch();
  
  const { favorites, isDarkMode } = useSelector((state) => ({
    favorites: state.favorites.favorites,
    isDarkMode: state.theme.isDarkMode,
  }));

  const isFavorite = favorites.includes(destination.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(destination.id));
  };

  const handleOpenMap = () => {
    const { latitude, longitude } = destination.location;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleBookActivity = () => {
    // This would typically open a booking system or external app
    Linking.openURL('https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(destination.title));
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Feather key={i} name="star" size={16} color={Colors.gold} style={{ marginRight: 2 }} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Feather key="half" name="star" size={16} color={Colors.gold} style={{ marginRight: 2 }} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Feather key={`empty-${i}`} name="star" size={16} color={Colors.mediumGray} style={{ marginRight: 2 }} />
      );
    }

    return stars;
  };

  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: destination.image }} style={styles.image} />
        <View style={styles.imageOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={handleToggleFavorite}
          >
            <Feather
              name={isFavorite ? "heart" : "heart"}
              size={24}
              color={isFavorite ? Colors.coral : Colors.white}
              fill={isFavorite ? Colors.coral : 'none'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title and Rating */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{destination.title}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderRatingStars(destination.rating)}
            </View>
            <Text style={styles.ratingText}>{destination.rating}</Text>
          </View>
        </View>

        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{destination.category}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{destination.description}</Text>

        {/* Info Cards */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Feather name="clock" size={20} color={Colors.deepSaffron} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Timings</Text>
              <Text style={styles.infoValue}>{destination.timings}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Feather name="dollar-sign" size={20} color={Colors.deepSaffron} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Entry Fee</Text>
              <Text style={styles.infoValue}>{destination.entryFee}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Feather name="calendar" size={20} color={Colors.deepSaffron} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Best Time to Visit</Text>
              <Text style={styles.infoValue}>{destination.bestTimeToVisit}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Feather name="navigation" size={20} color={Colors.deepSaffron} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>How to Reach</Text>
              <Text style={styles.infoValue}>{destination.howToReach}</Text>
            </View>
          </View>
        </View>

        {/* Nearby Places */}
        <View style={styles.nearbySection}>
          <Text style={styles.sectionTitle}>Nearby Attractions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {destination.nearbyPlaces.map((place, index) => (
              <View key={index} style={styles.nearbyCard}>
                <Text style={styles.nearbyText}>{place}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.mapButton} onPress={handleOpenMap}>
            <Feather name="map-pin" size={20} color={Colors.white} />
            <Text style={styles.buttonText}>View on Map</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookButton} onPress={handleBookActivity}>
            <Feather name="calendar" size={20} color={Colors.white} />
            <Text style={styles.buttonText}>Book Activities</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.white,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(255,107,107,0.2)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginRight: 10,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  categoryBadge: {
    backgroundColor: Colors.deepSaffron,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginBottom: 25,
  },
  infoSection: {
    marginBottom: 25,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 15,
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
  },
  nearbySection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 15,
  },
  nearbyCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  nearbyText: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  mapButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.oceanBlue,
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.coral,
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default DestinationDetailScreen;