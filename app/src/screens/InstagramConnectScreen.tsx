// ============================================================
// CreatorNE App — Instagram Connect Screen
// ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/Button';
import { SocialProofBanner } from '../components/SocialProofBanner';
import { Colors, Fonts, Radius, Spacing, AppConfig, MIN_FOLLOWERS } from '../lib/constants';
import { getInstagramAuthUrl, getMockInstagramProfile } from '../lib/instagram';
import { getSession } from '../lib/supabase';
import { setOnboardingComplete } from '../lib/storage';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'InstagramConnect'>;

export default function InstagramConnectScreen({ navigation, route }: Props) {
  const { role, phone, name } = route.params;
  const [loading, setLoading] = useState(false);

  const handleInstagramDM = () => {
    Alert.alert(
      'Coming Soon',
      'Instagram DM verification will be available soon. Please use the Instagram login method for now.',
      [{ text: 'OK' }]
    );
  };

  const handleInstagramLogin = async () => {
    setLoading(true);
    try {
      // Build the redirect URI for Instagram OAuth
      const redirectUri = `${AppConfig.apiUrl}/api/app/instagram/callback`;
      const authUrl = getInstagramAuthUrl(redirectUri);

      // Open Instagram OAuth in browser
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

      if (result.type === 'success' && result.url) {
        // Extract authorization code from the redirect URL
        const url = new URL(result.url);
        const code = url.searchParams.get('code');

        if (code) {
          // Exchange the code for profile data via our backend
          const session = await getSession();

          if (session) {
            const response = await fetch(
              `${AppConfig.apiUrl}/api/app/instagram`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ code, redirectUri }),
              }
            );

            if (response.ok) {
              const profileData = await response.json();

              // Check follower count for creators
              if (role === 'CREATOR' && profileData?.followersCount < MIN_FOLLOWERS) {
                navigation.navigate('LowFollowers', {
                  role,
                  phone,
                  name,
                  followerCount: profileData.followersCount || 0,
                });
                return;
              }

              await completeOnboarding();
              return;
            }
          }
        }
      }

      // If OAuth didn't work (likely because credentials aren't set up yet),
      // use mock data and complete onboarding
      Alert.alert(
        'Instagram Setup Required',
        'Instagram API credentials are not configured yet. Completing onboarding with placeholder data.',
        [
          {
            text: 'Continue',
            onPress: async () => {
              const _mockProfile = getMockInstagramProfile();
              await completeOnboarding();
            },
          },
        ]
      );
    } catch (error: any) {
      // Instagram credentials not configured — use placeholder flow
      Alert.alert(
        'Instagram Setup Required',
        'Instagram API credentials are not configured yet. Completing onboarding with placeholder data.',
        [
          {
            text: 'Continue',
            onPress: async () => {
              await completeOnboarding();
            },
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      const session = await getSession();

      // Call onboard API to create profile
      if (session) {
        await fetch(`${AppConfig.apiUrl}/api/app/onboard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            phone,
            name,
            role,
          }),
        });
      }

      await setOnboardingComplete();

      // Navigate to home, clearing the stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch {
      // Even if API fails, move to home — profile can be synced later
      await setOnboardingComplete();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
  };

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
        </View>

        {/* Instagram icon */}
        <View style={styles.instagramIconContainer}>
          <LinearGradient
            colors={['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.instagramIcon}
          >
            <Text style={styles.instagramIconText}>📷</Text>
          </LinearGradient>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Add your Instagram to CreatorNE
        </Text>
        <Text style={styles.subtitle}>
          Choose how you'd like to continue. We never see or store your password.
        </Text>

        {/* Divider line */}
        <View style={styles.dividerLine} />

        {/* DM Method */}
        <View style={styles.methodSection}>
          <Text style={styles.methodTitle}>DM Method</Text>
          <Text style={styles.methodDesc}>No login needed.</Text>
        </View>

        <Button
          title="Continue via Instagram DM"
          onPress={handleInstagramDM}
          variant="primary"
          style={styles.dmButton}
        />

        {/* OR divider */}
        <View style={styles.orDivider}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orLine} />
        </View>

        {/* Faster Method */}
        <View style={styles.methodSection}>
          <View style={styles.fasterHeader}>
            <View>
              <Text style={styles.methodTitle}>Faster Method</Text>
              <Text style={styles.methodDesc}>Takes less than a minute.</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.safeLink}>Is this safe?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Meta approved badge */}
        <View style={styles.metaBadge}>
          <Text style={styles.metaBadgeIcon}>✓</Text>
          <Text style={styles.metaBadgeText}>Approved by </Text>
          <Text style={styles.metaLogo}>∞ Meta</Text>
        </View>

        {/* Instagram Login button */}
        <Button
          title="Continue via Instagram login"
          onPress={handleInstagramLogin}
          loading={loading}
          variant="outline"
          icon={<Text style={{ fontSize: 16 }}>📷</Text>}
          style={styles.loginButton}
          textStyle={styles.loginButtonText}
        />

        {/* Skip option */}
        <TouchableOpacity
          onPress={handleSkip}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsBubble}>
            <Text style={styles.statsText}>
              3095 verified their Instagram recently
            </Text>
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
  },
  backArrow: {
    fontSize: 22,
    color: Colors.textPrimary,
  },
  instagramIconContainer: {
    marginBottom: Spacing.xl,
  },
  instagramIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instagramIconText: {
    fontSize: 22,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    lineHeight: 32,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  dividerLine: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Spacing.xxl,
  },
  methodSection: {
    marginBottom: Spacing.md,
  },
  methodTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  methodDesc: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
  },
  dmButton: {
    marginBottom: Spacing.xl,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  orText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
  },
  fasterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  safeLink: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
    textDecorationLine: 'underline',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.primary50,
    borderRadius: Radius.sm,
    alignSelf: 'flex-start',
  },
  metaBadgeIcon: {
    fontSize: 12,
    color: Colors.success,
  },
  metaBadgeText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.textSecondary,
  },
  metaLogo: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.secondary,
  },
  loginButton: {
    marginBottom: Spacing.lg,
  },
  loginButtonText: {
    color: Colors.primary600,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  skipText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textMuted,
    textDecorationLine: 'underline',
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  statsBubble: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.borderLight,
    borderRadius: Radius.full,
  },
  statsText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
  },
});
