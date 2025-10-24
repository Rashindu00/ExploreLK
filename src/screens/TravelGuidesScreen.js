import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

const TravelGuidesScreen = ({ route, navigation }) => {
  const { destination } = route.params || {};
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const guides = [
    {
      id: '1',
      title: 'Getting There',
      icon: 'navigation',
      content: [
        { label: 'By Train', value: '2-3 hours from Colombo', icon: 'activity' },
        { label: 'By Bus', value: 'Regular services available', icon: 'truck' },
        { label: 'By Car', value: 'Private taxi recommended', icon: 'users' },
      ],
    },
    {
      id: '2',
      title: 'Local Transportation',
      icon: 'map-pin',
      content: [
        { label: 'Tuk-tuks', value: 'LKR 50-200 per km', icon: 'navigation' },
        { label: 'Bike Rental', value: 'LKR 500-1000 per day', icon: 'circle' },
        { label: 'Walking', value: 'Most attractions walkable', icon: 'trending-up' },
      ],
    },
    {
      id: '3',
      title: 'Food & Dining',
      icon: 'coffee',
      content: [
        { label: 'Street Food', value: 'LKR 100-300', icon: 'shopping-bag' },
        { label: 'Local Restaurants', value: 'LKR 500-1500', icon: 'home' },
        { label: 'Fine Dining', value: 'LKR 2000+', icon: 'star' },
      ],
    },
    {
      id: '4',
      title: 'Accommodation',
      icon: 'home',
      content: [
        { label: 'Budget Guesthouses', value: 'LKR 1500-3000', icon: 'home' },
        { label: 'Mid-range Hotels', value: 'LKR 5000-10000', icon: 'briefcase' },
        { label: 'Luxury Resorts', value: 'LKR 15000+', icon: 'award' },
      ],
    },
    {
      id: '5',
      title: 'Safety Tips',
      icon: 'shield',
      content: [
        { label: 'Emergency', value: 'Dial 119', icon: 'phone' },
        { label: 'Water', value: 'Drink bottled water', icon: 'droplet' },
        { label: 'Sun Protection', value: 'Use SPF 50+ sunscreen', icon: 'sun' },
      ],
    },
    {
      id: '6',
      title: 'Cultural Etiquette',
      icon: 'book',
      content: [
        { label: 'Temples', value: 'Remove shoes & cover shoulders', icon: 'user' },
        { label: 'Greetings', value: 'Slight bow with "Ayubowan"', icon: 'smile' },
        { label: 'Photography', value: 'Ask permission before taking photos', icon: 'camera' },
      ],
    },
    {
      id: '7',
      title: 'Best Time to Visit',
      icon: 'calendar',
      content: [
        { label: 'Peak Season', value: 'December - April', icon: 'sun' },
        { label: 'Low Season', value: 'May - November', icon: 'cloud-rain' },
        { label: 'Festivals', value: 'Check local calendar', icon: 'gift' },
      ],
    },
    {
      id: '8',
      title: 'What to Pack',
      icon: 'shopping-bag',
      content: [
        { label: 'Clothing', value: 'Light, breathable fabrics', icon: 'tag' },
        { label: 'Essentials', value: 'Sunscreen, hat, sunglasses', icon: 'sun' },
        { label: 'Footwear', value: 'Comfortable walking shoes', icon: 'activity' },
      ],
    },
  ];

  const bookingLinks = [
    { name: 'Booking.com', icon: 'home', url: 'https://www.booking.com', color: Colors.oceanBlue },
    { name: 'Airbnb', icon: 'key', url: 'https://www.airbnb.com', color: Colors.coral },
    { name: 'Agoda', icon: 'bed', url: 'https://www.agoda.com', color: Colors.deepSaffron },
    { name: 'TripAdvisor', icon: 'globe', url: 'https://www.tripadvisor.com', color: Colors.forestGreen },
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing travel guide for ${destination?.name || 'Sri Lanka'}! 🌴`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const GuideSection = ({ guide }) => (
    <View style={styles.guideCard}>
      <View style={styles.guideHeader}>
        <Feather name={guide.icon} size={24} color={Colors.deepSaffron} />
        <Text style={styles.guideTitle}>{guide.title}</Text>
      </View>
      {guide.content.map((item, index) => (
        <View key={index} style={styles.guideItem}>
          <Feather name={item.icon} size={16} color={Colors.mediumGray} />
          <View style={styles.guideItemText}>
            <Text style={styles.guideLabel}>{item.label}</Text>
            <Text style={styles.guideValue}>{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.title}>Travel Guides</Text>
        <TouchableOpacity onPress={handleShare}>
          <Feather name="share-2" size={24} color={Colors.deepSaffron} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {destination && (
          <View style={styles.destinationBanner}>
            <Text style={styles.bannerTitle}>{destination.name}</Text>
            <Text style={styles.bannerSubtitle}>Complete Travel Guide</Text>
          </View>
        )}

        {/* Booking Links */}
        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>Book Your Stay</Text>
          <View style={styles.bookingGrid}>
            {bookingLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.bookingCard, { borderColor: link.color }]}
                onPress={() => Linking.openURL(link.url)}
              >
                <Feather name={link.icon} size={28} color={link.color} />
                <Text style={styles.bookingName}>{link.name}</Text>
                <Feather name="external-link" size={16} color={Colors.mediumGray} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Guides */}
        <View style={styles.guidesSection}>
          {guides.map((guide) => (
            <GuideSection key={guide.id} guide={guide} />
          ))}
        </View>

        {/* Emergency Contacts */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Feather name="phone-call" size={24} color={Colors.coral} />
            <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
          </View>
          <View style={styles.emergencyList}>
            <TouchableOpacity style={styles.emergencyItem} onPress={() => Linking.openURL('tel:119')}>
              <Text style={styles.emergencyLabel}>Police Emergency</Text>
              <Text style={styles.emergencyNumber}>119</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyItem} onPress={() => Linking.openURL('tel:110')}>
              <Text style={styles.emergencyLabel}>Ambulance</Text>
              <Text style={styles.emergencyNumber}>110</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyItem} onPress={() => Linking.openURL('tel:1912')}>
              <Text style={styles.emergencyLabel}>Tourist Police</Text>
              <Text style={styles.emergencyNumber}>1912</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  destinationBanner: {
    backgroundColor: Colors.deepSaffron,
    padding: 30,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
  },
  bookingSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 15,
  },
  bookingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bookingCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    borderWidth: 2,
  },
  bookingName: {
    fontSize: 14,
    fontWeight: '600',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginTop: 10,
    marginBottom: 5,
  },
  guidesSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  guideCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? Colors.mediumGray : Colors.lightGray,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginLeft: 12,
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  guideItemText: {
    flex: 1,
    marginLeft: 12,
  },
  guideLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 3,
  },
  guideValue: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
  },
  emergencyCard: {
    backgroundColor: Colors.coral + '15',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.coral,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginLeft: 12,
  },
  emergencyList: {
    gap: 12,
  },
  emergencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    padding: 15,
    borderRadius: 8,
  },
  emergencyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  emergencyNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.coral,
  },
});

export default TravelGuidesScreen;
