// ============================================================
// CreatorNE App — Role Card Component
// ============================================================

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Radius, Spacing } from '../lib/constants';

interface RoleCardProps {
  type: 'creator' | 'brand';
  onPress: () => void;
}

export function RoleCard({ type, onPress }: RoleCardProps) {
  const isCreator = type === 'creator';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.container}
    >
      <LinearGradient
        colors={
          isCreator
            ? ['#fef9ef', '#fdf2d8', '#fcecc2']
            : ['#eff6ff', '#dbeafe', '#bfdbfe']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Icon placeholder area */}
        <View style={[styles.iconArea, isCreator ? styles.iconCreator : styles.iconBrand]}>
          <Text style={styles.iconEmoji}>
            {isCreator ? '🎬' : '💼'}
          </Text>
        </View>

        {/* Card content */}
        <View style={styles.content}>
          <Text style={styles.title}>
            I'm a {isCreator ? 'Creator.' : 'Brand.'}
          </Text>
          <Text style={styles.description}>
            {isCreator
              ? 'Connect with brands, directly.'
              : 'Creators, talent, celebs... in your reach.'}
          </Text>
          <Text style={[styles.tagline, isCreator ? styles.taglineCreator : styles.taglineBrand]}>
            {isCreator ? 'No fee. No cut.' : 'Connect directly. Zero cost.'}
          </Text>
        </View>

        {/* Arrow */}
        <View style={styles.footer}>
          <View style={styles.typeIcon}>
            <Text style={{ fontSize: 14 }}>{isCreator ? '▶' : '📧'}</Text>
          </View>
          <View style={styles.arrow}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  gradient: {
    padding: Spacing.lg,
    minHeight: 220,
    justifyContent: 'space-between',
  },
  iconArea: {
    width: '100%',
    height: 80,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  iconCreator: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
  },
  iconBrand: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  iconEmoji: {
    fontSize: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 17,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    marginBottom: Spacing.md,
  },
  taglineCreator: {
    color: Colors.primary600,
  },
  taglineBrand: {
    color: Colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
});
