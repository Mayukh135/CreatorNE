import { CREATOR_CATEGORIES } from "@/lib/constants";

export interface HomeStat {
  key: string;
  value: number;
  suffix: string;
  label: string;
}

export interface HomeFeature {
  title: string;
  description: string;
  icon: string;
  accent: string;
}

export interface HomeCreator {
  id: string;
  name: string;
  slug: string;
  state: string;
  city: string;
  category: string;
  followers: number;
  avgViews: number;
  engagementRate: number;
  bio: string;
  tags: string[];
  accent: string;
  initials: string;
  isVerified: boolean;
  isFeatured: boolean;
}

export interface HomeBrand {
  id: string;
  brandName: string;
  slug: string;
  industry: string;
  targetState: string;
  campaignGoal: string;
  logoInitials: string;
  accent: string;
  isFeatured: boolean;
}

export interface HomeTestimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  accent: string;
}

export interface HomeFaq {
  question: string;
  answer: string;
}

export interface HomeStep {
  title: string;
  description: string;
  icon: string;
}

export const homeStats: HomeStat[] = [
  { key: "verified-creators", value: 500, suffix: "+", label: "Verified Creators" },
  { key: "partner-states", value: 20, suffix: "+", label: "Partner States" },
  { key: "collaborations", value: 100, suffix: "+", label: "Successful Collaborations" },
];

export const homeFeatures: HomeFeature[] = [
  {
    title: "Verified Creators",
    description: "Profiles are reviewed so brands can move faster with real creators and clear trust signals.",
    icon: "BadgeCheck",
    accent: "from-primary-600 to-secondary",
  },
  {
    title: "Smart Discovery",
    description: "Filter creators by state, category, language, platform, and audience fit in a focused interface.",
    icon: "Search",
    accent: "from-secondary to-accent-cyan",
  },
  {
    title: "Easy Collaboration",
    description: "Shortlists, conversations, and campaign intent live together so deals do not stall in DM chaos.",
    icon: "MessageCircleMore",
    accent: "from-accent-pink to-primary-600",
  },
  {
    title: "Secure Platform",
    description: "Supabase auth, approval workflows, and private verification data keep the foundation controlled.",
    icon: "ShieldCheck",
    accent: "from-success to-secondary",
  },
  {
    title: "Creator Growth",
    description: "Analytics, portfolio presentation, and collaboration history make each profile more compelling.",
    icon: "Rocket",
    accent: "from-gold to-accent-pink",
  },
  {
    title: "Community First",
    description: "CreatorNE is built around Northeast identity, local relationships, and long-term opportunity.",
    icon: "Users",
    accent: "from-primary-500 to-accent-cyan",
  },
];

export const featuredCreators: HomeCreator[] = [
  {
    id: "sentila-jamir",
    name: "Sentila Jamir",
    slug: "sentila-jamir",
    state: "Nagaland",
    city: "Kohima",
    category: "Travel",
    followers: 84500,
    avgViews: 210000,
    engagementRate: 8.2,
    bio: "Visual travel stories with a strong sense of place, local food, and offbeat routes across the hills.",
    tags: ["Travel", "Reels", "Culture"],
    accent: "from-primary-600 to-secondary",
    initials: "SJ",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "rahul-boruah",
    name: "Rahul Boruah",
    slug: "rahul-boruah",
    state: "Assam",
    city: "Guwahati",
    category: "Food",
    followers: 122000,
    avgViews: 340000,
    engagementRate: 7.5,
    bio: "Fast-paced food content designed for discovery, local restaurants, and brand-friendly campaign moments.",
    tags: ["Food", "Reviews", "Local Guides"],
    accent: "from-accent-pink to-primary-600",
    initials: "RB",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "nisha-devi",
    name: "Nisha Devi",
    slug: "nisha-devi",
    state: "Meghalaya",
    city: "Shillong",
    category: "Lifestyle",
    followers: 67800,
    avgViews: 162000,
    engagementRate: 9.1,
    bio: "Lifestyle-first creator with polished visual storytelling, fashion edits, and high-save carousel content.",
    tags: ["Lifestyle", "Fashion", "UGC"],
    accent: "from-secondary to-accent-cyan",
    initials: "ND",
    isVerified: true,
    isFeatured: true,
  },
  {
    id: "arun-roy",
    name: "Arun Roy",
    slug: "arun-roy",
    state: "Tripura",
    city: "Agartala",
    category: "Tech",
    followers: 95400,
    avgViews: 250000,
    engagementRate: 6.8,
    bio: "Tech explainers and gadget demos that turn complex product stories into crisp, conversion-ready content.",
    tags: ["Tech", "Gadgets", "Explainers"],
    accent: "from-success to-primary-600",
    initials: "AR",
    isVerified: true,
    isFeatured: true,
  },
];

