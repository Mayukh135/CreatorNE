// ============================================================
// CreatorNE App — Home Screen (Post-Auth Dashboard)
// ============================================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Radius, Spacing } from '../lib/constants';
import { signOut } from '../lib/supabase';
import { clearStorage } from '../lib/storage';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const handleSignOut = async () => {
    try {
      await signOut();
      await clearStorage();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    } catch {
      // Force navigation even if signout fails
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <Text style={styles.brandIconText}>⊕</Text>
            </View>
            <Text style={styles.brandName}>CreatorNE</Text>
          </View>
          <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
        </View>

        {/* Welcome card */}
        <LinearGradient
          colors={[Colors.primary600, Colors.primary700, '#4338ca']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.welcomeCard}
        >
          <View style={styles.welcomeDecor}>
            <Text style={styles.welcomeDecorText}>✦</Text>
          </View>
          <Text style={styles.welcomeTitle}>Welcome to CreatorNE!</Text>
          <Text style={styles.welcomeSubtitle}>
            Your profile is being set up. You'll be notified when it's ready for brand partnerships.
          </Text>
          <View style={styles.welcomeBadge}>
            <Text style={styles.welcomeBadgeText}>🎉 Onboarding complete</Text>
          </View>
        </LinearGradient>

        {/* Status cards */}
        <View style={styles.statusGrid}>
          <View style={styles.statusCard}>
            <Text style={styles.statusEmoji}>📱</Text>
            <Text style={styles.statusLabel}>Phone</Text>
            <Text style={styles.statusValue}>Verified</Text>
            <View style={styles.statusDot} />
          </View>
          <View style={styles.statusCard}>
            <Text style={styles.statusEmoji}>📷</Text>
            <Text style={styles.statusLabel}>Instagram</Text>
            <Text style={styles.statusValue}>Connected</Text>
            <View style={styles.statusDot} />
          </View>
          <View style={styles.statusCard}>
            <Text style={styles.statusEmoji}>✅</Text>
            <Text style={styles.statusLabel}>Profile</Text>
            <Text style={styles.statusValue}>Under review</Text>
            <View style={[styles.statusDot, styles.statusDotPending]} />
          </View>
        </View>

        {/* What's next section */}
        <Text style={styles.sectionTitle}>What's next</Text>

        <View style={styles.nextCard}>
          <View style={styles.nextCardIcon}>
            <Text style={{ fontSize: 20 }}>🔍</Text>
          </View>
          <View style={styles.nextCardContent}>
            <Text style={styles.nextCardTitle}>Profile Review</Text>
            <Text style={styles.nextCardDesc}>
              Our team will review your profile within 24-48 hours. You'll be notified once approved.
            </Text>
          </View>
        </View>

        <View style={styles.nextCard}>
          <View style={styles.nextCardIcon}>
            <Text style={{ fontSize: 20 }}>🤝</Text>
          </View>
          <View style={styles.nextCardContent}>
            <Text style={styles.nextCardTitle}>Brand Partnerships</Text>
            <Text style={styles.nextCardDesc}>
              Once approved, brands can discover you and send collaboration requests directly.
            </Text>
          </View>
        </View>

        <View style={styles.nextCard}>
          <View style={styles.nextCardIcon}>
            <Text style={{ fontSize: 20 }}>📊</Text>
          </View>
          <View style={styles.nextCardContent}>
            <Text style={styles.nextCardTitle}>Analytics Dashboard</Text>
            <Text style={styles.nextCardDesc}>
              Track your profile views, partnership requests, and engagement — coming soon.
            </Text>
          </View>
        </View>
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
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xxl,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandIconText: {
    fontSize: 16,
    color: '#ffffff',
  },
  brandName: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
  },
  signOutButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  signOutText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.textMuted,
  },
  welcomeCard: {
    borderRadius: Radius.xxl,
    padding: Spacing.xxl,
    marginBottom: Spacing.xxl,
    overflow: 'hidden',
  },
  welcomeDecor: {
    position: 'absolute',
    top: -10,
    right: 10,
    opacity: 0.15,
  },
  welcomeDecorText: {
    fontSize: 80,
    color: '#ffffff',
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: '#ffffff',
    marginBottom: Spacing.sm,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  welcomeBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    alignSelf: 'flex-start',
  },
  welcomeBadgeText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: '#ffffff',
  },
  statusGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xxxl,
  },
  statusCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  statusEmoji: {
    fontSize: 22,
    marginBottom: Spacing.sm,
  },
  statusLabel: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  statusDotPending: {
    backgroundColor: Colors.gold,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  nextCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: Spacing.md,
  },
  nextCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextCardContent: {
    flex: 1,
  },
  nextCardTitle: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  nextCardDesc: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
    lineHeight: 20,
  },
});
