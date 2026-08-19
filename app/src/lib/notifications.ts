// ============================================================
// CreatorNE App — Push Notifications
// ============================================================

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { AppConfig } from './constants';
import { getSession } from './supabase';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Request push notification permissions and register the push token
 * with our backend. Call this on app launch after authentication.
 */
export async function registerForPushNotifications(): Promise<string | null> {
  try {
    // Check existing permissions
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    // Request permission if not already granted
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('[notifications] Permission not granted');
      return null;
    }

    // Get the Expo push token
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: AppConfig.expoProjectId,
    });

    const pushToken = tokenData.data;
    console.log('[notifications] Push token:', pushToken);

    // Register the token with our backend
    await sendPushTokenToBackend(pushToken);

    // Android-specific notification channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'CreatorNE',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#7c3aed',
      });
    }

    return pushToken;
  } catch (error) {
    console.error('[notifications] Registration failed:', error);
    return null;
  }
}

/**
 * Send the push token to the backend for storage.
 */
async function sendPushTokenToBackend(pushToken: string): Promise<void> {
  try {
    const session = await getSession();
    if (!session) return;

    await fetch(`${AppConfig.apiUrl}/api/app/push-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ token: pushToken }),
    });
  } catch (error) {
    console.error('[notifications] Failed to send token to backend:', error);
  }
}

/**
 * Remove the push token from the backend (call on logout).
 */
export async function unregisterPushNotifications(): Promise<void> {
  try {
    const session = await getSession();
    if (!session) return;

    await fetch(`${AppConfig.apiUrl}/api/app/push-token`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
  } catch (error) {
    console.error('[notifications] Failed to unregister token:', error);
  }
}

/**
 * Add a listener for incoming notifications while app is foregrounded.
 */
export function addNotificationReceivedListener(
  callback: (notification: Notifications.Notification) => void
) {
  return Notifications.addNotificationReceivedListener(callback);
}

/**
 * Add a listener for when user taps a notification.
 */
export function addNotificationResponseListener(
  callback: (response: Notifications.NotificationResponse) => void
) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}
