import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { loadAchievements } from '../store/slices/achievementsSlice';

const AchievementsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.achievements.points);
  const level = useSelector((state) => state.achievements.level);
  const achievements = useSelector((state) => state.achievements.achievements);
  const badges = useSelector((state) => state.achievements.badges);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    dispatch(loadAchievements());
  }, []);

  const nextLevelPoints = level * 100;
  const progress = (points % 100) / 100;

  const AchievementCard = ({ achievement }) => (
    <View style={[
      styles.achievementCard,
      achievement.unlocked && styles.achievementUnlocked
    ]}>
      <View style={[
        styles.achievementIcon,
        achievement.unlocked && styles.iconUnlocked
      ]}>
        <Feather
          name={achievement.icon}
          size={28}
          color={achievement.unlocked ? Colors.gold : Colors.mediumGray}
        />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementName}>{achievement.name}</Text>
        <Text style={styles.achievementDesc}>{achievement.description}</Text>
        <View style={styles.pointsRow}>
          <Feather name="award" size={14} color={Colors.deepSaffron} />
          <Text style={styles.pointsText}>{achievement.points} points</Text>
        </View>
      </View>
      {achievement.unlocked && (
        <View style={styles.checkmark}>
          <Feather name="check-circle" size={24} color={Colors.forestGreen} />
        </View>
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
        <Text style={styles.title}>Achievements</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Level Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View>
              <Text style={styles.levelTitle}>Level {level}</Text>
              <Text style={styles.pointsTitle}>{points} Points</Text>
            </View>
            <View style={styles.trophyIcon}>
              <Feather name="trophy" size={40} color={Colors.gold} />
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {nextLevelPoints - (points % 100)} points to Level {level + 1}
            </Text>
          </View>
        </View>

        {/* Unlocked Badges */}
        {badges.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              🏆 Unlocked Badges ({badges.length})
            </Text>
            <View style={styles.badgesRow}>
              {badges.map((badge) => (
                <View key={badge.id} style={styles.badgeItem}>
                  <View style={styles.badgeIcon}>
                    <Feather name={badge.icon} size={24} color={Colors.gold} />
                  </View>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* All Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Achievements</Text>
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Feather name="info" size={20} color={Colors.oceanBlue} />
          <View style={styles.tipsContent}>
            <Text style={styles.tipsTitle}>How to earn points:</Text>
            <Text style={styles.tipsText}>• Visit destinations</Text>
            <Text style={styles.tipsText}>• Write reviews</Text>
            <Text style={styles.tipsText}>• Create trip plans</Text>
            <Text style={styles.tipsText}>• Share with friends</Text>
          </View>
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
  levelCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    margin: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.deepSaffron,
  },
  pointsTitle: {
    fontSize: 18,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginTop: 5,
  },
  trophyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.gold,
  },
  progressText: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 15,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  badgeItem: {
    alignItems: 'center',
    width: 80,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  badgeName: {
    fontSize: 12,
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    textAlign: 'center',
  },
  achievementCard: {
    backgroundColor: isDarkMode ? Colors.darkCard : Colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
  },
  achievementUnlocked: {
    opacity: 1,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconUnlocked: {
    backgroundColor: Colors.gold + '20',
  },
  achievementInfo: {
    flex: 1,
    marginLeft: 15,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 5,
  },
  achievementDesc: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginBottom: 5,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pointsText: {
    fontSize: 12,
    color: Colors.deepSaffron,
    fontWeight: '600',
  },
  checkmark: {
    marginLeft: 10,
  },
  tipsCard: {
    backgroundColor: Colors.oceanBlue + '15',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.oceanBlue,
  },
  tipsContent: {
    flex: 1,
    marginLeft: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? Colors.darkText : Colors.darkGray,
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    color: isDarkMode ? Colors.darkSecondaryText : Colors.mediumGray,
    marginBottom: 5,
  },
});

export default AchievementsScreen;
