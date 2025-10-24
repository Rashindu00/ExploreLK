import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');
const cardWidth = (width - 50) / 2;

const DestinationCard = ({ destination, onPress, isFavorite }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(destination.id));
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Feather key={i} name="star" size={12} color={Colors.gold} style={{ marginRight: 1 }} />
      );
    }
    
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Feather key={`empty-${i}`} name="star" size={12} color={Colors.mediumGray} style={{ marginRight: 1 }} />
      );
    }
    
    return stars;
  };

  const styles = getStyles(isDarkMode);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: destination.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Feather
            name="heart"
            size={18}
            color={isFavorite ? Colors.coral : Colors.white}
            fill={isFavorite ? Colors.coral : 'none'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {destination.title}
        </Text>
        
        {destination.district && (
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={12} color={Colors.deepSaffron} />
            <Text style={styles.districtText}>{destination.district}</Text>
          </View>
        )}
        
        <Text style={styles.category}>{destination.category}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {renderRatingStars(destination.rating)}
          </View>
          <Text style={styles.ratingText}>{destination.rating}</Text>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {destination.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 4,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  districtText: {
    fontSize: 11,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginLeft: 3,
    fontWeight: '500',
  },
  category: {
    fontSize: 12,
    color: Colors.deepSaffron,
    fontWeight: '600',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  description: {
    fontSize: 12,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    lineHeight: 16,
  },
});

export default DestinationCard;