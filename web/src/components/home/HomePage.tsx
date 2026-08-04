"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import * as Icons from "lucide-react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

interface CreatorCardData {
  id: string;
  name: string;
  slug: string;
  state: string;
  city: string;
  category: string;
  followers: number;
  followerText: string;
  engagementRate: number;
  image: string;
  isVerified: boolean;
  platforms: ("instagram" | "youtube" | "tiktok")[];
  priceEstimate: number;
  bio: string;
}

const DIRECTORY_CREATORS: CreatorCardData[] = [
  {
    id: "sentila-longkumer",
    name: "Sentila Longkumer",
    slug: "sentila-jamir",
    state: "Nagaland",
    city: "Kohima",
    category: "Fashion",
    followers: 142000,
    followerText: "142K",
    engagementRate: 5.2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASh9lo088pweH6vRpWdRUu0RmBbXkc-elLZ9__rAbipXpx5e00X24M0mrNUJE9Mc0w2kefinf5sEZg__-7eWy8CV4XV7dxRUxehBmwjIF0nCp0OvuutfxK6VUAV-igIGFBbYuvst3ozUm4T79noJdtOeBJVTEwkotzL-8rh_bQEC-l05OnhCKiJnzdxnGkHsl88TDyTvDL7Obac7Lt5tt7pvUTVR0EZjGLGHHHCVbvJh8mHNx80ahn",
    isVerified: true,
    platforms: ["instagram", "youtube"],
    priceEstimate: 15000,
    bio: "Contemporary Nagaland fashion, ethnic beadwork styling, and modern Northeast lifestyle visual stories.",
  },
  {
    id: "bikram-das",
    name: "Bikram Das",
    slug: "rahul-boruah",
    state: "Assam",
    city: "Guwahati",
    category: "Travel",
    followers: 89000,
    followerText: "89K",
    engagementRate: 4.8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzBIXjqYgzT49EdDbW-8kOdEVYf0cI8LMOXaUo6yEvi9Bd-fB6Ygl9E4vd6V_icjK5r9TIYf0UCKK60ou_gF0ZBlPOgFqqSqNJUvjFIsAoDkllD7iym_gqKYM0ax42TUTO2-ujXH35ow3BSL52XqKV7Ybr6jbLfvkMWyFX4br42oaDEH-n3bDmLbSoLaVszOCYIaeB4CEBSyhrlIS5JRmjTBXuoY-3PzoKv5jJ472ctyAMu9wCpe-3",
    isVerified: true,
    platforms: ["instagram", "youtube"],
    priceEstimate: 12000,
    bio: "Adventure cycling, jungle expeditions in Assam, and nature exploration across Northeast India.",
  },
  {
    id: "maya-sangma",
    name: "Maya Sangma",
    slug: "nisha-devi",
    state: "Meghalaya",
    city: "Shillong",
    category: "Food",
    followers: 210000,
    followerText: "210K",
    engagementRate: 6.1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6WdXWPd3W9MzcSWLHL67NsL03E54HGdjOVCFjzLvyU7FEEMCXRy_SKvQZbF91hiHZnlM4mHrGCXYyS0rIEhURfFkgPqF7xkvYRiEZLUwOccvoRRc04TQ15Uo665mL-a9ur6wOq071hQAc1nc4My4OFO4rBZ-Cpf7SBuep1uQJZie3LokNf0skwbqTJ3FqhXEoyCl_5fkRBOA9z9n_FfejHa5Psy3LiUgEzVEQeYg5YAFa8RPq3Z7G",
    isVerified: true,
    platforms: ["instagram", "tiktok"],
    priceEstimate: 22000,
    bio: "Traditional Khasi culinary recipes, food styling, and vibrant cooking culture from Shillong.",
  },
  {
    id: "rohan-meitei",
    name: "Rohan Meitei",
    slug: "arun-roy",
    state: "Manipur",
    city: "Imphal",
    category: "Tech",
    followers: 45000,
    followerText: "45K",
    engagementRate: 8.4,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBb9wjBN35mOEyaG88-olkp2rT89OKQBT2OtlhBR_IadzPLG-6PuZO5JfRmx_g-SG6kA0U-zC5QQ1AlaANm2Se0vvofap3zXEw9juMVkAAw_cFiQqrcZ4rNVBCY5VM00eUFJnhWj-4A4FjFTR8rtL8pc0ZKz6_3fVjwuvd9NPtQQnUoV6nm9ksgxP6mWt07t6cuOdV8AtzB4ZiHCJAcJvDMBoVC00sN5druM1bSoh5pW1uln0M5Hg5f",
    isVerified: true,
    platforms: ["youtube", "instagram"],
    priceEstimate: 9500,
    bio: "Crisp gadget reviews, gaming desk setups, and technology explainers for Northeast youth.",
  },
  {
    id: "pema-bhutia",
    name: "Pema Bhutia",
    slug: "pema-bhutia",
    state: "Sikkim",
    city: "Gangtok",
    category: "Lifestyle",
    followers: 125000,
    followerText: "125K",
    engagementRate: 3.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCr1Ii_ag_-zTx-MErB5xk0y_lKpET7IMNKOCzXJeKUOo2kKk5NOli8yyESYFDxepTALkMYAUSnmxiHTRSl_wDiyvFBAqRqxpsV_DbwIywvZXOmb7JnsQegwB_7Me6j8_GljWpCSF5e2vo0m3XR0wKdPQv6AyWmVMJmvM8LVdXx_Ae6AplqguK_Wr2tE0apsx7yV8KZvvLh_Gs7_bTMO1YjN6mZ8WLxwZkMkF6fFeY6UoPAJyqn-A0L",
    isVerified: false,
    platforms: ["instagram"],
    priceEstimate: 14000,
    bio: "Aspirational Himalayan lifestyle aesthetic, Himalayan cafes, books, and serene aesthetic vlogs.",
  },
  {
    id: "tashi-mossang",
    name: "Tashi Mossang",
    slug: "tashi-mossang",
    state: "Arunachal Pradesh",
    city: "Itanagar",
    category: "Artisan",
    followers: 28000,
    followerText: "28K",
    engagementRate: 12.2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6ceXla9sCQUT8P7fUwy98faVd0ddBtIN61ZTz3RdqNrKRKsqr5hD5HUdn8BHrzwEQenBYnLRW_-NCnp_Wkpvj9b0x6tv3rMROytmRg4FQb5w2NoXfKdcY77pjNbJjHq5hQVIdodP3SwHgpcvnj-CunOTz2vffv_mqTDXuCCTWnGv6wRMWFPdo7g13zMaCaTZTyG4jDyU2Nq1V-bYmmo48doopgFL7tRKseAVza1pcOBTwdu4X9SiJ",
    isVerified: true,
    platforms: ["instagram", "youtube"],
    priceEstimate: 7000,
    bio: "Indigenous textile weaving, handicraft documentation, and artisan heritage storytelling.",
  },
];

