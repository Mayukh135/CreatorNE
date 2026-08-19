// ============================================================
// CreatorNE App — Low Followers Screen
// ============================================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Radius, Spacing, MIN_FOLLOWERS } from '../lib/constants';
import { signOut } from '../lib/supabase';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'LowFollowers'>;

export default function LowFollowersScreen({ navigation, route }: Props) {
  const { role, phone, name, followerCount } = route.params;

  const handleTryDifferentInstagram = () => {
    // Go back to Instagram connect to try a different account
    navigation.navigate('InstagramConnect', { role, phone, name });
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch {
      // ignore
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelect' }],
    });
  };

  const formattedCount = followerCount >= 1000
    ? `${(followerCount / 1000).toFixed(1).replace(/\.0$/, '')}k`
    : `${followerCount}`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>

        {/* Spacer to center content */}
        <View style={styles.spacerTop} />

        {/* Emoji */}
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>😐</Text>
        </View>

        {/* Message */}
        <Text style={styles.title}>
          The follower count is below CreatorNE's standard minimum.
        </Text>
        <Text style={styles.subtitle}>
          This Instagram account has less than {MIN_FOLLOWERS >= 1000 ? `${MIN_FOLLOWERS / 1000}k` : MIN_FOLLOWERS} followers
        </Text>

        {/* Action cards */}
        <View style={styles.cardsContainer}>
          {/* Try different Instagram */}
          <TouchableOpacity
            onPress={handleTryDifferentInstagram}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#fef2f2', '#fde8e8', '#fcdcdc']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <View style={styles.cardLeft}>
                <View style={styles.instagramBadge}>
                  <LinearGradient
                    colors={['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.instagramBadgeGradient}
                  >
                    <Text style={styles.instagramBadgeIcon}>📷</Text>
                  </LinearGradient>
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Try different Instagram</Text>
                  <Text style={styles.cardSubtitle}>
                    Min Followers: {MIN_FOLLOWERS >= 1000 ? `${MIN_FOLLOWERS / 1000},000` : MIN_FOLLOWERS}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Spacer bottom */}
        <View style={styles.spacerBottom} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: Colors.textPrimary,
  },
  logoutText: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    color: '#ef4444',
  },
  spacerTop: {
    flex: 1,
    minHeight: 60,
  },
  emojiContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.xxxl,
  },
  cardsContainer: {
    gap: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.1)',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  instagramBadge: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  instagramBadgeGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instagramBadgeIcon: {
    fontSize: 20,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
  },
  cardArrow: {
    fontSize: 18,
    color: Colors.textMuted,
    marginLeft: Spacing.sm,
  },
  spacerBottom: {
    flex: 1,
    minHeight: 40,
  },
});
