import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { logoutUser } from '../store/slices/authSlice';
import { toggleTheme } from '../store/slices/themeSlice';
import Colors from '../constants/colors';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user, isDarkMode } = useSelector((state) => ({
    user: state.auth.user,
    isDarkMode: state.theme.isDarkMode,
  }));

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logoutUser()),
        },
      ]
    );
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const ProfileOption = ({ icon, title, onPress, rightComponent, subtitle }) => (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <View style={styles.optionLeft}>
        <View style={styles.iconContainer}>
          <Feather name={icon} size={20} color={Colors.deepSaffron} />
        </View>
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{title}</Text>
          {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || <Feather name="chevron-right" size={20} color={Colors.mediumGray} />}
    </TouchableOpacity>
  );

  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        </View>
        <Text style={styles.userName}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.userEmail}>{user?.email || user?.username}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <ProfileOption
          icon="moon"
          title="Dark Mode"
          subtitle={isDarkMode ? 'Enabled' : 'Disabled'}
          rightComponent={
            <Switch
              value={isDarkMode}
              onValueChange={handleToggleTheme}
              trackColor={{ false: Colors.lightGray, true: Colors.deepSaffron }}
              thumbColor={isDarkMode ? Colors.white : Colors.mediumGray}
            />
          }
        />

        <Text style={styles.sectionTitle}>Account</Text>
        
        <ProfileOption
          icon="user"
          title="Edit Profile"
          subtitle="Update your personal information"
          onPress={() => {
            Alert.alert('Feature Coming Soon', 'Profile editing will be available in the next update.');
          }}
        />

        <ProfileOption
          icon="bell"
          title="Notifications"
          subtitle="Manage your notification preferences"
          onPress={() => {
            Alert.alert('Feature Coming Soon', 'Notification settings will be available in the next update.');
          }}
        />

        <ProfileOption
          icon="globe"
          title="Language"
          subtitle="English"
          onPress={() => {
            Alert.alert('Feature Coming Soon', 'Language selection will be available in the next update.');
          }}
        />

        <Text style={styles.sectionTitle}>Support</Text>
        
        <ProfileOption
          icon="help-circle"
          title="Help & FAQ"
          subtitle="Get help and find answers"
          onPress={() => {
            Alert.alert('Help & FAQ', 'Visit our website for detailed help and frequently asked questions.');
          }}
        />

        <ProfileOption
          icon="mail"
          title="Contact Us"
          subtitle="Get in touch with our team"
          onPress={() => {
            Alert.alert('Contact Us', 'Email: support@explorelk.com\nPhone: +94 11 123 4567');
          }}
        />

        <ProfileOption
          icon="star"
          title="Rate App"
          subtitle="Help us improve ExploreLK"
          onPress={() => {
            Alert.alert('Rate App', 'Thank you for using ExploreLK! Please rate us on the app store.');
          }}
        />

        <ProfileOption
          icon="info"
          title="About"
          subtitle="Version 1.0.0"
          onPress={() => {
            Alert.alert(
              'About ExploreLK',
              'ExploreLK v1.0.0\n\nDiscover the beauty of Sri Lanka with our comprehensive travel guide. Find the best destinations, plan your trips, and create unforgettable memories.\n\n© 2024 ExploreLK. All rights reserved.'
            );
          }}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={20} color={Colors.coral} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.white,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.deepSaffron,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
  },
  optionsContainer: {
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.coral,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.coral,
    marginLeft: 8,
  },
  bottomSpace: {
    height: 50,
  },
});

export default ProfileScreen;