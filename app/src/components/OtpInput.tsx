// ============================================================
// CreatorNE App — OTP Input Component
// ============================================================

import React, { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors, Fonts, Radius, Spacing, OTP_LENGTH } from '../lib/constants';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete: (code: string) => void;
}

export function OtpInput({ value, onChange, onComplete }: OtpInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const digits = value.split('').concat(Array(OTP_LENGTH - value.length).fill(''));

  useEffect(() => {
    // Auto-focus the first empty input
    const nextIndex = value.length;
    if (nextIndex < OTP_LENGTH) {
      inputRefs.current[nextIndex]?.focus();
    }
  }, [value]);

  const handleChange = (text: string, index: number) => {
    // Handle paste of full OTP
    if (text.length > 1) {
      const cleanText = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
      onChange(cleanText);
      if (cleanText.length === OTP_LENGTH) {
        onComplete(cleanText);
      }
      return;
    }

    const newValue = digits.slice(0, index).join('') + text + digits.slice(index + 1).join('');
    const clean = newValue.replace(/\D/g, '').slice(0, OTP_LENGTH);
    onChange(clean);

    // Auto-advance to next input
    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (clean.length === OTP_LENGTH) {
      onComplete(clean);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newValue = digits.slice(0, index - 1).join('') + '' + digits.slice(index).join('');
      onChange(newValue.replace(/\D/g, ''));
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: OTP_LENGTH }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={[
            styles.input,
            digits[index] ? styles.inputFilled : null,
          ]}
          value={digits[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          selectTextOnFocus
          accessibilityLabel={`Digit ${index + 1} of ${OTP_LENGTH}`}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginVertical: Spacing.xl,
  },
  input: {
    width: 48,
    height: 56,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    fontSize: 22,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  inputFilled: {
    borderColor: Colors.primary600,
    backgroundColor: Colors.primary50,
  },
});
