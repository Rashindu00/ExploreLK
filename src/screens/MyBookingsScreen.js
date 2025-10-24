import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

const MyBookingsScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const savedBookings = useSelector((state) => state.transport.savedBookings);

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {savedBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="bookmark" size={64} color={Colors.mediumGray} />
            <Text style={styles.emptyTitle}>No Bookings Yet</Text>
            <Text style={styles.emptyText}>
              Your saved transport bookings will appear here
            </Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => navigation.navigate('TransportMain')}
            >
              <Text style={styles.exploreButtonText}>Explore Transport</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.bookingsList}>
            {savedBookings.map((booking) => (
              <View key={booking.id} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <View style={styles.bookingIconContainer}>
                    <Feather 
                      name={booking.type === 'train' ? 'activity' : 
                            booking.type === 'bus' ? 'truck' : 
                            booking.type === 'taxi' ? 'navigation' : 'briefcase'} 
                      size={24} 
                      color={Colors.deepSaffron} 
                    />
                  </View>
                  <View style={styles.bookingInfo}>
                    <Text style={styles.bookingRoute}>
                      {booking.from} → {booking.to}
                    </Text>
                    <Text style={styles.bookingDate}>{booking.date}</Text>
                  </View>
                </View>
                <View style={styles.bookingDetails}>
                  <View style={styles.detailItem}>
                    <Feather name="clock" size={14} color={Colors.mediumGray} />
                    <Text style={styles.detailText}>{booking.time}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Feather name="users" size={14} color={Colors.mediumGray} />
                    <Text style={styles.detailText}>{booking.passengers} passengers</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 80,
      paddingHorizontal: 40,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginTop: 20,
      marginBottom: 8,
    },
    emptyText: {
      fontSize: 15,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 22,
    },
    exploreButton: {
      backgroundColor: Colors.deepSaffron,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 12,
    },
    exploreButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFF',
    },
    bookingsList: {
      padding: 20,
    },
    bookingCard: {
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    bookingHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    bookingIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: Colors.deepSaffron + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    bookingInfo: {
      flex: 1,
    },
    bookingRoute: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 4,
    },
    bookingDate: {
      fontSize: 13,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    },
    bookingDetails: {
      flexDirection: 'row',
      gap: 16,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailText: {
      fontSize: 12,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginLeft: 6,
    },
  });

export default MyBookingsScreen;
