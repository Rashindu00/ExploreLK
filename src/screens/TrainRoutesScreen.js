import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

const TrainRoutesScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const trainRoutes = useSelector((state) => state.transport.trainRoutes);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openSchedule = (route) => {
    setSelectedRoute(route);
    setModalVisible(true);
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Train Routes</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Feather name="info" size={20} color={Colors.oceanBlue} />
          <Text style={styles.infoBannerText}>
            Book tickets at railway.gov.lk or railway stations
          </Text>
        </View>

        {/* Train Routes List */}
        {trainRoutes.map((route) => (
          <View key={route.id} style={styles.routeCard}>
            <View style={styles.routeHeader}>
              <View style={styles.routeHeaderLeft}>
                <View style={styles.routeIconContainer}>
                  <Feather name="activity" size={24} color={Colors.oceanBlue} />
                </View>
                <View style={styles.routeHeaderText}>
                  <Text style={styles.routeName}>{route.name}</Text>
                  {route.scenic && (
                    <View style={styles.scenicBadge}>
                      <Feather name="image" size={12} color={Colors.gold} />
                      <Text style={styles.scenicText}>Scenic Route</Text>
                    </View>
                  )}
                </View>
              </View>
              {route.popular && (
                <View style={styles.popularBadge}>
                  <Feather name="star" size={12} color="#FFF" />
                  <Text style={styles.popularText}>Popular</Text>
                </View>
              )}
            </View>

            <View style={styles.routeDetails}>
              <View style={styles.routeRow}>
                <View style={styles.routePoint}>
                  <View style={[styles.dot, { backgroundColor: Colors.forestGreen }]} />
                  <Text style={styles.locationText}>{route.from}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routePoint}>
                  <View style={[styles.dot, { backgroundColor: Colors.coral }]} />
                  <Text style={styles.locationText}>{route.to}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Feather name="clock" size={16} color={Colors.mediumGray} />
                  <Text style={styles.infoText}>{route.duration}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Feather name="navigation" size={16} color={Colors.mediumGray} />
                  <Text style={styles.infoText}>{route.distance}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Feather name="calendar" size={16} color={Colors.mediumGray} />
                  <Text style={styles.infoText}>{route.frequency}</Text>
                </View>
              </View>

              <Text style={styles.description}>{route.description}</Text>

              {/* Price Info */}
              <View style={styles.priceSection}>
                <Text style={styles.priceLabel}>Ticket Prices (LKR):</Text>
                <View style={styles.priceRow}>
                  <View style={styles.priceItem}>
                    <Text style={styles.priceClass}>1st Class</Text>
                    <Text style={styles.priceValue}>රු {route.price.firstClass}</Text>
                  </View>
                  <View style={styles.priceItem}>
                    <Text style={styles.priceClass}>2nd Class</Text>
                    <Text style={styles.priceValue}>රු {route.price.secondClass}</Text>
                  </View>
                  <View style={styles.priceItem}>
                    <Text style={styles.priceClass}>3rd Class</Text>
                    <Text style={styles.priceValue}>රු {route.price.thirdClass}</Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.scheduleButton}
                  onPress={() => openSchedule(route)}
                >
                  <Feather name="list" size={18} color={Colors.oceanBlue} />
                  <Text style={styles.scheduleButtonText}>View Schedule</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Booking Tips</Text>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Book 30 days in advance for popular routes</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>1st class observation cars offer best views</Text>
          </View>
          <View style={styles.tipItem}>
            <Feather name="check-circle" size={16} color={Colors.forestGreen} />
            <Text style={styles.tipText}>Arrive 30 minutes early at the station</Text>
          </View>
        </View>
      </ScrollView>

      {/* Schedule Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Train Schedule</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
              </TouchableOpacity>
            </View>

            {selectedRoute && (
              <ScrollView>
                <Text style={styles.modalRoute}>{selectedRoute.name}</Text>
                {selectedRoute.schedule.map((train, index) => (
                  <View key={index} style={styles.scheduleItem}>
                    <View style={styles.scheduleTime}>
                      <Text style={styles.departureTime}>{train.departure}</Text>
                      <Feather name="arrow-right" size={16} color={Colors.mediumGray} />
                      <Text style={styles.arrivalTime}>{train.arrival}</Text>
                    </View>
                    <Text style={styles.scheduleClass}>{train.class}</Text>
                  </View>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    infoBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.oceanBlue + '20',
      margin: 20,
      padding: 16,
      borderRadius: 12,
    },
    infoBannerText: {
      flex: 1,
      fontSize: 14,
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginLeft: 12,
    },
    routeCard: {
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderRadius: 16,
      marginHorizontal: 20,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    routeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 16,
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
    },
    routeHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    routeIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: Colors.oceanBlue + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    routeHeaderText: {
      flex: 1,
    },
    routeName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 4,
    },
    scenicBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.gold + '20',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    scenicText: {
      fontSize: 11,
      color: Colors.gold,
      marginLeft: 4,
      fontWeight: '600',
    },
    popularBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.deepSaffron,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
    },
    popularText: {
      fontSize: 11,
      color: '#FFF',
      marginLeft: 4,
      fontWeight: '600',
    },
    routeDetails: {
      padding: 16,
    },
    routeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    routePoint: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 8,
    },
    locationText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
    },
    routeLine: {
      height: 2,
      flex: 0.3,
      backgroundColor: isDarkMode ? Colors.darkBorder : Colors.lightGray,
      marginHorizontal: 8,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoText: {
      fontSize: 12,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginLeft: 6,
    },
    description: {
      fontSize: 13,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      lineHeight: 20,
      marginBottom: 16,
    },
    priceSection: {
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
      padding: 12,
      borderRadius: 12,
      marginBottom: 16,
    },
    priceLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 8,
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priceItem: {
      alignItems: 'center',
    },
    priceClass: {
      fontSize: 11,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginBottom: 4,
    },
    priceValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.oceanBlue,
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    scheduleButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.oceanBlue + '20',
      paddingVertical: 12,
      borderRadius: 12,
    },
    scheduleButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.oceanBlue,
      marginLeft: 8,
    },
    tipsSection: {
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      margin: 20,
      padding: 20,
      borderRadius: 16,
      marginBottom: 40,
    },
    tipsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 16,
    },
    tipItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    tipText: {
      flex: 1,
      fontSize: 14,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginLeft: 12,
      lineHeight: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
    },
    modalRoute: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 16,
    },
    scheduleItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightBackground,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    scheduleTime: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    departureTime: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.forestGreen,
      marginRight: 12,
    },
    arrivalTime: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.coral,
      marginLeft: 12,
    },
    scheduleClass: {
      fontSize: 12,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    },
    closeButton: {
      backgroundColor: Colors.deepSaffron,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 20,
    },
    closeButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFF',
    },
  });

export default TrainRoutesScreen;
