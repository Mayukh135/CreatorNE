"use client";

import Link from "next/link";
import { BadgeCheck } from "@/lib/icons";
import { formatNumber } from "@/lib/utils";

export interface CreatorData {
  id: string;
  name: string;
  slug: string;
  avatar?: string;
  initials: string;
  category: string;
  city: string;
  state: string;
  bio: string;
  followers: number;
  avgViews: number;
  engagementRate: number;
  isVerified?: boolean;
}

export function CreatorCard({ creator }: { creator: CreatorData }) {
  return (
    <div className="bg-[#f9f9ff] rounded-3xl border border-[#ccc3d8]/30 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white font-bold flex items-center justify-center text-sm shadow-md">
            {creator.initials}
          </div>
          {creator.isVerified ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
              Verified
            </span>
          ) : null}
        </div>

        <div>
          <h4 className="text-lg font-bold text-[#151c27] group-hover:text-[#630ed4] transition-colors">
            {creator.name}
          </h4>
          <p className="text-xs text-[#7b7487] mt-0.5">
            {creator.city}, {creator.state} • {creator.category}
          </p>
        </div>

        <p className="text-xs text-[#4a4455] leading-relaxed line-clamp-2">
          {creator.bio}
        </p>

        {/* Stats Box */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-2xl border border-[#ccc3d8]/20 text-center">
          <div>
            <p className="text-[10px] text-[#7b7487] uppercase font-bold">Followers</p>
            <p className="text-xs font-bold text-[#151c27] mt-0.5">
              {formatNumber(creator.followers)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[#7b7487] uppercase font-bold">Views</p>
            <p className="text-xs font-bold text-[#151c27] mt-0.5">
              {formatNumber(creator.avgViews)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[#7b7487] uppercase font-bold">Eng. Rate</p>
            <p className="text-xs font-bold text-[#4F46E5] mt-0.5">
              {creator.engagementRate}%
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Link
          href={`/creators/${creator.slug}`}
          className="block w-full py-2.5 text-center text-xs font-bold text-[#630ed4] bg-white border border-[#630ed4] rounded-xl hover:bg-[#630ed4] hover:text-white transition-all duration-200"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
