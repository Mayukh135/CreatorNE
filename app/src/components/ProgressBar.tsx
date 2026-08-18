// ============================================================
// CreatorNE App — Progress Bar Component
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '../lib/constants';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dots}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index < currentStep ? styles.dotActive : null,
              index === currentStep - 1 ? styles.dotCurrent : null,
            ]}
          />
        ))}
      </View>
      <Text style={styles.label}>
        {currentStep}/{totalSteps}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.textPrimary,
  },
  dotCurrent: {
    width: 32,
    backgroundColor: Colors.textPrimary,
  },
  label: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.textMuted,
  },
});
