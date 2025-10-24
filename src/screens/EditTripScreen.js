import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/colors';
import { updateTripData, removeTripData } from '../store/slices/tripsSlice';

const EditTripScreen = ({ route, navigation }) => {
  const { trip } = route.params;
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [tripName, setTripName] = useState(trip.name);
  const [startDate, setStartDate] = useState(new Date(trip.startDate));
  const [endDate, setEndDate] = useState(new Date(trip.endDate));
  const [budget, setBudget] = useState(trip.budget?.toString() || '0');
  const [notes, setNotes] = useState(trip.notes || '');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleSave = async () => {
    // Validation
    if (!tripName.trim()) {
      Alert.alert('Error', 'Please enter a trip name');
      return;
    }

    if (endDate < startDate) {
      Alert.alert('Error', 'End date must be after start date');
      return;
    }

    const budgetValue = parseFloat(budget) || 0;
    if (budgetValue < 0) {
      Alert.alert('Error', 'Budget cannot be negative');
      return;
    }

    // Update trip
    const updatedTrip = {
      ...trip,
      name: tripName.trim(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      budget: budgetValue,
      notes: notes.trim(),
    };

    await dispatch(updateTripData(updatedTrip));
    Alert.alert('Success', 'Trip updated successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Trip',
      'Are you sure you want to delete this trip? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await dispatch(removeTripData(trip.id));
            Alert.alert('Success', 'Trip deleted successfully!', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('MyTrips'),
              },
            ]);
          },
        },
      ]
    );
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Trip</Text>
        <TouchableOpacity onPress={handleSave}>
          <Feather name="check" size={24} color={Colors.forestGreen} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Trip Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Trip Name</Text>
          <View style={styles.inputContainer}>
            <Feather name="map" size={20} color={Colors.mediumGray} />
            <TextInput
              style={styles.input}
              value={tripName}
              onChangeText={setTripName}
              placeholder="Enter trip name"
              placeholderTextColor={Colors.mediumGray}
            />
          </View>
        </View>

        {/* Start Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Feather name="calendar" size={20} color={Colors.oceanBlue} />
            <Text style={styles.dateText}>{formatDate(startDate)}</Text>
            <Feather name="chevron-down" size={20} color={Colors.mediumGray} />
          </TouchableOpacity>
        </View>

        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onStartDateChange}
            minimumDate={new Date()}
          />
        )}

        {/* End Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Feather name="calendar" size={20} color={Colors.oceanBlue} />
            <Text style={styles.dateText}>{formatDate(endDate)}</Text>
            <Feather name="chevron-down" size={20} color={Colors.mediumGray} />
          </TouchableOpacity>
        </View>

        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onEndDateChange}
            minimumDate={startDate}
          />
        )}

        {/* Budget */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Budget (LKR)</Text>
          <View style={styles.inputContainer}>
            <Feather name="dollar-sign" size={20} color={Colors.gold} />
            <TextInput
              style={styles.input}
              value={budget}
              onChangeText={setBudget}
              placeholder="Enter budget"
              placeholderTextColor={Colors.mediumGray}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Notes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <View style={[styles.inputContainer, styles.notesContainer]}>
            <Feather name="file-text" size={20} color={Colors.mediumGray} style={styles.notesIcon} />
            <TextInput
              style={[styles.input, styles.notesInput]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Add notes about your trip"
              placeholderTextColor={Colors.mediumGray}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Trip Info Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Trip Summary</Text>
          <View style={styles.summaryRow}>
            <Feather name="calendar" size={16} color={Colors.mediumGray} />
            <Text style={styles.summaryText}>
              Duration: {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} days
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Feather name="map-pin" size={16} color={Colors.mediumGray} />
            <Text style={styles.summaryText}>
              Destinations: {trip.destinations?.length || 0}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Feather name="dollar-sign" size={16} color={Colors.mediumGray} />
            <Text style={styles.summaryText}>
              Budget: LKR {parseFloat(budget || 0).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Feather name="save" size={20} color="#FFF" />
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Feather name="trash-2" size={20} color="#FFF" />
          <Text style={styles.deleteButtonText}>Delete Trip</Text>
        </TouchableOpacity>
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
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? Colors.darkBorder : Colors.lightGray,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    inputGroup: {
      marginBottom: 24,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: isDarkMode ? Colors.darkBorder : Colors.lightGray,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginLeft: 12,
    },
    dateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: isDarkMode ? Colors.darkBorder : Colors.lightGray,
    },
    dateText: {
      flex: 1,
      fontSize: 16,
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginLeft: 12,
    },
    notesContainer: {
      alignItems: 'flex-start',
      paddingVertical: 12,
      minHeight: 120,
    },
    notesIcon: {
      marginTop: 4,
    },
    notesInput: {
      height: 100,
      textAlignVertical: 'top',
    },
    summaryCard: {
      backgroundColor: isDarkMode ? Colors.darkCard : '#FFF',
      borderRadius: 16,
      padding: 20,
      marginTop: 8,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: isDarkMode ? Colors.darkBorder : Colors.lightGray,
    },
    summaryTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? Colors.darkText : Colors.darkGray,
      marginBottom: 16,
    },
    summaryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    summaryText: {
      fontSize: 14,
      color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
      marginLeft: 12,
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.forestGreen,
      borderRadius: 16,
      paddingVertical: 18,
      marginBottom: 16,
    },
    saveButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFF',
      marginLeft: 8,
    },
    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.coral,
      borderRadius: 16,
      paddingVertical: 18,
      marginBottom: 40,
    },
    deleteButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFF',
      marginLeft: 8,
    },
  });

export default EditTripScreen;
