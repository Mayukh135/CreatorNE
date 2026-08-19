// ============================================================
// CreatorNE App — TypeScript Types
// ============================================================

/** User role */
export type UserRole = 'CREATOR' | 'BRAND';

/** Onboarding step names */
export type OnboardingStep =
  | 'splash'
  | 'role-select'
  | 'phone-entry'
  | 'otp-verify'
  | 'name-entry'
  | 'social-connect'
  | 'instagram-connect'
  | 'low-followers'
  | 'complete';

/** Navigation stack param list */
export type RootStackParamList = {
  Splash: undefined;
  RoleSelect: undefined;
  Phone: { role: UserRole };
  Otp: { role: UserRole; phone: string };
  NameEntry: { role: UserRole; phone: string };
  SocialConnect: { role: UserRole; phone: string; name: string };
  InstagramConnect: { role: UserRole; phone: string; name: string };
  LowFollowers: { role: UserRole; phone: string; name: string; followerCount: number };
  Home: undefined;
};

/** Instagram profile data returned from API */
export interface InstagramProfile {
  username: string;
  profilePicture: string;
  followersCount: number;
}

/** User profile returned from /api/app/user/me */
export interface UserProfile {
  id: string;
  phone: string;
  role: UserRole;
  name: string;
  slug: string;
  photo?: string;
  socialLinks: Record<string, string>;
  followers: number;
  instagram?: InstagramProfile;
}

/** API response for /api/app/user/me */
export interface MeResponse {
  exists: boolean;
  profile?: UserProfile;
}

/** API response for /api/app/onboard */
export interface OnboardResponse {
  success: boolean;
  profile: UserProfile;
}
