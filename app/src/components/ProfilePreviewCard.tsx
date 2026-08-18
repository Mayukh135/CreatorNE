// ============================================================
// CreatorNE App — Profile Preview Card Component
// ============================================================

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Radius, Spacing } from '../lib/constants';

interface ProfilePreviewCardProps {
  name: string;
  instagramConnected?: boolean;
  instagramUsername?: string;
  profilePicture?: string;
}

export function ProfilePreviewCard({
  name,
  instagramConnected = false,
  instagramUsername,
  profilePicture,
}: ProfilePreviewCardProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary200, Colors.primary100, '#f3e8ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarPlaceholderText}>
                {name ? name[0].toUpperCase() : '?'}
              </Text>
            </View>
          )}
        </View>

        {/* Name */}
        <Text style={styles.name} numberOfLines={1}>
          {name || 'Your Name'}
        </Text>

        {/* Social badges */}
        <View style={styles.socialBadges}>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>📷</Text>
            <Text style={styles.badgeText}>
              {instagramConnected ? instagramUsername : '—'}
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>▶</Text>
            <Text style={styles.badgeText}>—</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.xxl,
    shadowColor: Colors.primary600,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  header: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  avatarPlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 22,
    fontFamily: Fonts.semiBold,
    color: Colors.primary700,
  },
  name: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  socialBadges: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeIcon: {
    fontSize: 12,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
  },
});
