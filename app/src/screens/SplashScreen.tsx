// ============================================================
// CreatorNE App — Splash Screen
// ============================================================

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Spacing, SPLASH_DELAY } from '../lib/constants';
import { useAuth } from '../hooks/useAuth';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }: Props) {
  const { isLoading, isAuthenticated, hasProfile } = useAuth();
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const statsOpacity = useRef(new Animated.Value(0)).current;

  // Animate in
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(statsOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoScale, logoOpacity, textOpacity, statsOpacity]);

  // Navigate after delay + auth check
  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      if (isAuthenticated && hasProfile) {
        navigation.replace('Home');
      } else {
        navigation.replace('RoleSelect');
      }
    }, SPLASH_DELAY);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, hasProfile, navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.surface, Colors.background, Colors.primary50]}
        style={styles.gradient}
      >
        {/* Decorative V shape */}
        <Animated.View
          style={[
            styles.decorativeV,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Text style={styles.vText}>✦</Text>
        </Animated.View>

        {/* Logo area */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.logoMark}>
            <Text style={styles.logoLetter}>C</Text>
          </View>
        </Animated.View>

        {/* Stats bubble */}
        <Animated.View style={[styles.statsContainer, { opacity: statsOpacity }]}>
          <View style={styles.statsBubble}>
            <View style={styles.statsAvatars}>
              {['🟣', '🔵', '🟢', '🟡', '🟠'].map((emoji, i) => (
                <View
                  key={i}
                  style={[styles.statsAvatar, { marginLeft: i > 0 ? -8 : 0 }]}
                >
                  <Text style={{ fontSize: 14 }}>{emoji}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.statsText}>in last 7 days</Text>
          </View>
        </Animated.View>

        {/* Bottom branding */}
        <Animated.View style={[styles.bottomBranding, { opacity: textOpacity }]}>
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <Text style={styles.brandIconText}>⊕</Text>
            </View>
            <Text style={styles.brandName}>creatorne</Text>
          </View>

          <View style={styles.taglineContainer}>
            <Text style={styles.taglineText}>The </Text>
            <Text style={[styles.taglineText, styles.taglineAccent]}>Exclusive</Text>
            <Text style={styles.taglinePlus}>+</Text>
          </View>
          <Text style={styles.taglineMain}>
            Brand <Text style={styles.taglineX}>×</Text> Creator
          </Text>
          <Text style={styles.taglineMain}>Professional Network.</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 60,
    paddingHorizontal: Spacing.xl,
  },
  decorativeV: {
    marginBottom: 20,
  },
  vText: {
    fontSize: 60,
    color: Colors.primary300,
    opacity: 0.4,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoMark: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.primary600,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary600,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoLetter: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: '#ffffff',
  },
  statsContainer: {
    alignItems: 'center',
  },
  statsBubble: {
    alignItems: 'center',
    gap: 8,
  },
  statsAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  statsText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
  },
  bottomBranding: {
    width: '100%',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.lg,
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
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  taglineText: {
    fontSize: 20,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
  },
  taglineAccent: {
    color: Colors.primary600,
    fontFamily: Fonts.medium,
  },
  taglinePlus: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.primary600,
    marginTop: -2,
  },
  taglineMain: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    lineHeight: 36,
  },
  taglineX: {
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
  },
});
