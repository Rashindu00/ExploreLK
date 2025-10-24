import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/colors';
import { saveTrip } from '../store/slices/tripsSlice';

const CreateTripScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      budget: '',
      notes: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const tripData = {
        ...data,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        budget: parseFloat(data.budget) || 0,
      };
      
      await dispatch(saveTrip(tripData));
      
      Alert.alert(
        'Success',
        'Trip plan created successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create trip. Please try again.');
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Trip Plan</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Trip Name</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Trip name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="e.g., Weekend Getaway to Ella"
              placeholderTextColor={Colors.mediumGray}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}
        >
          <Feather name="calendar" size={20} color={Colors.deepSaffron} />
          <Text style={styles.dateText}>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}
        >
          <Feather name="calendar" size={20} color={Colors.deepSaffron} />
          <Text style={styles.dateText}>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Budget (LKR)</Text>
        <Controller
          control={control}
          name="budget"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="e.g., 50000"
              placeholderTextColor={Colors.mediumGray}
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />

        <Text style={styles.label}>Notes (Optional)</Text>
        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add trip notes, activities, reminders..."
              placeholderTextColor={Colors.mediumGray}
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          )}
        />

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Feather name="plus-circle" size={20} color={Colors.white} />
          <Text style={styles.createButtonText}>Create Trip Plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: isDarkMode ? Colors.mediumGray : Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: isDarkMode ? Colors.mediumGray : Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
  },
  dateText: {
    fontSize: 16,
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginLeft: 10,
  },
  errorText: {
    color: Colors.coral,
    fontSize: 14,
    marginTop: 5,
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: Colors.deepSaffron,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  createButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default CreateTripScreen;
