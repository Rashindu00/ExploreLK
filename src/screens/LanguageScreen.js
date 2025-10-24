import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

const LanguageScreen = ({ navigation }) => {
  const { isDarkMode } = useSelector((state) => ({
    isDarkMode: state.theme.isDarkMode,
  }));

  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      icon: '🇬🇧',
    },
    {
      code: 'si',
      name: 'Sinhala',
      nativeName: 'සිංහල',
      icon: '🇱🇰',
    },
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      icon: '🇱🇰',
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      icon: '🇨🇳',
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      icon: '🇯🇵',
    },
    {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      icon: '🇰🇷',
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      icon: '🇫🇷',
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      icon: '🇩🇪',
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      icon: '🇪🇸',
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      icon: '🇷🇺',
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      icon: '🇸🇦',
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      icon: '🇮🇳',
    },
  ];

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    const language = languages.find(lang => lang.code === languageCode);
    
    Alert.alert(
      'Language Changed',
      `Language changed to ${language.name}. The app will restart to apply changes.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const LanguageOption = ({ language }) => (
    <TouchableOpacity
      style={[
        styles.languageContainer,
        selectedLanguage === language.code && styles.selectedLanguage,
      ]}
      onPress={() => handleLanguageSelect(language.code)}
    >
      <View style={styles.languageLeft}>
        <Text style={styles.flagIcon}>{language.icon}</Text>
        <View style={styles.languageText}>
          <Text style={styles.languageName}>{language.name}</Text>
          <Text style={styles.nativeName}>{language.nativeName}</Text>
        </View>
      </View>
      {selectedLanguage === language.code && (
        <Feather name="check-circle" size={24} color={Colors.deepSaffron} />
      )}
    </TouchableOpacity>
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
        <Text style={styles.title}>Language</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Select your preferred language
        </Text>

        {/* Popular Languages */}
        <Text style={styles.sectionTitle}>Popular in Sri Lanka</Text>
        {languages.slice(0, 3).map((language) => (
          <LanguageOption key={language.code} language={language} />
        ))}

        {/* Other Languages */}
        <Text style={styles.sectionTitle}>Other Languages</Text>
        {languages.slice(3).map((language) => (
          <LanguageOption key={language.code} language={language} />
        ))}

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Feather name="globe" size={20} color={Colors.oceanBlue} />
          <Text style={styles.infoText}>
            Changing the language will update all text in the app. Some content may not be available in all languages.
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
  subtitle: {
    fontSize: 16,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginTop: 20,
    marginBottom: 15,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedLanguage: {
    borderColor: Colors.deepSaffron,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  languageText: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 2,
  },
  nativeName: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
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

export default LanguageScreen;