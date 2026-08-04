"use client";

import Image from "next/image";

export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Radial Glow 1 - Top Left Purple Glow */}
      <div
        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-30 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(124,58,237,0) 70%)",
        }}
      />

      {/* Radial Glow 2 - Top Right Indigo Glow */}
      <div
        className="absolute top-20 -right-40 h-[700px] w-[700px] rounded-full opacity-25 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.35) 0%, rgba(79,70,229,0) 70%)",
        }}
      />

      {/* Radial Glow 3 - Center Pink Accent Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full opacity-15 blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(236,72,153,0) 70%)",
        }}
      />

      {/* Radial Glow 4 - Bottom Cyan/Teal Glow */}
      <div
        className="absolute -bottom-40 left-10 h-[650px] w-[650px] rounded-full opacity-20 blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(6,182,212,0) 70%)",
        }}
      />

      {/* Floating Ambient Sparkles Decorative Vectors */}
      <div className="absolute top-36 left-12 opacity-40">
        <Image
          src="/illustrations/sparkle-star.svg"
          alt=""
          aria-hidden="true"
          width={28}
          height={28}
          className="w-7 h-7"
        />
      </div>

      <div className="absolute top-96 right-16 opacity-35">
        <Image
          src="/illustrations/sparkle-burst.svg"
          alt=""
          aria-hidden="true"
          width={36}
          height={36}
          className="w-9 h-9"
        />
      </div>
    </div>
  );
}
