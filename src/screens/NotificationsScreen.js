import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

const NotificationsScreen = ({ navigation }) => {
  const { isDarkMode } = useSelector((state) => ({
    isDarkMode: state.theme.isDarkMode,
  }));

  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailNotifications: true,
    newDestinations: true,
    favoriteUpdates: false,
    tripReminders: true,
    specialOffers: true,
    weeklyDigest: false,
    inAppSounds: true,
  });

  const handleToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const NotificationOption = ({ icon, title, subtitle, value, onToggle }) => (
    <View style={styles.optionContainer}>
      <View style={styles.optionLeft}>
        <View style={styles.iconContainer}>
          <Feather name={icon} size={20} color={Colors.deepSaffron} />
        </View>
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{title}</Text>
          {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: Colors.lightGray, true: Colors.deepSaffron }}
        thumbColor={value ? Colors.white : Colors.mediumGray}
      />
    </View>
  );

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* General Section */}
        <Text style={styles.sectionTitle}>General</Text>
        
        <NotificationOption
          icon="bell"
          title="Push Notifications"
          subtitle="Receive notifications on your device"
          value={notifications.pushNotifications}
          onToggle={() => handleToggle('pushNotifications')}
        />

        <NotificationOption
          icon="mail"
          title="Email Notifications"
          subtitle="Get updates via email"
          value={notifications.emailNotifications}
          onToggle={() => handleToggle('emailNotifications')}
        />

        <NotificationOption
          icon="volume-2"
          title="In-App Sounds"
          subtitle="Play sounds for notifications"
          value={notifications.inAppSounds}
          onToggle={() => handleToggle('inAppSounds')}
        />

        {/* Content Updates Section */}
        <Text style={styles.sectionTitle}>Content Updates</Text>
        
        <NotificationOption
          icon="map-pin"
          title="New Destinations"
          subtitle="Notify when new places are added"
          value={notifications.newDestinations}
          onToggle={() => handleToggle('newDestinations')}
        />

        <NotificationOption
          icon="heart"
          title="Favorite Updates"
          subtitle="Updates about your favorite places"
          value={notifications.favoriteUpdates}
          onToggle={() => handleToggle('favoriteUpdates')}
        />

        <NotificationOption
          icon="calendar"
          title="Trip Reminders"
          subtitle="Reminders for your planned trips"
          value={notifications.tripReminders}
          onToggle={() => handleToggle('tripReminders')}
        />

        {/* Marketing Section */}
        <Text style={styles.sectionTitle}>Marketing</Text>
        
        <NotificationOption
          icon="tag"
          title="Special Offers"
          subtitle="Deals and promotions"
          value={notifications.specialOffers}
          onToggle={() => handleToggle('specialOffers')}
        />

        <NotificationOption
          icon="book-open"
          title="Weekly Digest"
          subtitle="Weekly summary of top destinations"
          value={notifications.weeklyDigest}
          onToggle={() => handleToggle('weeklyDigest')}
        />

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Feather name="info" size={20} color={Colors.oceanBlue} />
          <Text style={styles.infoText}>
            You can manage your notification preferences anytime. Some notifications may be required for essential app functions.
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginTop: 20,
    marginBottom: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
    borderRadius: 12,
    marginBottom: 10,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  optionSubtitle: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginTop: 2,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.oceanBlue,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginLeft: 10,
    lineHeight: 20,
  },
});

export default NotificationsScreen;