import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { addDestinationToTripAsync, removeDestinationFromTripAsync } from '../store/slices/tripsSlice';

const TripDetailsScreen = ({ route, navigation }) => {
  const { trip } = route.params;
  const dispatch = useDispatch();
  const destinations = useSelector((state) => state.destinations.destinations);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const trips = useSelector((state) => state.trips.trips);

  // Get the latest trip data from Redux store
  const currentTrip = trips.find(t => t.id === trip.id) || trip;

  const startDate = new Date(currentTrip.startDate);
  const endDate = new Date(currentTrip.endDate);
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  const tripDestinations = currentTrip.destinations || [];
  const availableDestinations = destinations.filter(
    d => !tripDestinations.find(td => td.id === d.id)
  );

  const handleAddDestination = async (destination) => {
    await dispatch(addDestinationToTripAsync(currentTrip.id, destination));
    Alert.alert('Success', `${destination.title} added to your trip!`);
  };

  const handleRemoveDestination = (destinationId) => {
    Alert.alert(
      'Remove Destination',
      'Are you sure you want to remove this destination from your trip?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await dispatch(removeDestinationFromTripAsync(currentTrip.id, destinationId));
          },
        },
      ]
    );
  };

  const DestinationCard = ({ destination, isInTrip }) => (
    <View style={styles.destinationCard}>
      <View style={styles.destInfo}>
        <Text style={styles.destTitle}>{destination.title}</Text>
        <Text style={styles.destCategory}>{destination.category}</Text>
        <View style={styles.ratingRow}>
          <Feather name="star" size={14} color={Colors.gold} />
          <Text style={styles.ratingText}>{destination.rating}</Text>
        </View>
      </View>
      {isInTrip ? (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveDestination(destination.id)}
        >
          <Feather name="x-circle" size={24} color={Colors.coral} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddDestination(destination)}
        >
          <Feather name="plus-circle" size={24} color={Colors.forestGreen} />
        </TouchableOpacity>
      )}
    </View>
  );

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.title}>Trip Details</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('EditTrip', { trip: currentTrip });
        }}>
          <Feather name="edit-2" size={24} color={Colors.deepSaffron} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trip Info Card */}
        <View style={styles.tripInfoCard}>
          <View style={styles.tripHeader}>
            <View style={styles.tripIcon}>
              <Feather name="map" size={32} color={Colors.deepSaffron} />
            </View>
            <View style={styles.tripHeaderText}>
              <Text style={styles.tripName}>{currentTrip.name}</Text>
              <Text style={styles.tripDates}>
                {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.tripStats}>
            <View style={styles.statItem}>
              <Feather name="calendar" size={20} color={Colors.oceanBlue} />
              <Text style={styles.statValue}>{days}</Text>
              <Text style={styles.statLabel}>Days</Text>
            </View>
            <View style={styles.statItem}>
              <Feather name="map-pin" size={20} color={Colors.forestGreen} />
              <Text style={styles.statValue}>{tripDestinations.length}</Text>
              <Text style={styles.statLabel}>Places</Text>
            </View>
            <View style={styles.statItem}>
              <Feather name="dollar-sign" size={20} color={Colors.gold} />
              <Text style={styles.statValue}>
                {currentTrip.budget > 0 ? `${(currentTrip.budget / 1000).toFixed(0)}K` : '0'}
              </Text>
              <Text style={styles.statLabel}>Budget</Text>
            </View>
          </View>

          {currentTrip.notes && currentTrip.notes.length > 0 && (
            <View style={styles.notesSection}>
              <View style={styles.notesHeader}>
                <Feather name="file-text" size={16} color={Colors.mediumGray} />
                <Text style={styles.notesTitle}>Notes</Text>
              </View>
              <Text style={styles.notesText}>{currentTrip.notes}</Text>
            </View>
          )}
        </View>

        {/* Destinations in Trip */}
        {tripDestinations.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Destinations in Trip ({tripDestinations.length})
              </Text>
            </View>
            {tripDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                isInTrip={true}
              />
            ))}
          </View>
        )}

        {/* Add More Destinations */}
        {availableDestinations.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Add More Destinations</Text>
              <Text style={styles.sectionSubtitle}>
                {availableDestinations.length} available
              </Text>
            </View>
            {availableDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                isInTrip={false}
              />
            ))}
          </View>
        )}

        {tripDestinations.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="map-pin" size={60} color={Colors.mediumGray} />
            <Text style={styles.emptyTitle}>No Destinations Added</Text>
            <Text style={styles.emptyText}>
              Add destinations from the list below to plan your trip
            </Text>
          </View>
        )}

        {/* Budget Breakdown */}
        {currentTrip.budget > 0 && tripDestinations.length > 0 && (
          <View style={styles.budgetCard}>
            <View style={styles.budgetHeader}>
              <Feather name="pie-chart" size={20} color={Colors.deepSaffron} />
              <Text style={styles.budgetTitle}>Budget Breakdown</Text>
            </View>
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>Total Budget</Text>
              <Text style={styles.budgetValue}>LKR {currentTrip.budget.toLocaleString()}</Text>
            </View>
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>Per Day</Text>
              <Text style={styles.budgetValue}>
                LKR {Math.round(currentTrip.budget / days).toLocaleString()}
              </Text>
            </View>
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>Per Destination</Text>
              <Text style={styles.budgetValue}>
                LKR {Math.round(currentTrip.budget / tripDestinations.length).toLocaleString()}
              </Text>
            </View>
          </View>
        )}
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
  tripInfoCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    marginTop: 10,
    padding: 20,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  tripIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.deepSaffron + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tripHeaderText: {
    flex: 1,
  },
  tripName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 5,
  },
  tripDates: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
  },
  tripStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: isDarkMode ? Colors.mediumGray : Colors.lightGray,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  notesSection: {
    marginTop: 15,
    padding: 15,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightGray,
    borderRadius: 12,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginLeft: 8,
  },
  notesText: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    lineHeight: 20,
  },
  section: {
    padding: 20,
    paddingTop: 15,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginTop: 5,
  },
  destinationCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  destInfo: {
    flex: 1,
  },
  destTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 5,
  },
  destCategory: {
    fontSize: 12,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: Colors.gold,
    marginLeft: 5,
    fontWeight: '600',
  },
  addButton: {
    padding: 8,
  },
  removeButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.mediumGray,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  budgetCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 12,
  },
  budgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? Colors.mediumGray : Colors.lightGray,
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginLeft: 10,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  budgetLabel: {
    fontSize: 16,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
});

export default TripDetailsScreen;
