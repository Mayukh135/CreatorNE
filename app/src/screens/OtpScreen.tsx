// ============================================================
// CreatorNE App — OTP Verification Screen
// ============================================================

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OtpInput } from '../components/OtpInput';
import { Button } from '../components/Button';
import { Colors, Fonts, Spacing, OTP_RESEND_COOLDOWN, AppConfig } from '../lib/constants';
import { verifyPhoneOtp, sendPhoneOtp, getSession } from '../lib/supabase';
import type { RootStackParamList, MeResponse } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export default function OtpScreen({ navigation, route }: Props) {
  const { role, phone } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(OTP_RESEND_COOLDOWN);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Check if user has an existing profile
  const checkExistingProfile = useCallback(async (accessToken: string): Promise<boolean> => {
    try {
      const response = await fetch(`${AppConfig.apiUrl}/api/app/user/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) return false;

      const data: MeResponse = await response.json();
      return data.exists;
    } catch {
      return false;
    }
  }, []);

  const handleVerify = useCallback(async (code: string) => {
    setLoading(true);
    try {
      await verifyPhoneOtp(phone, code);
      const session = await getSession();

      if (session) {
        // Check if user already has a profile (returning user)
        const hasProfile = await checkExistingProfile(session.access_token);

        if (hasProfile) {
          // Returning user — skip onboarding, go to home
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } else {
          // New user — continue onboarding
          navigation.navigate('NameEntry', { role, phone });
        }
      } else {
        // Fallback: go to name entry for new user flow
        navigation.navigate('NameEntry', { role, phone });
      }
    } catch (error: any) {
      Alert.alert(
        'Verification Failed',
        error.message || 'Invalid OTP. Please try again.',
        [{ text: 'OK' }]
      );
      setOtp('');
    } finally {
      setLoading(false);
    }
  }, [phone, role, navigation, checkExistingProfile]);

  const handleResend = async () => {
    try {
      await sendPhoneOtp(phone);
      setResendCooldown(OTP_RESEND_COOLDOWN);
      Alert.alert('OTP Sent', 'A new OTP has been sent to your number.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend OTP.');
    }
  };

  // Format phone for display
  const displayPhone = phone.replace('+91', '+91 ');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
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

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Verify your number</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to{'\n'}
            <Text style={styles.phoneText}>{displayPhone}</Text>
          </Text>

          {/* OTP Input */}
          <OtpInput
            value={otp}
            onChange={setOtp}
            onComplete={handleVerify}
          />

          {/* Verify button */}
          <Button
            title="Verify & Continue"
            onPress={() => handleVerify(otp)}
            loading={loading}
            disabled={otp.length < 6}
          />

          {/* Resend */}
          <View style={styles.resendContainer}>
            {resendCooldown > 0 ? (
              <Text style={styles.resendText}>
                Resend OTP in{' '}
                <Text style={styles.resendTimer}>{resendCooldown}s</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
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
  content: {
    paddingHorizontal: Spacing.xl,
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
  },
  phoneText: {
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  resendText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.textMuted,
  },
  resendTimer: {
    fontFamily: Fonts.semiBold,
    color: Colors.primary600,
  },
  resendLink: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.primary600,
  },
});
