// ============================================================
// CreatorNE — App Constants
// ============================================================

/** 8 Northeast Indian states */
export const NE_STATES = [
  "Assam",
  "Arunachal Pradesh",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Sikkim",
  "Tripura",
] as const;

export type NEState = (typeof NE_STATES)[number];

/** 19 creator categories with Lucide icon names */
export const CREATOR_CATEGORIES = [
  { name: "Travel", slug: "travel", icon: "Plane" },
  { name: "Food", slug: "food", icon: "UtensilsCrossed" },
  { name: "Lifestyle", slug: "lifestyle", icon: "Heart" },
  { name: "Fashion & Beauty", slug: "fashion-beauty", icon: "Shirt" },
  { name: "Photography", slug: "photography", icon: "Camera" },
  { name: "Cinematography", slug: "cinematography", icon: "Film" },
  { name: "Tech", slug: "tech", icon: "Cpu" },
  { name: "Comedy", slug: "comedy", icon: "Laugh" },
  { name: "Fitness", slug: "fitness", icon: "Dumbbell" },
  { name: "Music", slug: "music", icon: "Music" },
  { name: "Culture", slug: "culture", icon: "Globe" },
  { name: "Education", slug: "education", icon: "GraduationCap" },
  { name: "Finance", slug: "finance", icon: "TrendingUp" },
  { name: "Gaming", slug: "gaming", icon: "Gamepad2" },
  { name: "Art", slug: "art", icon: "Palette" },
  { name: "Wildlife", slug: "wildlife", icon: "Bird" },
  { name: "Adventure", slug: "adventure", icon: "Mountain" },
  { name: "Business", slug: "business", icon: "Briefcase" },
  { name: "Others", slug: "others", icon: "MoreHorizontal" },
] as const;

/** Main navigation links */
export const NAV_LINKS = [
  { label: "Creators", href: "/find-creators" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
] as const;

/** Footer navigation groups */
export const FOOTER_LINKS = {
  platform: [
    { label: "Creators", href: "/find-creators" },
    { label: "Categories", href: "/categories" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "For Brands", href: "/register?type=brand" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
  resources: [
    { label: "Help Center", href: "/help" },
    { label: "FAQs", href: "/#faq" },
    { label: "Creator Guide", href: "/creator-guide" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;

/** Social media links */
export const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://instagram.com/creatorne", icon: "Instagram" },
  { name: "YouTube", href: "https://youtube.com/@creatorne", icon: "Youtube" },
  { name: "Twitter", href: "https://twitter.com/creatorne", icon: "Twitter" },
  { name: "Telegram", href: "https://t.me/creatorne", icon: "Send" },
  { name: "LinkedIn", href: "https://linkedin.com/company/creatorne", icon: "Linkedin" },
] as const;

/** Framer Motion spring presets */
export const SPRING = {
  snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
  smooth: { type: "spring" as const, stiffness: 200, damping: 20 },
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
  morph: { type: "spring" as const, stiffness: 300, damping: 25 },
} as const;

/** App metadata */
export const APP_CONFIG = {
  name: "CreatorNE",
  tagline: "Create. Connect. Grow.",
  description:
    "The largest Creator Discovery & Brand Collaboration Platform for Northeast India. Discover verified creators, launch campaigns, and grow together.",
  domain: "creatorne.in",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://creatorne.in",
} as const;
