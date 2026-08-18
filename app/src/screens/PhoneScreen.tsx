// ============================================================
// CreatorNE App — Phone Entry Screen
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
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Colors, Fonts, Radius, Spacing, PHONE_PREFIX } from '../lib/constants';
import { sendPhoneOtp } from '../lib/supabase';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Phone'>;

export default function PhoneScreen({ navigation, route }: Props) {
  const { role } = route.params;
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const roleLabel = role === 'CREATOR' ? 'Creator' : 'Brand';
  const fullPhone = `${PHONE_PREFIX}${phone.replace(/\D/g, '')}`;
  const isValid = phone.replace(/\D/g, '').length === 10;

  const handleGetOtp = async () => {
    if (!isValid) return;

    setLoading(true);
    try {
      await sendPhoneOtp(fullPhone);
      navigation.navigate('Otp', { role, phone: fullPhone });
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'Failed to send OTP. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeIcon}>▶</Text>
              <Text style={styles.roleBadgeText}>Signing as {roleLabel}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Add your mobile number</Text>

          {/* Tags */}
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagIcon}>👥</Text>
              <Text style={styles.tagText}>Direct connections</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagIcon}>✓</Text>
              <Text style={styles.tagText}>Verified brands</Text>
            </View>
          </View>

          {/* Phone input */}
          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>{PHONE_PREFIX}</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={(text) => setPhone(text.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter your number"
              placeholderTextColor={Colors.textLight}
              keyboardType="phone-pad"
              maxLength={10}
              autoFocus
            />
          </View>

          {/* Info text */}
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>ⓘ</Text>
            <Text style={styles.infoText}>
              Use your own number. If you have a manager, you can add them later for managing brand calls and queries.
            </Text>
          </View>

          {/* Get OTP button */}
          <Button
            title="Get OTP"
            onPress={handleGetOtp}
            loading={loading}
            disabled={!isValid}
            style={isValid ? styles.otpButton : [styles.otpButton, styles.otpButtonDisabled]}
            textStyle={!isValid ? styles.otpButtonTextDisabled : undefined}
            variant={isValid ? 'primary' : 'outline'}
          />

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Terms */}
          <View style={styles.terms}>
            <Text style={styles.termsText}>
              By continuing, you accept{' '}
              <Text style={styles.termsLink}>terms of service</Text>
              {' '}&{' '}
            </Text>
            <Text style={styles.termsLink}>privacy policy</Text>
          </View>
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
  },
  backArrow: {
    fontSize: 22,
    color: Colors.textPrimary,
  },
  roleBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginRight: 36, // balance the back button
  },
  roleBadgeIcon: {
    fontSize: 10,
    color: Colors.primary600,
    backgroundColor: Colors.primary100,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
    borderRadius: 4,
    overflow: 'hidden',
  },
  roleBadgeText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  tags: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagIcon: {
    fontSize: 14,
    color: Colors.primary600,
  },
  tagText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.primary700,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  prefix: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  infoRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xxl,
    paddingRight: Spacing.xl,
  },
  infoIcon: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  otpButton: {
    marginBottom: Spacing.xxl,
  },
  otpButtonDisabled: {
    borderColor: Colors.border,
  },
  otpButtonTextDisabled: {
    color: Colors.textLight,
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  terms: {
    alignItems: 'center',
    paddingBottom: Spacing.xxl,
  },
  termsText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  termsLink: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
    textDecorationLine: 'underline',
  },
});
