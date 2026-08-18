// ============================================================
// CreatorNE App — Design Constants
// ============================================================

/** Color palette — matches the website design system */
export const Colors = {
  // Primary (violet)
  primary50: '#f5f3ff',
  primary100: '#ede9fe',
  primary200: '#ddd6fe',
  primary300: '#c4b5fd',
  primary400: '#a78bfa',
  primary500: '#8b5cf6',
  primary600: '#7c3aed',
  primary700: '#6d28d9',
  primary800: '#5b21b6',
  primary900: '#4c1d95',

  // Secondary
  secondary: '#3b82f6',
  secondaryLight: '#60a5fa',

  // Accent
  accentPink: '#e91e8c',
  accentCyan: '#06b6d4',

  // Status
  success: '#10b981',
  gold: '#fbbf24',

  // Backgrounds
  background: '#f8fafc',
  surface: '#ffffff',

  // Text
  textPrimary: '#1e293b',
  textSecondary: '#475569',
  textMuted: '#64748b',
  textLight: '#94a3b8',

  // Borders
  border: '#e2e8f0',
  borderLight: '#f1f5f9',

  // Instagram
  instagramGradientStart: '#f09433',
  instagramGradientMid: '#e6683c',
  instagramGradientEnd: '#dc2743',
  instagramPurple: '#cc2366',
  instagramBlue: '#bc1888',
} as const;

/** Font families */
export const Fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

/** Spacing scale */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
} as const;

/** Border radius */
export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  full: 9999,
} as const;

/** App configuration */
export const AppConfig = {
  name: 'CreatorNE',
  tagline: 'Create. Connect. Grow.',
  description: 'The largest Creator Discovery & Brand Collaboration Platform for Northeast India.',
  // Replace with your actual API URL
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key',
  instagramAppId: process.env.EXPO_PUBLIC_INSTAGRAM_APP_ID || 'your-instagram-app-id',
} as const;

/** Phone country code */
export const PHONE_PREFIX = '+91';

/** OTP length */
export const OTP_LENGTH = 6;

/** Splash auto-advance delay (ms) */
export const SPLASH_DELAY = 2500;

/** OTP resend cooldown (seconds) */
export const OTP_RESEND_COOLDOWN = 30;
