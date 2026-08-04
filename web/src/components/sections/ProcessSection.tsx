"use client";

import { useState } from "react";
import { brandSteps, creatorSteps } from "@/lib/home-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  const [tab, setTab] = useState<"brands" | "creators">("brands");
  const steps = tab === "brands" ? brandSteps : creatorSteps;

  return (
    <section id="how-it-works" className="py-20 bg-white border-t border-[#ccc3d8]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="SIMPLE WORKFLOW"
            title="How CreatorNE Works"
            description="Whether you are a brand launching a campaign or a creator looking to get hired, onboarding takes less than 3 minutes."
          />

          {/* Toggle Switch */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#f0f3ff] border border-[#ccc3d8]/40 shrink-0">
            <button
              onClick={() => setTab("brands")}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200",
                tab === "brands"
                  ? "bg-[#630ed4] text-white shadow-md shadow-purple-600/20"
                  : "text-[#4a4455] hover:text-[#151c27]"
              )}
            >
              For Brands
            </button>
            <button
              onClick={() => setTab("creators")}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200",
                tab === "creators"
                  ? "bg-[#630ed4] text-white shadow-md shadow-purple-600/20"
                  : "text-[#4a4455] hover:text-[#151c27]"
              )}
            >
              For Creators
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="p-8 rounded-3xl bg-[#f9f9ff] border border-[#ccc3d8]/30 relative overflow-hidden group hover:border-[#7C3AED]/40 hover:shadow-lg transition-all"
            >
              <div className="text-4xl font-extrabold text-[#7C3AED]/20 mb-4 font-mono">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-[#151c27] mb-2">{step.title}</h3>
              <p className="text-sm text-[#4a4455] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
