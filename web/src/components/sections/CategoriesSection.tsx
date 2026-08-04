"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { homeCategories } from "@/lib/home-data";
import { cn } from "@/lib/utils";

type MotionIconName = keyof typeof Icons;

function resolveIcon(name: string) {
  return Icons[name as MotionIconName] as LucideIcon | undefined;
}

function Icon({ name, className }: { name: string; className?: string }) {
  const ResolvedIcon = resolveIcon(name);

  if (!ResolvedIcon) {
    return null;
  }

  return <ResolvedIcon className={className} aria-hidden="true" />;
}

interface CategoriesSectionProps {
  activeCategory: string | null;
  onSelectCategory: (categoryName: string) => void;
}

export function CategoriesSection({
  activeCategory,
  onSelectCategory,
}: CategoriesSectionProps) {
  return (
    <section className="py-20 bg-[#f9f9ff]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#7C3AED]">
              EXPLORE NICHES
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#151c27] mt-2">
              Browse Creators by Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#630ed4] hover:text-[#7C3AED] transition-colors"
          >
            <span>View all categories</span>
            <Icons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {homeCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => onSelectCategory(category.name)}
              className={cn(
                "p-5 rounded-2xl text-left border transition-all duration-200 group flex flex-col justify-between min-h-[120px]",
                activeCategory === category.name
                  ? "bg-[#630ed4] text-white border-[#630ed4] shadow-lg shadow-purple-600/30"
                  : "bg-white text-[#151c27] border-[#ccc3d8]/30 hover:border-[#7C3AED]/40 hover:shadow-md"
              )}
            >
              <Icon
                name={category.icon}
                className={cn(
                  "w-6 h-6 mb-3 transition-colors",
                  activeCategory === category.name
                    ? "text-white"
                    : "text-[#7C3AED] group-hover:text-[#630ed4]"
                )}
              />
              <div>
                <p className="text-sm font-bold truncate">{category.name}</p>
                <p
                  className={cn(
                    "text-[11px] mt-0.5",
                    activeCategory === category.name
                      ? "text-white/80"
                      : "text-[#7b7487]"
                  )}
                >
                  {category.creatorCount} creators
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
