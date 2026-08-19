"use client";

import { useMemo, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { PageBackground } from "@/components/layout/PageBackground";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FeaturedCreatorsSection } from "@/components/sections/FeaturedCreatorsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { AppCtaSection } from "@/components/sections/AppCtaSection";
import { featuredCreators } from "@/lib/home-data";

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCreators = useMemo(() => {
    if (!activeCategory) {
      return featuredCreators;
    }
    return featuredCreators.filter(
      (creator) => creator.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  const handleSelectCategory = (categoryName: string) => {
    setActiveCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen bg-[#f9f9ff] text-[#151c27] font-sans antialiased overflow-x-hidden">
        <PageBackground />

        <main className="relative z-10">
          <HeroSection />
          <FeaturesSection />
          <CategoriesSection
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />
          <FeaturedCreatorsSection creators={filteredCreators} />
          <ProcessSection />
          <TestimonialsSection />
          <FaqSection />
          <AppCtaSection />
        </main>
      </div>
    </LazyMotion>
  );
}