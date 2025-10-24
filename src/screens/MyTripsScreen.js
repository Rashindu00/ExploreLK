import React, { useEffect } from 'react';
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
import { loadTrips, removeTripData } from '../store/slices/tripsSlice';

const MyTripsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { trips, isDarkMode } = useSelector((state) => ({
    trips: state.trips.trips,
    isDarkMode: state.theme.isDarkMode,
  }));

  useEffect(() => {
    dispatch(loadTrips());
  }, []);

  const handleDeleteTrip = (tripId) => {
    Alert.alert(
      'Delete Trip',
      'Are you sure you want to delete this trip plan?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(removeTripData(tripId)),
        },
      ]
    );
  };

  const TripCard = ({ trip }) => {
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    return (
      <TouchableOpacity
        style={styles.tripCard}
        onPress={() => navigation.navigate('TripDetails', { trip })}
      >
        <View style={styles.tripHeader}>
          <View style={styles.tripIcon}>
            <Feather name="map-pin" size={24} color={Colors.deepSaffron} />
          </View>
          <View style={styles.tripInfo}>
            <Text style={styles.tripName}>{trip.name}</Text>
            <Text style={styles.tripDate}>
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </Text>
            <View style={styles.tripMeta}>
              <View style={styles.metaItem}>
                <Feather name="calendar" size={14} color={Colors.mediumGray} />
                <Text style={styles.metaText}>{days} days</Text>
              </View>
              <View style={styles.metaItem}>
                <Feather name="map" size={14} color={Colors.mediumGray} />
                <Text style={styles.metaText}>{trip.destinations?.length || 0} places</Text>
              </View>
              {trip.budget > 0 && (
                <View style={styles.metaItem}>
                  <Feather name="dollar-sign" size={14} color={Colors.mediumGray} />
                  <Text style={styles.metaText}>LKR {trip.budget.toLocaleString()}</Text>
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteTrip(trip.id)}
          >
            <Feather name="trash-2" size={20} color={Colors.coral} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trip Plans</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateTrip')}
        >
          <Feather name="plus" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {trips.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="map" size={80} color={Colors.mediumGray} />
            <Text style={styles.emptyTitle}>No Trip Plans Yet</Text>
            <Text style={styles.emptyText}>
              Start planning your next adventure!
            </Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('CreateTrip')}
            >
              <Feather name="plus-circle" size={20} color={Colors.white} />
              <Text style={styles.createButtonText}>Create Trip Plan</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.deepSaffron,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tripCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tripIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripInfo: {
    flex: 1,
    marginLeft: 12,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 5,
  },
  tripDate: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginBottom: 8,
  },
  tripMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginLeft: 4,
  },
  deleteButton: {
    padding: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.mediumGray,
    marginTop: 10,
    textAlign: 'center',
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: Colors.deepSaffron,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  createButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default MyTripsScreen;
