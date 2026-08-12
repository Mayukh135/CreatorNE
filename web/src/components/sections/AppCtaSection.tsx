"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "@/lib/icons";

export function AppCtaSection() {
  return (
    <section className="py-20 bg-[#f9f9ff]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#630ed4] via-[#7C3AED] to-[#4F46E5] p-10 md:p-16 text-white shadow-2xl shadow-purple-900/30">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ready to power your brand in Northeast India?</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Start collaborating with verified Northeast creators today.
            </h2>

            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              Join hundreds of brands and storytellers discovering, matching, and building authentic regional campaigns.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#630ed4] bg-white px-7 py-3.5 rounded-full shadow-lg hover:bg-slate-100 transition-all"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-white border border-white/40 px-7 py-3.5 rounded-full hover:bg-white/10 transition-all"
              >
                <span>Talk to Sales</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
