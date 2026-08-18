// ============================================================
// CreatorNE App — Instagram API Helper (Placeholder)
// ============================================================

import { AppConfig } from './constants';
import type { InstagramProfile } from '../types';

/**
 * Build the Instagram OAuth authorization URL.
 * Opens in an in-app browser for the user to authorize.
 */
export function getInstagramAuthUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: AppConfig.instagramAppId,
    redirect_uri: redirectUri,
    scope: 'user_profile,user_media',
    response_type: 'code',
  });

  return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
}

/**
 * Exchange an Instagram authorization code for profile data.
 * Calls our Next.js backend which handles the token exchange securely.
 *
 * @param code - The authorization code from Instagram OAuth redirect
 * @param accessToken - The Supabase access token for authentication
 */
export async function exchangeInstagramCode(
  code: string,
  accessToken: string
): Promise<InstagramProfile> {
  const response = await fetch(`${AppConfig.apiUrl}/api/app/instagram`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Failed to connect Instagram');
  }

  return response.json();
}

/**
 * Placeholder: returns mock Instagram data for development.
 * Remove this once real Instagram API credentials are configured.
 */
export function getMockInstagramProfile(): InstagramProfile {
  return {
    username: 'your_username',
    profilePicture: 'https://via.placeholder.com/150',
    followersCount: 0,
  };
}
