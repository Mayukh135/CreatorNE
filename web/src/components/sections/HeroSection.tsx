"use client";

import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { m } from "framer-motion";
import { homeStats } from "@/lib/home-data";
import { cn, formatNumber } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Column */}
          <div className="lg:col-span-6 space-y-8">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20">
              <Icons.Sparkles className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-xs font-bold text-[#630ed4] tracking-wide">
                The Creator Economy of Northeast India
              </span>
            </div>

            {/* Main Headline with Squiggle */}
            <div className="relative space-y-1">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#151c27] leading-[1.08]">
                Discover.
                <br />
                Collaborate.
                <br />
                <span className="relative inline-block bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#EC4899] bg-clip-text text-transparent pb-3">
                  Grow Together.
                  <Image
                    src="/illustrations/hero-squiggle.svg"
                    alt=""
                    aria-hidden="true"
                    width={240}
                    height={24}
                    className="absolute -bottom-2 left-0 w-full h-5 pointer-events-none"
                  />
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-[#4a4455] leading-relaxed max-w-xl">
              CreatorNE is the premium discovery and collaboration platform built for verified Northeast creators and the brands that want to work with them.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                <span>Join as Creator</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/find-creators"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#151c27] px-7 py-3.5 rounded-full bg-white border border-[#ccc3d8]/60 shadow-sm hover:border-[#7C3AED] hover:text-[#630ed4] transition-all duration-200"
              >
                <span>Hire Creators</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Avatar Social Proof Pill */}
            <div className="inline-flex items-center gap-4 p-3 pr-6 rounded-3xl bg-white/90 border border-[#ccc3d8]/40 shadow-sm backdrop-blur-md">
              <div className="flex -space-x-2">
                {["SJ", "RB", "ND", "AR"].map((initials, idx) => (
                  <div
                    key={initials}
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white ring-2 ring-white shadow-sm",
                      idx === 0
                        ? "bg-[#7C3AED]"
                        : idx === 1
                          ? "bg-[#4F46E5]"
                          : idx === 2
                            ? "bg-[#EC4899]"
                            : "bg-[#06B6D4]"
                    )}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-[#151c27]">
                  500+ creators already in motion
                </p>
                <p className="text-[11px] text-[#7b7487]">
                  Trusted by Northeast storytellers and emerging brands.
                </p>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Northeast Reach Glassmorphism Card */}
          <div className="lg:col-span-6 relative">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-white/90 via-white/80 to-[#f0f3ff]/90 p-8 shadow-2xl shadow-purple-900/10 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#7C3AED]">
                    NORTHEAST REACH
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-[#151c27] mt-0.5">
                    Creators mapped by state, niche, and culture
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200/60 shrink-0">
                  Live discovery
                </span>
              </div>

              {/* NE Map Graphic Container */}
              <div className="relative my-6 flex items-center justify-center min-h-[320px]">
                <Image
                  src="/illustrations/ne-map.svg"
                  alt="Northeast India Creator Reach Map"
                  width={480}
                  height={420}
                  className="w-full h-auto max-h-[340px] object-contain filter drop-shadow-xl"
                  priority
                />

                {/* Floating Overlay Badge 1: Top Left */}
                <div className="absolute top-4 left-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/60 shadow-lg flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-purple-100 text-[#7C3AED]">
                    <Icons.Camera className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#151c27]">Travel creator</p>
                    <p className="text-[10px] font-medium text-[#7b7487]">
                      Meghalaya · 84K followers
                    </p>
                  </div>
                </div>

                {/* Floating Overlay Badge 2: Right */}
                <div className="absolute top-20 right-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/60 shadow-lg flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-blue-100 text-[#4F46E5]">
                    <Icons.Megaphone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#151c27]">Campaign ready</p>
                    <p className="text-[10px] font-medium text-[#7b7487]">
                      Assam · Brand brief matched
                    </p>
                  </div>
                </div>

                {/* Floating Overlay Badge 3: Bottom Left */}
                <div className="absolute bottom-4 left-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/60 shadow-lg flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-amber-100 text-amber-600">
                    <Icons.Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#151c27]">Verified creators</p>
                    <p className="text-[10px] font-medium text-[#7b7487]">
                      100+ successful collaborations
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Dots */}
              <div className="flex justify-center items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                <span className="w-2 h-2 rounded-full bg-[#ccc3d8]" />
              </div>
            </m.div>
          </div>
        </div>

        {/* Stats Metric Row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {homeStats.map((stat) => (
            <div
              key={stat.key}
              className="bg-white p-6 rounded-3xl border border-[#ccc3d8]/30 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-3xl md:text-4xl font-extrabold text-[#151c27]">
                {formatNumber(stat.value)}{stat.suffix}
              </p>
              <p className="text-xs font-semibold text-[#7b7487] mt-1">
                {stat.label}
              </p>
            </div>
          ))}

          {/* Arun Roy Creator Preview Badge */}
          <div className="bg-white/90 p-4 rounded-3xl border border-[#ccc3d8]/30 shadow-sm backdrop-blur-md flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
              AR
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-sm font-bold text-[#151c27] truncate">Arun Roy</p>
                <Icons.BadgeCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/10 shrink-0" />
              </div>
              <p className="text-[11px] text-[#7b7487] truncate">
                Tech · Agartala, Tripura
              </p>
              <div className="flex gap-3 text-[10px] font-bold text-[#4a4455] mt-1">
                <span>95.4K <span className="text-[#7b7487] font-normal">Followers</span></span>
                <span>250K <span className="text-[#7b7487] font-normal">Views</span></span>
                <span>6.8% <span className="text-[#7b7487] font-normal">Engagement</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
