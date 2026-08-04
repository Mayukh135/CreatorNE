"use client";

import { homeTestimonials } from "@/lib/home-data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#f9f9ff]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title="What Brands & Creators Are Saying"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {homeTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-white border border-[#ccc3d8]/30 shadow-sm space-y-6 flex flex-col justify-between"
            >
              <p className="text-base text-[#4a4455] leading-relaxed italic">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white font-bold flex items-center justify-center text-xs shadow-md">
                  {item.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#151c27]">{item.name}</p>
                  <p className="text-xs text-[#7b7487]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
