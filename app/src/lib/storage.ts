// ============================================================
// CreatorNE App — AsyncStorage Helpers
// ============================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserRole } from '../types';

const KEYS = {
  ONBOARDING_COMPLETE: 'creatorne.onboarding-complete',
  USER_ROLE: 'creatorne.user-role',
  USER_NAME: 'creatorne.user-name',
  USER_PHONE: 'creatorne.user-phone',
} as const;

/** Check if onboarding is complete */
export async function isOnboardingComplete(): Promise<boolean> {
  const value = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETE);
  return value === 'true';
}

/** Mark onboarding as complete */
export async function setOnboardingComplete(): Promise<void> {
  await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETE, 'true');
}

/** Store the selected role */
export async function setUserRole(role: UserRole): Promise<void> {
  await AsyncStorage.setItem(KEYS.USER_ROLE, role);
}

/** Get the stored role */
export async function getUserRole(): Promise<UserRole | null> {
  const value = await AsyncStorage.getItem(KEYS.USER_ROLE);
  return value as UserRole | null;
}

/** Store user name */
export async function setUserName(name: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.USER_NAME, name);
}

/** Get stored user name */
export async function getUserName(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.USER_NAME);
}

/** Store phone number */
export async function setUserPhone(phone: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.USER_PHONE, phone);
}

/** Get stored phone number */
export async function getUserPhone(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.USER_PHONE);
}

/** Clear all stored data (logout) */
export async function clearStorage(): Promise<void> {
  await AsyncStorage.multiRemove(Object.values(KEYS));
}
