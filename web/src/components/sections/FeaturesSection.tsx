"use client";

import { DynamicIcon } from "@/lib/icons";
import { homeFeatures } from "@/lib/home-data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white border-y border-[#ccc3d8]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <SectionHeading
          eyebrow="BUILT FOR NORTHEAST ECOSYSTEM"
          title="Why Northeast Brands & Creators Choose CreatorNE"
          description="Everything you need to discover, evaluate, and collaborate with verified regional storytellers in one clean interface."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-8 rounded-3xl bg-[#f9f9ff] border border-[#ccc3d8]/30 hover:border-[#7C3AED]/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white flex items-center justify-center mb-6 shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
                <DynamicIcon name={feature.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#151c27] mb-2">{feature.title}</h3>
              <p className="text-sm text-[#4a4455] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
