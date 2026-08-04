export interface BrandProfileData {
  id: string;
  brandName: string;
  slug: string;
  logo: string | null;
  coverImage: string;
  contactPerson: string;
  website: string | null;
  industry: string;
  budget: string;
  campaignGoal: string;
  targetState: string;
  timeline: string;
  description: string;
  isFeatured: boolean;
  headline: string;
  reach: string;
  activeCampaigns: number;
}

export interface BrandShortlistItem {
  id: string;
  creatorName: string;
  creatorSlug: string;
  category: string;
  followers: string;
  state: string;
  status: string;
}

export interface BrandConversationItem {
  id: string;
  creatorName: string;
  preview: string;
  time: string;
  unread?: boolean;
}

export interface BrandCampaignItem {
  id: string;
  title: string;
  creatorCount: string;
  status: string;
  budget: string;
  timeline: string;
}

export const brandProfiles: BrandProfileData[] = [
  {
    id: "north-eats",
    brandName: "NorthEats",
    slug: "north-eats",
    logo: null,
    coverImage: "from-primary-600 via-secondary to-accent-pink",
    contactPerson: "Mira Kharma",
    website: "https://northeats.example",
    industry: "Food & Hospitality",
    budget: "₹4L - ₹8L",
    campaignGoal: "Launch local food discovery campaigns across Northeast India.",
    targetState: "Meghalaya",
    timeline: "Rolling monthly",
    description:
      "NorthEats partners with creators who can turn local food, hospitality, and travel into stories that feel authentic and brand-safe.",
    isFeatured: true,
    headline: "Brand partnerships with local-first creator discovery",
    reach: "24 shortlisted creators",
    activeCampaigns: 4,
  },
  {
    id: "trailpulse",
    brandName: "TrailPulse",
    slug: "trailpulse",
    logo: null,
    coverImage: "from-accent-pink via-primary-600 to-secondary",
    contactPerson: "Elina Sangma",
    website: "https://trailpulse.example",
    industry: "Travel",
    budget: "₹5L - ₹10L",
    campaignGoal: "Create itinerary-led creator collaborations that inspire weekend travel.",
    targetState: "Sikkim",
    timeline: "Seasonal campaigns",
    description:
      "TrailPulse uses creator storytelling to promote destinations, experiences, and travel packages with a premium visual language.",
    isFeatured: true,
    headline: "Campaigns designed for travel discovery",
    reach: "18 shortlisted creators",
    activeCampaigns: 3,
  },
  {
    id: "echotech",
    brandName: "EchoTech",
    slug: "echo-tech",
    logo: null,
    coverImage: "from-success via-secondary to-primary-600",
    contactPerson: "Arjun Basumatary",
    website: "https://echotech.example",
    industry: "Consumer Tech",
    budget: "₹6L - ₹12L",
    campaignGoal: "Partner with creators for product education and launch stories.",
    targetState: "Assam",
    timeline: "Quarterly launches",
    description:
      "EchoTech blends product education with creator-led reviews, demos, and launch coverage that help audiences quickly understand new releases.",
    isFeatured: true,
    headline: "High-signal launches for consumer tech",
    reach: "31 shortlisted creators",
    activeCampaigns: 5,
  },
];

export const brandShortlists: BrandShortlistItem[] = [
  { id: "1", creatorName: "Sentila Jamir", creatorSlug: "sentila-jamir", category: "Travel", followers: "84.5K", state: "Nagaland", status: "Shortlisted" },
  { id: "2", creatorName: "Rahul Boruah", creatorSlug: "rahul-boruah", category: "Food", followers: "122K", state: "Assam", status: "Ready to brief" },
  { id: "3", creatorName: "Nisha Devi", creatorSlug: "nisha-devi", category: "Lifestyle", followers: "67.8K", state: "Meghalaya", status: "Selected" },
  { id: "4", creatorName: "Arun Roy", creatorSlug: "arun-roy", category: "Tech", followers: "95.4K", state: "Tripura", status: "Awaiting reply" },
];

export const brandConversations: BrandConversationItem[] = [
  {
    id: "conv-1",
    creatorName: "Sentila Jamir",
    preview: "Could you share the draft route and a rough reel outline?",
    time: "5m ago",
    unread: true,
  },
  {
    id: "conv-2",
    creatorName: "Nisha Devi",
    preview: "The visual direction looks good. We can move to final deliverables.",
    time: "28m ago",
  },
  {
    id: "conv-3",
    creatorName: "Arun Roy",
    preview: "We can do the product demo as a launch-day story plus a follow-up review.",
    time: "1h ago",
  },
];

export const brandCampaigns: BrandCampaignItem[] = [
  {
    id: "campaign-1",
    title: "Meghalaya Food Discovery",
    creatorCount: "12 creators",
    status: "Live",
    budget: "₹2.4L",
    timeline: "Aug 2026",
  },
  {
    id: "campaign-2",
    title: "Sikkim Weekend Trail",
    creatorCount: "8 creators",
    status: "Planning",
    budget: "₹1.6L",
    timeline: "Sep 2026",
  },
  {
    id: "campaign-3",
    title: "Assam Tech Launch",
    creatorCount: "5 creators",
    status: "Briefing",
    budget: "₹3.1L",
    timeline: "Q4 2026",
  },
];