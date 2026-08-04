"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  showSquiggle?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  showSquiggle = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-3",
        align === "center" ? "mx-auto text-center" : "",
        className
      )}
    >
      <p className="text-xs font-extrabold uppercase tracking-widest text-[#7C3AED]">
        {eyebrow}
      </p>

      <div className="relative inline-block">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#151c27]">
          {title}
        </h2>
        {showSquiggle ? (
          <Image
            src="/illustrations/hero-squiggle.svg"
            alt=""
            aria-hidden="true"
            width={220}
            height={20}
            className={cn(
              "pointer-events-none absolute -bottom-3 h-4 w-44 opacity-80",
              align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
            )}
          />
        ) : null}
      </div>

      {description ? (
        <p className="text-base md:text-lg text-[#4a4455] leading-relaxed pt-2">
          {description}
        </p>
      ) : null}
    </div>
  );
}
