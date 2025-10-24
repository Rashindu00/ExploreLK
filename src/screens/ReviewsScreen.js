import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/colors';
import { saveReview } from '../store/slices/reviewsSlice';

const ReviewsScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews[destination.id] || []);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const user = useSelector((state) => state.auth.user);

  const [rating, setRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      comment: '',
    },
  });

  const onSubmit = async (data) => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    try {
      await dispatch(saveReview(destination.id, {
        ...data,
        rating,
        images: reviewImages,
      }));

      Alert.alert('Success', 'Review submitted successfully!');
      reset();
      setRating(0);
      setReviewImages([]);
      setShowForm(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera roll permissions to add photos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        // Add selected images (max 5)
        const newImages = result.assets.map(asset => asset.uri);
        const totalImages = [...reviewImages, ...newImages].slice(0, 5);
        setReviewImages(totalImages);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const removeImage = (index) => {
    setReviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const StarRating = ({ rating: r, onPress, size = 24 }) => (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onPress && onPress(star)}
          disabled={!onPress}
        >
          <Feather
            name={star <= r ? 'star' : 'star'}
            size={size}
            color={star <= r ? Colors.gold : Colors.mediumGray}
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const ReviewCard = ({ review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>
            {review.userName?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text style={styles.userName}>{review.userName}</Text>
          <StarRating rating={review.rating} size={16} />
        </View>
        <Text style={styles.reviewDate}>
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>
      </View>
      {review.title && <Text style={styles.reviewTitle}>{review.title}</Text>}
      <Text style={styles.reviewComment}>{review.comment}</Text>
      
      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.reviewImagesContainer}
        >
          {review.images.map((imageUri, index) => (
            <Image 
              key={index}
              source={{ uri: imageUri }} 
              style={styles.reviewImage}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={isDarkMode ? Colors.darkText : Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.title}>Reviews</Text>
        <TouchableOpacity onPress={() => setShowForm(!showForm)}>
          <Feather name="edit" size={24} color={Colors.deepSaffron} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Rating Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.destinationName}>{destination.name}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.averageRating}>{averageRating}</Text>
            <View>
              <StarRating rating={Math.round(averageRating)} size={20} />
              <Text style={styles.reviewCount}>
                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </Text>
            </View>
          </View>
        </View>

        {/* Write Review Form */}
        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Write a Review</Text>
            
            <Text style={styles.label}>Your Rating</Text>
            <StarRating rating={rating} onPress={setRating} size={32} />

            <Text style={styles.label}>Title (Optional)</Text>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Sum up your experience"
                  placeholderTextColor={Colors.mediumGray}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Text style={styles.label}>Your Review</Text>
            <Controller
              control={control}
              name="comment"
              rules={{ required: 'Review comment is required' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Share your experience..."
                  placeholderTextColor={Colors.mediumGray}
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              )}
            />
            {errors.comment && <Text style={styles.errorText}>{errors.comment.message}</Text>}

            {/* Add Photos Section */}
            <Text style={styles.label}>Add Photos (Optional)</Text>
            <View style={styles.photosContainer}>
              {reviewImages.map((imageUri, index) => (
                <View key={index} style={styles.imagePreviewContainer}>
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Feather name="x" size={16} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              ))}
              {reviewImages.length < 5 && (
                <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
                  <Feather name="camera" size={24} color={Colors.deepSaffron} />
                  <Text style={styles.addPhotoText}>Add Photo</Text>
                  <Text style={styles.photoLimitText}>({reviewImages.length}/5)</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowForm(false);
                  reset();
                  setRating(0);
                  setReviewImages([]);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.submitButtonText}>Submit Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Reviews List */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>All Reviews</Text>
          {reviews.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Feather name="message-circle" size={60} color={Colors.mediumGray} />
              <Text style={styles.emptyText}>No reviews yet. Be the first!</Text>
            </View>
          ) : (
            <>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </>
          )}
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
  },
  summaryCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    padding: 20,
    marginTop: 10,
  },
  destinationName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 15,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.deepSaffron,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginTop: 5,
  },
  formCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    padding: 20,
    marginTop: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 10,
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
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.white,
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
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightGray,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    flex: 1,
    backgroundColor: Colors.deepSaffron,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 15,
  },
  reviewCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.deepSaffron,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    lineHeight: 20,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 10,
  },
  imagePreviewContainer: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.coral,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.deepSaffron,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    fontSize: 10,
    color: Colors.deepSaffron,
    fontWeight: '600',
    marginTop: 4,
  },
  photoLimitText: {
    fontSize: 9,
    color: Colors.mediumGray,
    marginTop: 2,
  },
  reviewImagesContainer: {
    marginTop: 10,
  },
  reviewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: Colors.lightGray,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.mediumGray,
    marginTop: 15,
  },
});

export default ReviewsScreen;
