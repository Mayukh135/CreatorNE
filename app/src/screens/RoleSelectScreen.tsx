// ============================================================
// CreatorNE App — Role Select Screen
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoleCard } from '../components/RoleCard';
import { Colors, Fonts, Spacing } from '../lib/constants';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'RoleSelect'>;

export default function RoleSelectScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand header */}
        <View style={styles.header}>
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
        </View>

        {/* Role cards */}
        <View style={styles.cardsRow}>
          <RoleCard
            type="creator"
            onPress={() => navigation.navigate('Phone', { role: 'CREATOR' })}
          />
          <RoleCard
            type="brand"
            onPress={() => navigation.navigate('Phone', { role: 'BRAND' })}
          />
        </View>

        {/* Bottom badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeG}>G</Text>
          <Text style={[styles.badgeO, { color: '#ea4335' }]}>o</Text>
          <Text style={[styles.badgeO, { color: '#fbbc05' }]}>o</Text>
          <Text style={styles.badgeG}>g</Text>
          <Text style={[styles.badgeO, { color: '#ea4335' }]}>l</Text>
          <Text style={[styles.badgeO, { color: '#34a853' }]}>e</Text>
          <Text style={styles.badgeFor}> for Startups</Text>
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
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xxxxl,
  },
  header: {
    marginBottom: Spacing.xxl,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.xxl,
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
  cardsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xxxxl,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeG: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#4285f4',
  },
  badgeO: {
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
  badgeFor: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
  },
});
