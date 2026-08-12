"use client";

import Link from "next/link";
import { ArrowRight } from "@/lib/icons";
import { CreatorCard, type CreatorData } from "@/components/ui/CreatorCard";

interface FeaturedCreatorsSectionProps {
  creators: CreatorData[];
}

export function FeaturedCreatorsSection({ creators }: FeaturedCreatorsSectionProps) {
  return (
    <section className="py-20 bg-white border-t border-[#ccc3d8]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#7C3AED]">
              VETTED CREATORS
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#151c27] mt-2">
              Featured Northeast Talent
            </h2>
          </div>
          <Link
            href="/find-creators"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#630ed4] hover:text-[#7C3AED] transition-colors"
          >
            <span>Search full directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Creator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </section>
  );
}
