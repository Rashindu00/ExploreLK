import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/colors';
import { updateUserProfile } from '../store/slices/authSlice';

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, isDarkMode } = useSelector((state) => ({
    user: state.auth.user,
    isDarkMode: state.theme.isDarkMode,
  }));

  const [profileImage, setProfileImage] = useState(user?.image || null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
    },
  });

  const pickImage = async () => {
    try {
      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!');
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const onSubmit = async (data) => {
    try {
      // Update user profile with all data including phone number and image
      const updatedProfile = {
        ...data,
        image: profileImage,
      };
      
      await dispatch(updateUserProfile(updatedProfile));
      
      Alert.alert(
        'Success',
        'Profile updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Picture */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.editAvatarButton} onPress={pickImage}>
            <Feather name="camera" size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.changePhotoText}>Change Profile Photo</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>First Name</Text>
        <Controller
          control={control}
          name="firstName"
          rules={{ required: 'First name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter first name"
                placeholderTextColor={Colors.mediumGray}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}

        <Text style={styles.label}>Last Name</Text>
        <Controller
          control={control}
          name="lastName"
          rules={{ required: 'Last name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter last name"
                placeholderTextColor={Colors.mediumGray}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}

        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                placeholderTextColor={Colors.mediumGray}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Text style={styles.label}>Phone Number (Optional)</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="+94 XX XXX XXXX"
                placeholderTextColor={Colors.mediumGray}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
              />
            </View>
          )}
        />

        <Text style={styles.label}>Bio (Optional)</Text>
        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tell us about yourself..."
                placeholderTextColor={Colors.mediumGray}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          )}
        />

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.deepSaffron,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.white,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.oceanBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: isDarkMode ? Colors.darkBackground : Colors.white,
  },
  changePhotoText: {
    fontSize: 14,
    color: Colors.oceanBlue,
    marginTop: 10,
    fontWeight: '600',
  },
  formContainer: {
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
  inputContainer: {
    borderWidth: 1,
    borderColor: isDarkMode ? Colors.mediumGray : Colors.lightGray,
    borderRadius: 12,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  textAreaContainer: {
    height: 100,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  errorText: {
    color: Colors.coral,
    fontSize: 14,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: Colors.deepSaffron,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;