const CATEGORIES = [
  "All Categories",
  "Travel & Adventure",
  "Traditional Food",
  "Modern Fashion",
  "Tech & Gadgets",
  "Lifestyle",
  "Artisan",
];

const LOCATIONS = [
  "All Locations",
  "Nagaland",
  "Assam",
  "Manipur",
  "Meghalaya",
  "Sikkim",
  "Arunachal Pradesh",
  "Tripura",
  "Mizoram",
];

export function HomePage() {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [minEngagement, setMinEngagement] = useState(1);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  // Hire Modal State
  const [hiringCreator, setHiringCreator] = useState<CreatorCardData | null>(null);

  // Platform Toggle handler
  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  // Filtered Creators calculation
  const filteredCreators = useMemo(() => {
    return DIRECTORY_CREATORS.filter((creator) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = creator.name.toLowerCase().includes(q);
        const matchesCategory = creator.category.toLowerCase().includes(q);
        const matchesState = creator.state.toLowerCase().includes(q);
        const matchesCity = creator.city.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesState && !matchesCity) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "All Categories") {
        const catMap: Record<string, string> = {
          "Travel & Adventure": "Travel",
          "Traditional Food": "Food",
          "Modern Fashion": "Fashion",
          "Tech & Gadgets": "Tech",
          Lifestyle: "Lifestyle",
          Artisan: "Artisan",
        };
        const target = catMap[selectedCategory] || selectedCategory;
        if (creator.category.toLowerCase() !== target.toLowerCase()) {
          return false;
        }
      }

      // Location filter
      if (selectedLocation !== "All Locations") {
        if (creator.state.toLowerCase() !== selectedLocation.toLowerCase()) {
          return false;
        }
      }

      // Verified filter
      if (verifiedOnly && !creator.isVerified) {
        return false;
      }

      // Engagement filter
      if (creator.engagementRate < minEngagement) {
        return false;
      }

      // Platforms filter
      if (selectedPlatforms.length > 0) {
        const hasPlatform = selectedPlatforms.some((p) =>
          creator.platforms.includes(p as "instagram" | "youtube" | "tiktok")
        );
        if (!hasPlatform) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "followers") {
        return b.followers - a.followers;
      }
      if (sortBy === "engagement") {
        return b.engagementRate - a.engagementRate;
      }
      return 0; // relevance
    });
  }, [searchQuery, selectedCategory, selectedLocation, verifiedOnly, minEngagement, selectedPlatforms, sortBy]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#f9f9ff] text-[#151c27] font-sans antialiased">
        {/* Header / Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#f9f9ff]/80 backdrop-blur-xl border-b border-[#ccc3d8]/30 shadow-sm transition-all">
          <nav className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
            <div className="flex items-center gap-8 md:gap-12">
              <Link href="/" className="group flex items-center gap-2">
                <span className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-[#630ed4] via-[#7C3AED] to-[#4b41e1] bg-clip-text text-transparent">
                  CreatorNE
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="/"
                  className="text-sm font-bold text-[#630ed4] border-b-2 border-[#630ed4] pb-0.5 transition-colors"
                >
                  Directory
                </Link>
                <Link
                  href="/find-creators"
                  className="text-sm font-medium text-[#4a4455] hover:text-[#630ed4] transition-colors"
                >
                  Marketplace
                </Link>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-[#4a4455] hover:text-[#630ed4] transition-colors"
                >
                  Case Studies
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium text-[#4a4455] hover:text-[#630ed4] transition-colors"
                >
                  About
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <Link
                href="/login"
                className="hidden sm:inline-flex text-sm font-semibold text-[#4a4455] hover:text-[#630ed4] px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center text-sm font-semibold text-white px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                Join as Creator
              </Link>
            </div>
          </nav>
        </header>

        <main className="pt-24 pb-16 min-h-screen">
          {/* Hero & Advanced Search Section */}
          <section className="relative py-12 md:py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#151c27] mb-3">
                Find the Voice of the Northeast
              </h1>
              <p className="text-base md:text-lg text-[#4a4455] max-w-2xl mx-auto mb-10">
                Connect with 5,000+ vetted creators across Nagaland, Assam, Manipur, and beyond.
              </p>

              {/* Search Bar & Dropdowns Floating Container */}
              <div className="bg-white p-3 md:p-4 rounded-[2rem] shadow-xl shadow-purple-900/5 max-w-4xl mx-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 border border-[#ccc3d8]/30">
                {/* Text Search Input */}
                <div className="flex-1 flex items-center px-4 py-2 md:py-0 border-b md:border-b-0 md:border-r border-[#ccc3d8]/30">
                  <Icons.Search className="w-5 h-5 text-[#7b7487] mr-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search creators by name or niche..."
                    className="w-full bg-transparent border-none focus:outline-none text-sm text-[#151c27] placeholder:text-[#7b7487]/70"
                  />
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-1 text-[#7b7487] hover:text-[#151c27]"
                    >
                      <Icons.X className="w-4 h-4" />
                    </button>
                  ) : null}
                </div>

                {/* Category Dropdown */}
                <div className="flex-1 flex items-center px-4 py-2 md:py-0 border-b md:border-b-0 md:border-r border-[#ccc3d8]/30">
                  <Icons.Grid className="w-5 h-5 text-[#7b7487] mr-3 shrink-0" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-sm text-[#151c27] appearance-none cursor-pointer pr-4"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Dropdown */}
                <div className="flex-1 flex items-center px-4 py-2 md:py-0">
                  <Icons.MapPin className="w-5 h-5 text-[#7b7487] mr-3 shrink-0" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-sm text-[#151c27] appearance-none cursor-pointer pr-4"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Action Button */}
                <button
                  type="button"
                  className="bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white px-8 py-3.5 rounded-[1.5rem] font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 transition-all"
                >
                  <Icons.Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </section>

          {/* Directory Main Content (Sidebar + Grid) */}
          <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16 flex flex-col lg:flex-row gap-8">
            {/* Sidebar Refine Filters */}
            <aside className="hidden lg:block w-72 shrink-0 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#ccc3d8]/30 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-[#151c27]">Refine Results</h3>

                {/* Platform Filter */}
                <div className="space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#4a4455]">
                    Platform
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: "instagram", label: "Instagram" },
                      { id: "youtube", label: "YouTube" },
                      { id: "tiktok", label: "TikTok (Global)" },
                    ].map((platform) => (
                      <label
                        key={platform.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPlatforms.includes(platform.id)}
                          onChange={() => togglePlatform(platform.id)}
                          className="rounded text-[#630ed4] focus:ring-[#7c3aed] border-[#ccc3d8] w-4 h-4"
                        />
                        <span className="text-sm text-[#4a4455] group-hover:text-[#630ed4] transition-colors">
                          {platform.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] bg-[#ccc3d8]/30" />

                {/* Engagement Rate Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#4a4455]">
                      Engagement Rate
                    </p>
                    <span className="text-xs font-bold text-[#4b41e1]">
                      {minEngagement}%+
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={minEngagement}
                    onChange={(e) => setMinEngagement(Number(e.target.value))}
                    className="w-full h-2 bg-[#e2e8f8] rounded-full appearance-none cursor-pointer accent-[#630ed4]"
                  />
                  <div className="flex justify-between text-xs text-[#7b7487]">
                    <span>1%</span>
                    <span>10%+</span>
                  </div>
                </div>

                <div className="h-[1px] bg-[#ccc3d8]/30" />

                {/* Verification Status */}
                <div className="space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#4a4455]">
                    Verification Status
                  </p>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="rounded text-[#630ed4] focus:ring-[#7c3aed] border-[#ccc3d8] w-4 h-4"
                    />
                    <span className="text-sm text-[#4a4455] group-hover:text-[#630ed4] transition-colors flex items-center gap-1.5">
                      <span>Verified Only</span>
                      <Icons.BadgeCheck className="w-4 h-4 text-[#4b41e1] fill-[#4b41e1]/10" />
                    </span>
                  </label>
                </div>
              </div>

              {/* Need Help Concierge Card */}
              <div className="bg-gradient-to-br from-[#7c3aed]/10 to-[#4b41e1]/10 p-6 rounded-2xl border border-[#7c3aed]/20">
                <h4 className="text-lg font-bold text-[#630ed4] mb-1">Need Help?</h4>
                <p className="text-xs leading-relaxed text-[#4a4455] mb-4">
                  Our concierge team can find the perfect match for your campaign.
                </p>
                <Link
                  href="/contact"
                  className="block w-full py-2.5 text-center bg-white text-[#630ed4] border border-[#630ed4] text-xs font-bold rounded-xl hover:bg-[#630ed4] hover:text-white transition-all duration-200"
                >
                  Talk to an Expert
                </Link>
              </div>
            </aside>

            {/* Creator Grid & Counter */}
            <div className="flex-1">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-sm text-[#4a4455]">
                  <span className="font-bold text-[#151c27]">
                    {filteredCreators.length * 200 + 48}
                  </span>{" "}
                  creators found in{" "}
                  <span className="font-bold text-[#151c27]">{selectedLocation}</span>
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#7b7487]">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border-none text-xs font-bold text-[#151c27] focus:outline-none cursor-pointer"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="followers">Follower Count</option>
                    <option value="engagement">Engagement Rate</option>
                  </select>
                </div>
              </div>

              {/* Creator Cards Grid */}
              {filteredCreators.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCreators.map((creator) => (
                    <m.div
                      key={creator.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl border border-[#ccc3d8]/30 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Container */}
                        <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                          <img
                            src={creator.image}
                            alt={creator.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {creator.isVerified ? (
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                              <Icons.BadgeCheck className="w-3.5 h-3.5 text-[#4b41e1]" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#151c27]">
                                Verified
                              </span>
                            </div>
                          ) : null}
                        </div>

                        {/* Card Info */}
                        <div className="p-5 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-xl font-bold text-[#151c27]">
                                {creator.name}
                              </h4>
                              <div className="flex items-center gap-1 text-xs text-[#4a4455] mt-0.5">
                                <Icons.MapPin className="w-3.5 h-3.5 text-[#7b7487]" />
                                <span>
                                  {creator.city}, {creator.state}
                                </span>
                              </div>
                            </div>
                            <span className="bg-[#7c3aed]/10 text-[#630ed4] px-2.5 py-1 rounded-lg text-xs font-semibold">
                              {creator.category}
                            </span>
                          </div>

                          {/* Stats Container */}
                          <div className="grid grid-cols-2 gap-3 p-3 bg-[#f0f3ff] rounded-xl">
                            <div>
                              <p className="text-[10px] text-[#7b7487] uppercase font-bold tracking-wider">
                                Followers
                              </p>
                              <p className="text-lg font-bold text-[#151c27]">
                                {creator.followerText}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-[#7b7487] uppercase font-bold tracking-wider">
                                Eng. Rate
                              </p>
                              <p className="text-lg font-bold text-[#4b41e1]">
                                {creator.engagementRate}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="px-5 pb-5 flex gap-3">
                        <Link
                          href={`/creators/${creator.slug}`}
                          className="flex-1 py-2.5 text-center bg-white border border-[#ccc3d8] text-xs font-bold text-[#151c27] rounded-xl hover:border-[#630ed4] hover:text-[#630ed4] transition-colors"
                        >
                          View Profile
                        </Link>
                        <button
                          type="button"
                          onClick={() => setHiringCreator(creator)}
                          className="flex-1 py-2.5 text-center bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
                        >
                          Hire Now
                        </button>
                      </div>
                    </m.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-2xl border border-[#ccc3d8]/30 text-center space-y-4">
                  <Icons.SearchX className="w-12 h-12 text-[#7b7487] mx-auto" />
                  <h4 className="text-xl font-bold text-[#151c27]">No creators found</h4>
                  <p className="text-sm text-[#4a4455] max-w-md mx-auto">
                    Try adjusting your search keywords, location filters, or engagement parameters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All Categories");
                      setSelectedLocation("All Locations");
                      setVerifiedOnly(false);
                      setMinEngagement(1);
                      setSelectedPlatforms([]);
                    }}
                    className="px-6 py-2.5 bg-[#630ed4] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#7c3aed] transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              <div className="mt-12 flex justify-center items-center gap-2">
                <button className="w-9 h-9 rounded-full border border-[#ccc3d8] flex items-center justify-center text-[#7b7487] hover:border-[#630ed4] hover:text-[#630ed4] transition-colors">
                  <Icons.ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-full bg-[#630ed4] text-white font-bold text-xs">
                  1
                </button>
                <button className="w-9 h-9 rounded-full border border-[#ccc3d8] flex items-center justify-center text-xs font-semibold text-[#4a4455] hover:border-[#630ed4] hover:text-[#630ed4] transition-colors">
                  2
                </button>
                <button className="w-9 h-9 rounded-full border border-[#ccc3d8] flex items-center justify-center text-xs font-semibold text-[#4a4455] hover:border-[#630ed4] hover:text-[#630ed4] transition-colors">
                  3
                </button>
                <span className="text-xs text-[#7b7487] px-1">...</span>
                <button className="w-9 h-9 rounded-full border border-[#ccc3d8] flex items-center justify-center text-xs font-semibold text-[#4a4455] hover:border-[#630ed4] hover:text-[#630ed4] transition-colors">
                  12
                </button>
                <button className="w-9 h-9 rounded-full border border-[#ccc3d8] flex items-center justify-center text-[#7b7487] hover:border-[#630ed4] hover:text-[#630ed4] transition-colors">
                  <Icons.ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Hire Creator Modal */}
        <AnimatePresence>
          {hiringCreator ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative space-y-6"
              >
                <button
                  onClick={() => setHiringCreator(null)}
                  className="absolute top-6 right-6 text-[#7b7487] hover:text-[#151c27] p-1"
                >
                  <Icons.X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <img
                    src={hiringCreator.image}
                    alt={hiringCreator.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-[#151c27]">
                      Hire {hiringCreator.name}
                    </h3>
                    <p className="text-xs text-[#4a4455]">
                      {hiringCreator.category} • {hiringCreator.city}, {hiringCreator.state}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#f0f3ff] rounded-2xl space-y-2 text-xs">
                  <div className="flex justify-between text-[#4a4455]">
                    <span>Estimated rate per post:</span>
                    <span className="font-bold text-[#151c27]">
                      ₹{hiringCreator.priceEstimate.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#4a4455]">
                    <span>Average engagement:</span>
                    <span className="font-bold text-[#4b41e1]">
                      {hiringCreator.engagementRate}%
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4a4455]">
                    Campaign Brief / Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder={`Tell ${hiringCreator.name} about your brand and campaign scope...`}
                    className="w-full p-4 rounded-xl border border-[#ccc3d8] text-xs text-[#151c27] focus:outline-none focus:border-[#630ed4]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setHiringCreator(null)}
                    className="flex-1 py-3 text-xs font-bold text-[#4a4455] border border-[#ccc3d8] rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <Link
                    href={`/register?role=brand&creator=${hiringCreator.slug}`}
                    className="flex-1 py-3 text-center text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    Send Campaign Brief
                  </Link>
                </div>
              </m.div>
            </div>
          ) : null}
        </AnimatePresence>

        {/* Footer */}
        <footer className="bg-[#151c27] text-white border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-black bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] bg-clip-text text-transparent">
                CreatorNE
              </h2>
              <p className="text-xs leading-relaxed text-slate-300 max-w-xs">
                The bridge between global brands and Northeast India&apos;s unique creative energy.
              </p>
              <div className="flex gap-3 text-slate-400 pt-2">
                <Icons.Globe className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                <Icons.Instagram className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                <Icons.Youtube className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                Platform
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Browse Creators
                  </Link>
                </li>
                <li>
                  <Link href="/find-creators" className="hover:text-white transition-colors">
                    Brand Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                Legal
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                Newsletter
              </h4>
              <p className="text-xs text-slate-300">
                Get insights on the NE creator economy.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#7C3AED] w-full"
                />
                <button
                  type="submit"
                  className="bg-[#7C3AED] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#630ed4] transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="py-6 border-t border-white/10 text-center text-xs text-slate-400">
            © 2026 CreatorNE. Empowering Northeast India&apos;s Creative Economy.
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
}