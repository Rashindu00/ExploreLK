import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { fetchDestinations, setSelectedCategory } from '../store/slices/destinationsSlice';
import { loadFavorites } from '../store/slices/favoritesSlice';
import Colors from '../constants/colors';
import DestinationCard from '../components/DestinationCard';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    destinations,
    categories,
    selectedCategory,
    loading,
    user,
    isDarkMode,
    favorites,
  } = useSelector((state) => ({
    destinations: state.destinations.destinations,
    categories: state.destinations.categories,
    selectedCategory: state.destinations.selectedCategory,
    loading: state.destinations.loading,
    user: state.auth.user,
    isDarkMode: state.theme.isDarkMode,
    favorites: state.favorites.favorites,
  }));

  useEffect(() => {
    dispatch(fetchDestinations());
    dispatch(loadFavorites());
  }, [dispatch]);

  const filteredDestinations = destinations.filter((destination) => {
    const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
    const matchesSearch = destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategoryButton,
      ]}
      onPress={() => dispatch(setSelectedCategory(item))}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item && styles.selectedCategoryButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderDestinationItem = ({ item }) => (
    <DestinationCard
      destination={item}
      onPress={() => navigation.navigate('DestinationDetail', { destination: item })}
      isFavorite={favorites.includes(item.id)}
    />
  );

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>{user?.firstName || 'Explorer'} 👋</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Feather name="user" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.headerTitle}>Discover Sri Lanka</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={Colors.mediumGray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor={Colors.mediumGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Destinations List */}
      <View style={styles.destinationsContainer}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'All' ? 'All Destinations' : selectedCategory}
        </Text>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading destinations...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredDestinations}
            renderItem={renderDestinationItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.destinationsList}
            columnWrapperStyle={styles.destinationRow}
          />
        )}
      </View>
    </View>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.white,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.deepSaffron,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  categoriesContainer: {
    paddingVertical: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.deepSaffron,
  },
  categoryButtonText: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  selectedCategoryButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  destinationsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
  },
  destinationsList: {
    paddingBottom: 20,
  },
  destinationRow: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;