export const featuredBrands: HomeBrand[] = [
  {
    id: "north-eats",
    brandName: "NorthEats",
    slug: "northeats",
    industry: "Food & Hospitality",
    targetState: "Meghalaya",
    campaignGoal: "Launch local discovery campaigns",
    logoInitials: "NE",
    accent: "from-primary-600 to-secondary",
    isFeatured: true,
  },
  {
    id: "trailpulse",
    brandName: "TrailPulse",
    slug: "trailpulse",
    industry: "Travel",
    targetState: "Sikkim",
    campaignGoal: "Weekend itinerary collaborations",
    logoInitials: "TP",
    accent: "from-accent-pink to-primary-600",
    isFeatured: true,
  },
  {
    id: "mosaic-skincare",
    brandName: "Mosaic Skincare",
    slug: "mosaic-skincare",
    industry: "Beauty",
    targetState: "Assam",
    campaignGoal: "Creator-led product education",
    logoInitials: "MS",
    accent: "from-secondary to-accent-cyan",
    isFeatured: true,
  },
  {
    id: "echo-tech",
    brandName: "EchoTech",
    slug: "echotech",
    industry: "Consumer Tech",
    targetState: "Arunachal Pradesh",
    campaignGoal: "Feature launches with review creators",
    logoInitials: "ET",
    accent: "from-success to-secondary",
    isFeatured: true,
  },
  {
    id: "loom-studio",
    brandName: "Loom Studio",
    slug: "loom-studio",
    industry: "Fashion",
    targetState: "Nagaland",
    campaignGoal: "Seasonal creator lookbooks",
    logoInitials: "LS",
    accent: "from-gold to-accent-pink",
    isFeatured: true,
  },
  {
    id: "saffron-roots",
    brandName: "Saffron Roots",
    slug: "saffron-roots",
    industry: "Lifestyle",
    targetState: "Tripura",
    campaignGoal: "Community-first launch content",
    logoInitials: "SR",
    accent: "from-primary-500 to-accent-cyan",
    isFeatured: true,
  },
];

export const homeTestimonials: HomeTestimonial[] = [
  {
    id: "1",
    name: "Mira Kharma",
    role: "Brand Lead, NorthEats",
    content:
      "CreatorNE gives us a cleaner way to evaluate creators by region, audience fit, and collaboration quality before we brief a campaign.",
    avatar: "MK",
    accent: "from-primary-600 to-secondary",
  },
  {
    id: "2",
    name: "Ritwik Dutta",
    role: "Travel Creator, Assam",
    content:
      "The platform feels built for the way Northeast creators actually work. Discovery is easier, and the brand-facing experience feels premium.",
    avatar: "RD",
    accent: "from-accent-pink to-primary-600",
  },
  {
    id: "3",
    name: "Elina Sangma",
    role: "Content Strategist, TrailPulse",
    content:
      "What stands out is the trust layer. Verification, clean profiles, and strong visual presentation make the outreach process much smoother.",
    avatar: "ES",
    accent: "from-secondary to-accent-cyan",
  },
  {
    id: "4",
    name: "Arjun Basumatary",
    role: "Brand Partnerships, EchoTech",
    content:
      "The platform does not feel like a generic marketplace. It feels local, specific, and ready for real campaigns in the Northeast market.",
    avatar: "AB",
    accent: "from-success to-secondary",
  },
];

export const homeFaqs: HomeFaq[] = [
  {
    question: "How are creators verified on CreatorNE?",
    answer:
      "Creators go through profile review and approval, with verification badges reserved for accounts that meet platform checks and documentation requirements.",
  },
  {
    question: "Can brands search by state and category?",
    answer:
      "Yes. Discovery is designed around Northeast states, categories, audience size, languages, and platform fit so brands can narrow down quickly.",
  },
  {
    question: "Is messaging available for all roles?",
    answer:
      "Brands can message creators and admins, creators can reply to admins, and the system prevents creator-to-creator spam by design.",
  },
  {
    question: "What happens after launch?",
    answer:
      "The next phase expands registration, dashboards, and campaign workflows while the homepage continues to evolve with live data from the database.",
  },
];

export const creatorSteps: HomeStep[] = [
  {
    title: "Create your profile",
    description: "Add your bio, categories, audience data, and brand-ready links in a guided flow.",
    icon: "UserRoundPen",
  },
  {
    title: "Verify your identity",
    description: "Submit verification details once so the platform can trust your profile from the start.",
    icon: "ShieldCheck",
  },
  {
    title: "Show your work",
    description: "Upload portfolio content, previous collaborations, and content samples that sell your style.",
    icon: "GalleryVerticalEnd",
  },
  {
    title: "Receive opportunities",
    description: "Brands and admins can find you faster with search, filters, and campaign context.",
    icon: "MailOpen",
  },
  {
    title: "Grow your presence",
    description: "Keep updating your stats, audience reach, and collaborations as your creator profile matures.",
    icon: "TrendingUp",
  },
];

export const brandSteps: HomeStep[] = [
  {
    title: "Register your brand",
    description: "Create a clear profile with company details, goals, and the kind of creator fit you need.",
    icon: "Building2",
  },
  {
    title: "Explore the directory",
    description: "Filter creators by state, category, language, and audience signals without endless scrolling.",
    icon: "Search",
  },
  {
    title: "Shortlist fast",
    description: "Save the right creators, compare them, and keep the evaluation process organized.",
    icon: "ListChecks",
  },
  {
    title: "Start collaboration",
    description: "Use messaging and campaign context to move from discovery to agreement quickly.",
    icon: "MessagesSquare",
  },
  {
    title: "Measure outcomes",
    description: "Review collaborations, track campaigns, and build a repeatable creator pipeline.",
    icon: "BarChart3",
  },
];

const categoryCounts = [58, 41, 49, 37, 31, 44, 26, 24, 19, 22, 35, 17];

export const homeCategories = CREATOR_CATEGORIES.slice(0, 12).map((category, index) => ({
  ...category,
  creatorCount: categoryCounts[index] ?? 0,
}));