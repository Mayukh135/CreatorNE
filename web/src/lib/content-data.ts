import { APP_CONFIG, NE_STATES } from "@/lib/constants";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  tags: string[];
  author: string;
  publishedAt: string;
  readTimeMinutes: number;
}

export const aboutMilestones = [
  {
    year: "2024",
    title: "Idea to Blueprint",
    description:
      "CreatorNE started as a response to fragmented creator discovery in Northeast India.",
  },
  {
    year: "2025",
    title: "Platform Foundation",
    description:
      "Core flows for discovery, role-based dashboards, and messaging were designed and shipped.",
  },
  {
    year: "Next",
    title: "Campaign Scale",
    description:
      "Campaign workflows, matching signals, and data-backed creator-brand collaboration are expanding.",
  },
] as const;

export const aboutValues = [
  {
    title: "Region-First Discovery",
    description:
      "Creators from every Northeast state should be visible, searchable, and valued on their own terms.",
  },
  {
    title: "Trust Before Volume",
    description:
      "Verification and profile quality are treated as core product layers, not optional extras.",
  },
  {
    title: "Brand-Creator Clarity",
    description:
      "Clear expectations, transparent messaging, and structured collaboration reduce friction.",
  },
  {
    title: "Long-Term Ecosystem",
    description:
      "The goal is not one-off campaigns; it is durable growth for both creators and businesses.",
  },
] as const;

export const staticFaqs = [
  {
    question: "Who can join CreatorNE?",
    answer:
      "Creators and brands connected to Northeast India can join. Profiles are reviewed before full platform activation.",
  },
  {
    question: "Can brands directly message creators?",
    answer:
      "Yes. Brands can message creators from discovery and profile surfaces. Message permissions are role-protected.",
  },
  {
    question: "Is CreatorNE mobile friendly?",
    answer:
      "Yes. The platform is built mobile-first for the way most creators and regional teams browse and collaborate.",
  },
  {
    question: "Do creators need to pay to list a profile?",
    answer:
      "Early creator onboarding is free. Monetized campaign and premium tooling tiers can be introduced in future phases.",
  },
  {
    question: "Which states does CreatorNE prioritize?",
    answer:
      `All Northeast states are in scope: ${NE_STATES.join(", ")}.`,
  },
] as const;

export const contactChannels = [
  {
    label: "Partnerships",
    value: "partnerships@creatorne.in",
    description: "Brand campaigns, strategic collaborations, and ecosystem alliances.",
  },
  {
    label: "Creator Success",
    value: "creators@creatorne.in",
    description: "Profile support, onboarding questions, and creator growth help.",
  },
  {
    label: "Support",
    value: "support@creatorne.in",
    description: "Technical help, account access issues, and dashboard guidance.",
  },
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "creator-economy-northeast-india-2026",
    title: "The Creator Economy in Northeast India: 2026 Snapshot",
    excerpt:
      "A practical look at how local language creators, short-form video, and trust-based collaborations are changing brand strategy.",
    content: [
      "Northeast India is no longer a side market for creator campaigns. It is a high-trust growth region where relevance matters more than raw follower count.",
      "Brands that win here are specific. They work with creators who understand local contexts, language nuance, and community-driven storytelling.",
      "CreatorNE is designed to make this matching process easier by combining discoverability, profile quality, and role-based messaging.",
    ],
    tags: ["Market Insights", "Northeast India", "Creator Economy"],
    author: "CreatorNE Editorial",
    publishedAt: "2026-03-10",
    readTimeMinutes: 6,
  },
  {
    slug: "how-brands-should-shortlist-creators",
    title: "How Brands Should Shortlist Creators in Regional Markets",
    excerpt:
      "A shortlist framework based on audience fit, category alignment, and collaboration reliability.",
    content: [
      "Start with campaign intent, not creator popularity. If your goal is local adoption, regional resonance should be weighted heavily.",
      "Use filters like state, category, language, and engagement to narrow candidates, then evaluate brand fit through portfolio and prior collaborations.",
      "A strong shortlist balances reach creators with conversion-oriented creators to avoid one-dimensional campaign outcomes.",
    ],
    tags: ["Brands", "Playbook", "Discovery"],
    author: "Growth Team",
    publishedAt: "2026-04-18",
    readTimeMinutes: 5,
  },
  {
    slug: "creator-profile-that-converts",
    title: "Building a Creator Profile That Converts Better",
    excerpt:
      "How creators can structure profile data and portfolio proof so brands can decide faster.",
    content: [
      "A profile is a pitch surface. Clear bio context, audience data, and niche proof reduce the decision time for brand managers.",
      "Focus on campaign-relevant examples in your portfolio. Show outcomes and format diversity across reels, stories, and long-form content.",
      "Consistency beats complexity. Keep metrics updated and your positioning sharp so the right opportunities find you.",
    ],
    tags: ["Creators", "Profile Strategy", "Portfolio"],
    author: "Creator Success Team",
    publishedAt: "2026-05-27",
    readTimeMinutes: 4,
  },
];

export const privacySections = [
  {
    title: "Information We Collect",
    points: [
      "Profile data you submit during registration and dashboard updates.",
      "Campaign and messaging metadata needed to run collaboration workflows.",
      "Technical telemetry for performance, reliability, and abuse prevention.",
    ],
  },
  {
    title: "How We Use Data",
    points: [
      "To operate creator discovery, profile verification, and collaboration messaging.",
      "To improve product quality, security controls, and platform analytics.",
      "To communicate platform updates, support responses, and policy notices.",
    ],
  },
  {
    title: "Data Protection",
    points: [
      "Access controls and role-based permissions are applied across sensitive surfaces.",
      "Security best practices are used for transport encryption and infrastructure hygiene.",
      "Sensitive fields are minimized, restricted, and handled under least-privilege principles.",
    ],
  },
] as const;

export const termsSections = [
  {
    title: "Eligibility and Accounts",
    points: [
      "Users must provide accurate registration details and keep account access secure.",
      "CreatorNE may review and approve accounts before full platform participation.",
      "Users are responsible for activity that occurs under their account credentials.",
    ],
  },
  {
    title: "Platform Conduct",
    points: [
      "No spam, impersonation, harassment, or fraudulent campaign representation.",
      "Messaging permissions are role-based and must not be bypassed.",
      "Profile and portfolio content must comply with applicable law and rights ownership.",
    ],
  },
  {
    title: "Campaign and Liability",
    points: [
      "Campaign terms between brands and creators should be documented clearly.",
      "CreatorNE provides platform infrastructure and may mediate disputes where possible.",
      "Service availability and feature scope may evolve as the product scales.",
    ],
  },
] as const;

export const legalLastUpdated = "2026-08-04";

export const contentPageSummary = `${APP_CONFIG.name} builds trusted creator-brand collaboration infrastructure for Northeast India.`;
