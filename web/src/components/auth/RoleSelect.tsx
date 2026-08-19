"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { SPRING } from "@/lib/constants";

type Audience = "creator" | "brand";

interface RoleSelectProps {
  onSelect: (role: Audience) => void;
}

export function RoleSelect({ onSelect }: RoleSelectProps) {
  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-6 sm:space-y-8">
        {/* Cards — stack on very small, side-by-side from 360px+ */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Creator card */}
          <m.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING.smooth, delay: 0.1 }}
            onClick={() => onSelect("creator")}
            className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 via-amber-50/80 to-orange-50 p-4 text-left transition hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-200/30 sm:rounded-[20px] sm:p-5"
          >
            {/* Icon */}
            <div className="mb-4 flex h-12 w-full items-center justify-center rounded-lg bg-amber-100/60 sm:mb-6 sm:h-16 sm:rounded-xl">
              <span className="text-2xl sm:text-3xl">🎬</span>
            </div>

            {/* Content */}
            <h3 className="text-sm font-bold text-slate-800 sm:text-[15px]">
              I&apos;m a Creator.
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 sm:mt-1 sm:text-xs">
              Connect with brands, directly.
            </p>
            <p className="mt-1.5 text-[10px] font-medium text-violet-600 sm:mt-2 sm:text-[11px]">
              No fee. No cut.
            </p>

            {/* Arrow */}
            <div className="mt-3 flex items-center justify-between sm:mt-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-black/[0.04] text-xs sm:h-8 sm:w-8 sm:rounded-lg sm:text-sm">
                ▶
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.06] text-sm transition group-hover:translate-x-1 sm:h-8 sm:w-8 sm:text-base">
                →
              </span>
            </div>
          </m.button>

          {/* Brand card */}
          <m.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING.smooth, delay: 0.2 }}
            onClick={() => onSelect("brand")}
            className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-blue-50/80 to-sky-50 p-4 text-left transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200/30 sm:rounded-[20px] sm:p-5"
          >
            {/* Icon */}
            <div className="mb-4 flex h-12 w-full items-center justify-center rounded-lg bg-blue-100/60 sm:mb-6 sm:h-16 sm:rounded-xl">
              <span className="text-2xl sm:text-3xl">💼</span>
            </div>

            {/* Content */}
            <h3 className="text-sm font-bold text-slate-800 sm:text-[15px]">
              I&apos;m a Brand.
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 sm:mt-1 sm:text-xs">
              Creators, talent, celebs... in your reach.
            </p>
            <p className="mt-1.5 text-[10px] font-medium text-slate-400 sm:mt-2 sm:text-[11px]">
              Connect directly. Zero cost.
            </p>

            {/* Arrow */}
            <div className="mt-3 flex items-center justify-between sm:mt-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-black/[0.04] text-xs sm:h-8 sm:w-8 sm:rounded-lg sm:text-sm">
                📧
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.06] text-sm transition group-hover:translate-x-1 sm:h-8 sm:w-8 sm:text-base">
                →
              </span>
            </div>
          </m.button>
        </div>

        {/* Google for Startups badge */}
        <div className="flex items-center justify-center gap-0.5 text-xs sm:text-sm">
          <span className="font-medium text-[#4285f4]">G</span>
          <span className="font-medium text-[#ea4335]">o</span>
          <span className="font-medium text-[#fbbc05]">o</span>
          <span className="font-medium text-[#4285f4]">g</span>
          <span className="font-medium text-[#ea4335]">l</span>
          <span className="font-medium text-[#34a853]">e</span>
          <span className="ml-1 text-slate-400"> for Startups</span>
        </div>
      </div>
    </LazyMotion>
  );
}
