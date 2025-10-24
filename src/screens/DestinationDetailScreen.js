import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');

const DestinationDetailScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const favorites = useSelector((state) => state.favorites.favorites);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const allDestinations = useSelector((state) => state.destinations.destinations);

  const isFavorite = favorites.includes(destination.id);

  // Use images array if available, otherwise fallback to single image
  const images = destination.images || [destination.image];

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

  const handleNearbyPlaceClick = (placeName) => {
    // Find the destination that matches the nearby place name
    const nearbyDestination = allDestinations.find(dest => 
      dest.name.toLowerCase().includes(placeName.toLowerCase()) ||
      dest.title.toLowerCase().includes(placeName.toLowerCase())
    );

    if (nearbyDestination) {
      // Navigate to the found destination
      navigation.push('DestinationDetail', { destination: nearbyDestination });
    } else {
      // If not found in app, open Google search
      const searchQuery = encodeURIComponent(`${placeName} Sri Lanka`);
      Linking.openURL(`https://www.google.com/search?q=${searchQuery}`);
    }
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

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentImageIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image Slider */}
      <View style={styles.imageContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
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
        {/* Image Indicators */}
        {images.length > 1 && (
          <View style={styles.indicatorContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        )}
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

        {/* District and Category */}
        <View style={styles.badgesContainer}>
          {destination.district && (
            <View style={styles.districtBadge}>
              <Feather name="map-pin" size={14} color={Colors.deepSaffron} />
              <Text style={styles.districtBadgeText}>{destination.district} District</Text>
            </View>
          )}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{destination.category}</Text>
          </View>
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
              <TouchableOpacity 
                key={index} 
                style={styles.nearbyCard}
                onPress={() => handleNearbyPlaceClick(place)}
              >
                <Feather name="map-pin" size={16} color={Colors.deepSaffron} />
                <Text style={styles.nearbyText}>{place}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Access Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Explore More</Text>
          <View style={styles.featuresGrid}>
            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => navigation.navigate('Weather', { destination })}
            >
              <Feather name="cloud" size={24} color={Colors.oceanBlue} />
              <Text style={styles.featureText}>Weather</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => navigation.navigate('Reviews', { destination })}
            >
              <Feather name="star" size={24} color={Colors.gold} />
              <Text style={styles.featureText}>Reviews</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => navigation.navigate('TravelGuides', { destination })}
            >
              <Feather name="book" size={24} color={Colors.forestGreen} />
              <Text style={styles.featureText}>Guides</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureCard}
              onPress={handleOpenMap}
            >
              <Feather name="map-pin" size={24} color={Colors.coral} />
              <Text style={styles.featureText}>Map</Text>
            </TouchableOpacity>
          </View>
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
  indicatorContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.white,
    width: 24,
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
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 8,
  },
  districtBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.deepSaffron,
  },
  districtBadgeText: {
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
  },
  nearbyText: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginLeft: 6,
    fontWeight: '500',
  },
  featuresSection: {
    marginBottom: 25,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginTop: 8,
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