// ============================================================
// CreatorNE App — Name Entry Screen (Step 1/3)
// ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import { Colors, Fonts, Radius, Spacing } from '../lib/constants';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'NameEntry'>;

export default function NameEntryScreen({ navigation, route }: Props) {
  const { role, phone } = route.params;
  const [name, setName] = useState('');

  const isValid = name.trim().length >= 2 && !/[^\w\s.\-']/u.test(name.replace(/[A-Za-z\s.\-']/g, ''));
  const hasEmoji = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(name);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
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
              <ProgressBar currentStep={1} totalSteps={3} />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Enter your name</Text>
          <Text style={styles.subtitle}>
            This is how your profile will appear to brands on CreatorNE.
          </Text>

          {/* Name input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ex: Madan Gowri"
              placeholderTextColor={Colors.textLight}
              autoFocus
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          {/* Hint */}
          <View style={styles.hintRow}>
            <Text style={styles.hintIcon}>ⓘ</Text>
            <Text style={[styles.hintText, hasEmoji && styles.hintError]}>
              Avoid emojis, symbols, or unclear names. Keep it clean & easy to find.
            </Text>
          </View>

          {/* Continue button */}
          <Button
            title="Continue to social verification"
            onPress={() =>
              navigation.navigate('SocialConnect', {
                role,
                phone,
                name: name.trim(),
              })
            }
            disabled={!isValid || hasEmoji}
            variant={isValid && !hasEmoji ? 'primary' : 'outline'}
            textStyle={!isValid || hasEmoji ? { color: Colors.textLight } : undefined}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
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
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
    lineHeight: 22,
    marginBottom: Spacing.xxl,
  },
  inputContainer: {
    height: 56,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  input: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  hintRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xxl,
    paddingRight: Spacing.xl,
  },
  hintIcon: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 2,
  },
  hintText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  hintError: {
    color: '#ef4444',
  },
});
