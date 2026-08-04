import { NE_STATES, CREATOR_CATEGORIES } from "@/lib/constants";
import { creatorProfiles } from "@/lib/creator-data";

export interface DirectoryCreator {
  id: string;
  name: string;
  slug: string;
  photo: string | null;
  state: string;
  city: string;
  category: string;
  platform: string[];
  languages: string[];
  gender: string;
  followers: number;
  avgViews: number;
  engagementRate: number;
  isVerified: boolean;
  coverGradient: string;
  bio: string;
  tags: string[];
  profileHint: string;
}

export interface DirectoryCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  creatorCount: number;
}

const basePlatforms = ["Instagram", "YouTube", "Reels"];

export const directoryCreators: DirectoryCreator[] = creatorProfiles.map((creator, index) => {
  const platformSets = [
    ["Instagram", "YouTube", "Reels"],
    ["Instagram", "Reels", "Shorts"],
    ["YouTube", "Reels", "Facebook"],
    ["Instagram", "YouTube"],
  ];

  const genders = ["Female", "Male", "Female", "Male"];

  return {
    id: creator.id,
    name: creator.name,
    slug: creator.slug,
    photo: creator.photo,
    state: creator.state,
    city: creator.city,
    category: creator.category,
    platform: platformSets[index % platformSets.length],
    languages: creator.languages,
    gender: genders[index % genders.length],
    followers: creator.followers,
    avgViews: creator.avgViews,
    engagementRate: creator.engagementRate,
    isVerified: creator.isVerified,
    coverGradient: creator.coverImage,
    bio: creator.bio,
    tags: creator.portfolioMedia.slice(0, 3),
    profileHint: creator.tagline,
  };
});

export const directoryCategories: DirectoryCategory[] = CREATOR_CATEGORIES.map((category, index) => ({
  id: category.slug,
  name: category.name,
  slug: category.slug,
  icon: category.icon,
  creatorCount: [58, 41, 49, 37, 31, 44, 26, 24, 19, 22, 35, 17, 28, 16, 20, 14, 12, 21, 18][index] ?? 0,
}));

export const directoryStates = NE_STATES;

export const directoryPlatforms = basePlatforms;

export const directoryLanguages = ["English", "Hindi", "Assamese", "Nagamese", "Khasi", "Bengali", "Manipuri"];
