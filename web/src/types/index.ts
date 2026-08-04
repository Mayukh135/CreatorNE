import type { UserRole, UserStatus } from "@prisma/client";

// ============================================================
// API Response types
// ============================================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// ============================================================
// User & Profile types (for client-side use)
// ============================================================

export interface UserPublic {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface CreatorPublic {
  id: string;
  name: string;
  slug: string;
  photo: string | null;
  state: string;
  city: string;
  category: string;
  languages: string[];
  followers: number;
  avgViews: number;
  engagementRate: number;
  bio: string | null;
  socialLinks: Record<string, string>;
  portfolioMedia: string[];
  previousCollabs: string[];
  isVerified: boolean;
  isFeatured: boolean;
}

export interface BrandPublic {
  id: string;
  brandName: string;
  slug: string;
  contactPerson: string;
  logo: string | null;
  website: string | null;
  industry: string | null;
  campaignGoal: string | null;
  targetState: string | null;
  isFeatured: boolean;
}

// ============================================================
// Homepage data types
// ============================================================

export interface HomeStat {
  key: string;
  value: string;
  label: string;
}

export interface HomeTestimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string | null;
}

export interface HomeCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  creatorCount: number;
}

// ============================================================
// Messaging types
// ============================================================

export interface ConversationPreview {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string | null;
    role: UserRole;
  };
  lastMessage: {
    content: string;
    createdAt: string;
    senderId: string;
  } | null;
  unreadCount: number;
}

export interface MessageItem {
  id: string;
  content: string;
  senderId: string;
  readAt: string | null;
  createdAt: string;
}
