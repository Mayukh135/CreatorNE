// ============================================================
// CreatorNE App — Social Connect Screen (Step 2/3)
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
import { ProgressBar } from '../components/ProgressBar';
import { ProfilePreviewCard } from '../components/ProfilePreviewCard';
import { SocialProofBanner } from '../components/SocialProofBanner';
import { Colors, Fonts, Radius, Spacing } from '../lib/constants';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'SocialConnect'>;

export default function SocialConnectScreen({ navigation, route }: Props) {
  const { role, phone, name } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back + progress */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <ProgressBar currentStep={2} totalSteps={3} />
          </View>
        </View>

        {/* Profile preview card */}
        <ProfilePreviewCard name={name} />

        {/* Title */}
        <Text style={styles.title}>
          Add your main social for brand partnerships
        </Text>
        <Text style={styles.subtitle}>
          Start with what's strongest for brand partnerships. You can add more later.
        </Text>

        {/* Instagram card */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('InstagramConnect', { role, phone, name })
          }
          style={styles.socialCard}
        >
          <LinearGradient
            colors={['rgba(233, 30, 140, 0.06)', 'rgba(249, 148, 51, 0.06)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.socialCardGradient}
          >
            <View style={styles.socialCardContent}>
              <View style={styles.socialIcon}>
                <Text style={styles.socialIconText}>📷</Text>
              </View>
              <Text style={styles.socialName}>Instagram</Text>
            </View>
            <Text style={styles.socialArrow}>→</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* YouTube card (disabled / coming soon) */}
        <View style={[styles.socialCard, styles.socialCardDisabled]}>
          <View style={styles.socialCardGradient}>
            <View style={styles.socialCardContent}>
              <View style={[styles.socialIcon, styles.socialIconYoutube]}>
                <Text style={styles.socialIconText}>▶</Text>
              </View>
              <View>
                <Text style={[styles.socialName, styles.socialNameDisabled]}>YouTube</Text>
                <Text style={styles.comingSoon}>Coming soon</Text>
              </View>
            </View>
            <Text style={[styles.socialArrow, styles.socialArrowDisabled]}>→</Text>
          </View>
        </View>
      </ScrollView>

      {/* Social proof */}
      <SocialProofBanner
        text="FilmyFusions (15.8m followers) joined & added Instagram"
      />
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
    paddingTop: Spacing.lg,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  backArrow: {
    fontSize: 22,
    color: Colors.textPrimary,
  },
  progressContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    lineHeight: 30,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
    lineHeight: 22,
    marginBottom: Spacing.xxl,
  },
  socialCard: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(233, 30, 140, 0.15)',
  },
  socialCardDisabled: {
    borderColor: 'rgba(239, 68, 68, 0.15)',
    opacity: 0.5,
  },
  socialCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  socialCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(233, 30, 140, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconYoutube: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  socialIconText: {
    fontSize: 18,
  },
  socialName: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  socialNameDisabled: {
    color: Colors.textMuted,
  },
  comingSoon: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Colors.textLight,
    marginTop: 2,
  },
  socialArrow: {
    fontSize: 18,
    color: Colors.textPrimary,
  },
  socialArrowDisabled: {
    color: Colors.textLight,
  },
});
