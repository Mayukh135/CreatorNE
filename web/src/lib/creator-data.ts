export interface CreatorProfileData {
  id: string;
  name: string;
  slug: string;
  photo: string | null;
  coverImage: string;
  state: string;
  city: string;
  category: string;
  languages: string[];
  followers: number;
  avgViews: number;
  engagementRate: number;
  bio: string;
  socialLinks: Record<string, string>;
  portfolioMedia: string[];
  previousCollabs: string[];
  isVerified: boolean;
  isFeatured: boolean;
  tagline: string;
  rating: number;
  responseRate: string;
  availability: string;
}

export interface CreatorMessage {
  id: string;
  sender: string;
  role: string;
  content: string;
  time: string;
  unread?: boolean;
}

export interface CreatorCampaign {
  id: string;
  title: string;
  brand: string;
  status: string;
  budget: string;
  dueDate: string;
}

export interface CreatorNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  accent: string;
}

export const creatorProfiles: CreatorProfileData[] = [
  {
    id: "sentila-jamir",
    name: "Sentila Jamir",
    slug: "sentila-jamir",
    photo: null,
    coverImage: "from-primary-600 via-secondary to-accent-pink",
    state: "Nagaland",
    city: "Kohima",
    category: "Travel",
    languages: ["English", "Nagamese", "Hindi"],
    followers: 84500,
    avgViews: 210000,
    engagementRate: 8.2,
    bio: "Travel stories, local food trails, and culture-first short films created for brands that want an authentic Northeast voice.",
    socialLinks: {
      instagram: "https://instagram.com/creatorne",
      youtube: "https://youtube.com/@creatorne",
      website: "https://creatorne.in",
    },
    portfolioMedia: ["Journey reels", "Food crawl", "Brand travel series", "Local guide story"],
    previousCollabs: ["NorthEats", "TrailPulse", "StayNorth", "Mosaic Skincare"],
    isVerified: true,
    isFeatured: true,
    tagline: "Travel storyteller rooted in the Northeast",
    rating: 4.9,
    responseRate: "96%",
    availability: "Open for 2 campaigns this month",
  },
  {
    id: "rahul-boruah",
    name: "Rahul Boruah",
    slug: "rahul-boruah",
    photo: null,
    coverImage: "from-accent-pink via-primary-600 to-secondary",
    state: "Assam",
    city: "Guwahati",
    category: "Food",
    languages: ["Assamese", "English", "Hindi"],
    followers: 122000,
    avgViews: 340000,
    engagementRate: 7.5,
    bio: "Quick-turn food content, restaurant storytelling, and local discovery reels designed to feel native and conversion-friendly.",
    socialLinks: {
      instagram: "https://instagram.com/creatorne",
      youtube: "https://youtube.com/@creatorne",
    },
    portfolioMedia: ["Restaurant launch", "Street food reel", "Cafe story", "Menu spotlight"],
    previousCollabs: ["NorthEats", "Loom Studio", "Mosaic Skincare"],
    isVerified: true,
    isFeatured: true,
    tagline: "Food content with a local-first audience lens",
    rating: 4.8,
    responseRate: "93%",
    availability: "Booked for 3 days next week",
  },
  {
    id: "nisha-devi",
    name: "Nisha Devi",
    slug: "nisha-devi",
    photo: null,
    coverImage: "from-secondary via-accent-cyan to-primary-600",
    state: "Meghalaya",
    city: "Shillong",
    category: "Lifestyle",
    languages: ["English", "Hindi", "Khasi"],
    followers: 67800,
    avgViews: 162000,
    engagementRate: 9.1,
    bio: "Lifestyle and fashion content that balances polished visuals with brand-safe storytelling and a highly engaged audience.",
    socialLinks: {
      instagram: "https://instagram.com/creatorne",
      youtube: "https://youtube.com/@creatorne",
    },
    portfolioMedia: ["Fashion story", "GRWM reel", "Brand capsule", "Skincare launch"],
    previousCollabs: ["Mosaic Skincare", "EchoTech", "Saffron Roots"],
    isVerified: true,
    isFeatured: true,
    tagline: "Lifestyle content with a refined creator voice",
    rating: 4.8,
    responseRate: "91%",
    availability: "Available for retainer work",
  },
  {
    id: "arun-roy",
    name: "Arun Roy",
    slug: "arun-roy",
    photo: null,
    coverImage: "from-success via-secondary to-primary-600",
    state: "Tripura",
    city: "Agartala",
    category: "Tech",
    languages: ["Hindi", "English", "Bengali"],
    followers: 95400,
    avgViews: 250000,
    engagementRate: 6.8,
    bio: "Tech explainers and product demos that convert complex launches into fast, digestible, and brand-friendly content.",
    socialLinks: {
      instagram: "https://instagram.com/creatorne",
      youtube: "https://youtube.com/@creatorne",
      website: "https://creatorne.in",
    },
    portfolioMedia: ["Gadget demo", "App walkthrough", "Launch review", "Explainer series"],
    previousCollabs: ["EchoTech", "TrailPulse", "NorthEats"],
    isVerified: true,
    isFeatured: true,
    tagline: "Clear tech content for product launches",
    rating: 4.7,
    responseRate: "94%",
    availability: "Open for sponsored review work",
  },
];

export const creatorCampaigns: CreatorCampaign[] = [
  {
    id: "camp-1",
    title: "Travel series for NorthEats",
    brand: "NorthEats",
    status: "In review",
    budget: "₹45,000",
    dueDate: "12 Aug 2026",
  },
  {
    id: "camp-2",
    title: "Weekend itinerary collaboration",
    brand: "TrailPulse",
    status: "Approved",
    budget: "₹60,000",
    dueDate: "18 Aug 2026",
  },
  {
    id: "camp-3",
    title: "Product demo launch",
    brand: "EchoTech",
    status: "Draft brief",
    budget: "₹72,000",
    dueDate: "22 Aug 2026",
  },
];

export const creatorMessages: CreatorMessage[] = [
  {
    id: "msg-1",
    sender: "Admin",
    role: "Platform team",
    content: "Your profile is nearly ready. Please add one more portfolio piece for stronger brand visibility.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "msg-2",
    sender: "NorthEats",
    role: "Brand",
    content: "We want to map your travel reel to our Meghalaya launch window. Can you share a short concept?",
    time: "18m ago",
  },
  {
    id: "msg-3",
    sender: "TrailPulse",
    role: "Brand",
    content: "The itinerary concept is approved. We are updating the brief and deliverables today.",
    time: "1h ago",
  },
  {
    id: "msg-4",
    sender: "Admin",
    role: "Platform team",
    content: "Your verification document has been accepted. The verified badge is now active.",
    time: "4h ago",
  },
];

export const creatorNotifications: CreatorNotification[] = [
  {
    id: "note-1",
    title: "Profile approved",
    description: "Your CreatorNE profile passed review and now appears in featured discovery surfaces.",
    time: "Today",
    accent: "from-success to-secondary",
  },
  {
    id: "note-2",
    title: "New brand match",
    description: "A travel brand in Meghalaya shortlisted your profile for an upcoming campaign.",
    time: "Today",
    accent: "from-primary-600 to-secondary",
  },
  {
    id: "note-3",
    title: "Content reminder",
    description: "Your latest campaign draft is due in 48 hours. Keep the deliverables moving.",
    time: "Yesterday",
    accent: "from-accent-pink to-primary-600",
  },
];