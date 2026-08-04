"use client";

import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  brandSteps,
  creatorSteps,
  featuredBrands,
  featuredCreators,
  homeCategories,
  homeFaqs,
  homeFeatures,
  homeStats,
  homeTestimonials,
} from "@/lib/home-data";
import { cn, formatNumber } from "@/lib/utils";

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

function AnimatedSectionHeading({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  accent: "green" | "pink" | "purple";
  description?: string;
}) {
  const accentAsset =
    accent === "green"
      ? "/illustrations/hero-squiggle.svg"
      : accent === "pink"
        ? "/illustrations/section-squiggle.svg"
        : "/illustrations/section-squiggle.svg";

  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary-600">
        {eyebrow}
      </p>
      <div className="mt-3 relative inline-flex max-w-full">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
          {title}
        </h2>
        <Image
          src={accentAsset}
          alt=""
          aria-hidden="true"
          width={320}
          height={64}
          className="pointer-events-none absolute -bottom-4 left-0 h-6 w-44 opacity-90 md:-bottom-5 md:h-8 md:w-56"
        />
      </div>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CountUpStat({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) {
      setCount(value);
      return;
    }

    let frame = 0;
    const duration = 1100;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [inView, prefersReducedMotion, value]);

  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  );
}

function CursorFollower() {
  const prefersReducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 520, damping: 34 });
  const y = useSpring(mouseY, { stiffness: 520, damping: 34 });
  const scale = useSpring(1, { stiffness: 380, damping: 28 });

  useEffect(() => {
    if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setIsReady(true);

    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a,button,input,textarea,select,[data-cursor-expand='true']");
      scale.set(interactive ? 5 : 1);
    };

    const handleLeave = () => scale.set(0.1);
    const handleEnter = () => scale.set(1);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("pointerenter", handleEnter);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointerenter", handleEnter);
    };
  }, [mouseX, mouseY, prefersReducedMotion, scale]);

  if (!isReady) {
    return null;
  }

  return (
    <m.div
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-2.5 w-2.5 rounded-full bg-white mix-blend-difference md:block"
      style={{ x, y, scale, translateX: "-50%", translateY: "-50%" }}
    />
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <m.div
      className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-gradient-to-r from-primary-600 via-secondary to-accent-pink"
      style={{ scaleX }}
    />
  );
}

function HeroSection({ scrollY }: { scrollY: ReturnType<typeof useScroll>["scrollY"] }) {
  const prefersReducedMotion = useReducedMotion();
  const mapY = useTransform(scrollY, [0, 700], [0, prefersReducedMotion ? 0 : -110]);
  const doodleY = useTransform(scrollY, [0, 700], [0, prefersReducedMotion ? 0 : -150]);

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.16),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(6,182,212,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(233,30,140,0.08),_transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[linear-gradient(180deg,rgba(248,250,252,0.92)_0%,rgba(248,250,252,0.66)_48%,rgba(248,250,252,0)_100%)]" />
      <div className="container-app pb-10 lg:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div className="relative z-10 max-w-2xl">
            <m.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 shadow-sm"
            >
              <Icons.Sparkles className="h-4 w-4 text-gold" />
              The Creator Economy of Northeast India
            </m.div>

            <div className="mt-6 space-y-2 text-5xl font-semibold tracking-tight text-text-primary md:text-6xl lg:text-7xl">
              <m.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.6 }}>
                Discover.
              </m.div>
              <m.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.6 }}>
                Collaborate.
              </m.div>
              <m.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48, duration: 0.6 }}
                className="relative inline-block text-gradient-animated"
              >
                Grow Together.
                <Image
                  src="/illustrations/hero-squiggle.svg"
                  alt=""
                  aria-hidden="true"
                  width={280}
                  height={70}
                  className="pointer-events-none absolute -bottom-6 left-0 h-7 w-64 md:-bottom-7 md:h-8 md:w-72"
                />
              </m.div>
            </div>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.55 }}
              className="mt-8 max-w-xl text-lg leading-8 text-text-secondary md:text-xl"
            >
              CreatorNE is the premium discovery and collaboration platform built for verified Northeast creators and the brands that want to work with them.
            </m.p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.74, duration: 0.45 }}>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-secondary px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_35px_rgba(124,58,237,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_45px_rgba(124,58,237,0.3)]"
                  data-cursor-expand="true"
                >
                  Join as Creator
                  <Icons.ArrowRight className="h-4 w-4" />
                </Link>
              </m.div>
              <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.82, duration: 0.45 }}>
                <Link
                  href="/find-creators"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-base font-semibold text-text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-600"
                  data-cursor-expand="true"
                >
                  Hire Creators
                  <Icons.MoveRight className="h-4 w-4" />
                </Link>
              </m.div>
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.55 }}
              className="mt-8 flex flex-wrap items-center gap-4 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-card backdrop-blur-md"
            >
              <div className="flex -space-x-2">
                {[
                  "SJ",
                  "RB",
                  "ND",
                  "AR",
                ].map((item) => (
                  <div key={item} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary-600 to-secondary text-xs font-semibold text-white shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">500+ creators already in motion</p>
                <p className="text-sm text-text-muted">Trusted by Northeast storytellers and emerging brands.</p>
              </div>
            </m.div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {homeStats.map((stat, index) => (
                <m.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05 + index * 0.08, duration: 0.45 }}
                  className="squircle border border-white/70 bg-white/85 p-4 shadow-card backdrop-blur-md"
                >
                  <div className="text-2xl font-semibold text-text-primary">
                    <CountUpStat value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                </m.div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
            <m.div
              style={{ y: mapY }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.95, duration: 0.7 }}
              className="relative overflow-hidden rounded-[34px] border border-white/80 bg-white/90 p-5 shadow-[0_30px_70px_rgba(15,23,42,0.18)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.14),_transparent_28%)]" />
              <div className="relative rounded-[28px] border border-white/70 bg-background p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-600">Northeast Reach</p>
                    <h3 className="mt-2 text-2xl font-semibold text-text-primary">Creators mapped by state, niche, and culture</h3>
                  </div>
                  <div className="hidden rounded-full border border-success/20 bg-success/10 px-3 py-1 text-sm font-medium text-success md:inline-flex">
                    Live discovery
                  </div>
                </div>

                <div className="relative mt-6 overflow-hidden rounded-[28px] border border-border-light bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,250,252,0.9))] p-4">
                  <Image
                    src="/illustrations/hero-sparkles.svg"
                    alt=""
                    aria-hidden="true"
                    width={120}
                    height={120}
                    className="absolute right-4 top-4 h-20 w-20 opacity-50"
                  />
                  <m.div style={{ y: prefersReducedMotion ? 0 : mapY }}>
                    <Image
                      src="/illustrations/ne-map.svg"
                      alt="Northeast India map illustration"
                      width={620}
                      height={520}
                      className="mx-auto h-auto w-full max-w-[500px] drop-shadow-[0_20px_45px_rgba(124,58,237,0.14)]"
                      priority
                    />
                  </m.div>

                  <m.div
                    style={{ y: prefersReducedMotion ? 0 : doodleY }}
                    animate={prefersReducedMotion ? undefined : { rotate: [-2, 2, -2] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-4 top-8 hidden rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-card md:block"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                      <Icons.Camera className="h-4 w-4 text-primary-600" />
                      Travel creator
                    </div>
                    <p className="mt-1 text-xs text-text-muted">Meghalaya · 84K followers</p>
                  </m.div>

                  <m.div
                    style={{ y: prefersReducedMotion ? 0 : doodleY }}
                    animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
                    transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-4 top-20 hidden rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-card md:block"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                      <Icons.Megaphone className="h-4 w-4 text-secondary" />
                      Campaign ready
                    </div>
                    <p className="mt-1 text-xs text-text-muted">Assam · Brand brief matched</p>
                  </m.div>

                  <m.div
                    style={{ y: prefersReducedMotion ? 0 : doodleY }}
                    animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="absolute left-6 bottom-6 hidden rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-card md:block"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                      <Icons.Sparkles className="h-4 w-4 text-gold" />
                      Verified creators
                    </div>
                    <p className="mt-1 text-xs text-text-muted">100+ successful collaborations</p>
                  </m.div>
                </div>
              </div>
            </m.div>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 lg:absolute lg:-left-6 lg:bottom-10 lg:mt-0 lg:w-auto lg:gap-4 lg:overflow-visible lg:pb-0">
              {featuredCreators.map((creator, index) => (
                <m.article
                  key={creator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05 + index * 0.1, duration: 0.5 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.02 }}
                  className="group relative min-w-[16rem] flex-1 overflow-hidden rounded-[28px] border border-white/75 bg-white/92 p-4 shadow-card backdrop-blur-md lg:absolute lg:w-[16rem]"
                  style={{
                    right: index % 2 === 0 ? `${4 + index * 2}%` : undefined,
                    left: index % 2 === 0 ? undefined : `${8 + index * 2}%`,
                    top: `${8 + index * 17}%`,
                  }}
                  data-cursor-expand="true"
                >
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10", creator.accent)} />
                  <div className="relative flex items-start gap-3">
                    <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-semibold text-white shadow-md", creator.accent)}>
                      {creator.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="truncate text-sm font-semibold text-text-primary">{creator.name}</h4>
                        {creator.isVerified ? <Icons.BadgeCheck className="h-4 w-4 text-success" /> : null}
                      </div>
                      <p className="mt-1 text-xs text-text-muted">{creator.category} · {creator.city}, {creator.state}</p>
                    </div>
                  </div>
                  <div className="relative mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-2xl bg-background px-2 py-2">
                      <span className="block font-semibold text-text-primary">{formatNumber(creator.followers)}</span>
                      <span className="text-text-muted">Followers</span>
                    </div>
                    <div className="rounded-2xl bg-background px-2 py-2">
                      <span className="block font-semibold text-text-primary">{formatNumber(creator.avgViews)}</span>
                      <span className="text-text-muted">Views</span>
                    </div>
                    <div className="rounded-2xl bg-background px-2 py-2">
                      <span className="block font-semibold text-text-primary">{creator.engagementRate.toFixed(1)}%</span>
                      <span className="text-text-muted">Engagement</span>
                    </div>
                  </div>
                  <div className="relative mt-3 flex flex-wrap gap-2">
                    {creator.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-text-secondary shadow-sm ring-1 ring-border-light">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="relative mt-4 rounded-2xl bg-background/90 p-3 text-xs leading-5 text-text-muted">
                    {creator.bio}
                  </div>
                  <div className="pointer-events-none absolute right-3 top-3 opacity-0 transition group-hover:opacity-100">
                    <div className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-primary-600 shadow-md ring-1 ring-border-light">
                      Quick preview
                    </div>
                  </div>
                </m.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="container-app pb-20 pt-20 lg:pt-28">
      <AnimatedSectionHeading
        eyebrow="Why CreatorNE"
        title={
          <>
            Everything you need to <span className="text-gradient-primary">succeed</span>
          </>
        }
        accent="green"
        description="A creator marketplace has to feel both trustworthy and exciting. These are the foundations that give the platform its momentum."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {homeFeatures.map((feature, index) => (
          <m.article
            key={feature.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.05, duration: 0.45 }}
            whileHover={{ y: -8 }}
            className="squircle group relative overflow-hidden border border-white/80 bg-white/90 p-6 shadow-card transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(124,58,237,0.14)]"
            data-cursor-expand="true"
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.08] transition-opacity group-hover:opacity-[0.12]", feature.accent)} />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-sm transition-transform group-hover:scale-105">
              <Icon name={feature.icon} className="h-5 w-5" />
            </div>
            <h3 className="relative mt-5 text-xl font-semibold text-text-primary">{feature.title}</h3>
            <p className="relative mt-3 text-sm leading-7 text-text-muted">{feature.description}</p>
          </m.article>
        ))}
      </div>
    </section>
  );
}

function FeaturedCreatorsSection() {
  return (
    <section className="container-app pb-20">
      <AnimatedSectionHeading
        eyebrow="Featured Creators"
        title={<>Creators with real audience momentum</>}
        accent="purple"
        description="A few of the profiles that show how the platform can surface verified talent with enough detail to make collaboration decisions faster."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featuredCreators.map((creator, index) => (
          <m.article
            key={creator.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group overflow-hidden rounded-[30px] border border-white/80 bg-white/90 shadow-card"
            data-cursor-expand="true"
          >
            <div className={cn("h-32 bg-gradient-to-br", creator.accent)} />
            <div className="relative px-5 pb-5 pt-0">
              <div className="-mt-10 flex items-end justify-between gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-4 border-white bg-white text-2xl font-semibold text-primary-700 shadow-[0_14px_30px_rgba(15,23,42,0.14)]">
                  {creator.initials}
                </div>
                {creator.isVerified ? (
                  <div className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                    Verified
                  </div>
                ) : null}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">{creator.name}</h3>
              <p className="mt-1 text-sm text-text-muted">{creator.category} · {creator.city}, {creator.state}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">{creator.bio}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-2xl bg-background px-2 py-2">
                  <span className="block font-semibold text-text-primary">{formatNumber(creator.followers)}</span>
                  <span className="text-text-muted">Followers</span>
                </div>
                <div className="rounded-2xl bg-background px-2 py-2">
                  <span className="block font-semibold text-text-primary">{formatNumber(creator.avgViews)}</span>
                  <span className="text-text-muted">Views</span>
                </div>
                <div className="rounded-2xl bg-background px-2 py-2">
                  <span className="block font-semibold text-text-primary">{creator.engagementRate.toFixed(1)}%</span>
                  <span className="text-text-muted">Engagement</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {creator.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-primary-50 px-3 py-1 text-[11px] font-medium text-primary-700">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pointer-events-none absolute right-5 top-5 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-primary-600 opacity-0 shadow-md transition group-hover:opacity-100">
                Quick preview
              </div>
            </div>
          </m.article>
        ))}
      </div>
    </section>
  );
}

function FeaturedBrandsSection() {
  const marqueeBrands = [...featuredBrands, ...featuredBrands];

  return (
    <section className="container-app pb-20">
      <AnimatedSectionHeading
        eyebrow="Featured Brands"
        title={<>Brands ready to collaborate with the region&apos;s strongest creators</>}
        accent="pink"
        description="The marquee treatment gives the brand layer the kinetic feel planned for the homepage while keeping the content readable and fast."
      />

      <div className="marquee-pause mt-10 overflow-hidden rounded-[34px] border border-white/80 bg-white/85 p-4 shadow-card backdrop-blur-md">
        <div className="marquee-track flex min-w-max items-center gap-4">
          {marqueeBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex min-w-[18rem] items-center gap-4 rounded-[28px] border border-border-light bg-background px-4 py-4 shadow-sm"
            >
              <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-semibold text-white shadow-sm", brand.accent)}>
                {brand.logoInitials}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-text-primary">{brand.brandName}</h3>
                <p className="text-sm text-text-muted">{brand.industry} · {brand.targetState}</p>
              </div>
              <div className="ml-auto rounded-full bg-white px-3 py-1.5 text-xs font-medium text-text-secondary shadow-sm ring-1 ring-border-light">
                {brand.campaignGoal}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const [activeCategory, setActiveCategory] = useState(homeCategories[0]?.slug ?? "travel");

  return (
    <section className="container-app pb-20">
      <AnimatedSectionHeading
        eyebrow="Explore Categories"
        title={<>Find creators in every niche</>}
        accent="green"
        description="The category bar is intentionally scrollable on mobile so the experience stays touch-first without collapsing the density of the design."
      />

      <div className="mt-8 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex min-w-max gap-3">
          {homeCategories.map((category, index) => {
            const IconName = resolveIcon(category.icon);

            return (
              <m.button
                key={category.slug}
                type="button"
                onClick={() => setActiveCategory(category.slug)}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "relative flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition",
                  activeCategory === category.slug
                    ? "border-primary-200 bg-primary-50 text-primary-700 shadow-sm"
                    : "border-border bg-white text-text-secondary hover:border-primary-200 hover:text-primary-600",
                )}
                data-cursor-expand="true"
              >
                {IconName ? <Icon name={category.icon} className="h-4 w-4" /> : null}
                {category.name}
                <span className="ml-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-text-muted ring-1 ring-border-light">
                  {category.creatorCount}
                </span>
              </m.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<"creator" | "brand">("creator");
  const activeSteps = activeTab === "creator" ? creatorSteps : brandSteps;

  return (
    <section id="how-it-works" className="container-app pb-20">
      <AnimatedSectionHeading
        eyebrow="How It Works"
        title={<>Simple flows for creators and brands</>}
        accent="purple"
        description="The two-path structure keeps the onboarding story clear while letting each audience see their own next step immediately."
      />

      <div className="mt-8 inline-flex rounded-full border border-border bg-white p-1 shadow-sm">
        {[
          { key: "creator", label: "For Creators" },
          { key: "brand", label: "For Brands" },
        ].map((tab) => {
          const active = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as "creator" | "brand")}
              className={cn(
                "relative rounded-full px-4 py-2.5 text-sm font-semibold transition",
                active ? "bg-primary-600 text-white shadow-sm" : "text-text-muted hover:text-text-primary",
              )}
              data-cursor-expand="true"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <m.div
          key={activeTab}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
          className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5"
        >
          {activeSteps.map((step, index) => (
            <m.article
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="squircle border border-white/80 bg-white/90 p-5 shadow-card"
              data-cursor-expand="true"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-sm">
                <Icon name={step.icon} className="h-5 w-5" />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-text-light">
                Step {index + 1}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-text-muted">{step.description}</p>
            </m.article>
          ))}
        </m.div>
      </AnimatePresence>
    </section>
  );
}

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeTestimonial = homeTestimonials[activeIndex];

  useEffect(() => {
    if (paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % homeTestimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const paginate = (nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex((current) => {
      const next = current + nextDirection;

      if (next < 0) {
        return homeTestimonials.length - 1;
      }

      return next % homeTestimonials.length;
    });
  };

  return (
    <section className="container-app pb-20" id="testimonials">
      <AnimatedSectionHeading
        eyebrow="Testimonials"
        title={<>Creators and brands feel the difference</>}
        accent="pink"
        description="The carousel stays lightweight but still uses movement and momentum to create the sense of an active, living platform."
      />

      <div
        className="mt-10 overflow-hidden rounded-[34px] border border-white/80 bg-white/90 p-6 shadow-card md:p-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <m.div
            key={activeTestimonial.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration: 0.42 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              const swipe = info.offset.x * info.velocity.x;

              if (swipe < -8000) {
                paginate(1);
              } else if (swipe > 8000) {
                paginate(-1);
              }
            }}
            className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
                <Icons.MessageSquareQuote className="h-4 w-4" />
                Trusted collaboration feedback
              </div>
              <p className="mt-6 text-2xl font-medium leading-9 text-text-primary md:text-3xl md:leading-[1.35]">
                “{activeTestimonial.content}”
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-semibold text-white shadow-sm", activeTestimonial.accent)}>
                  {activeTestimonial.avatar}
                </div>
                <div>
                  <p className="text-lg font-semibold text-text-primary">{activeTestimonial.name}</p>
                  <p className="text-sm text-text-muted">{activeTestimonial.role}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md rounded-[32px] border border-border-light bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.95))] p-5 shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
                <div className="rounded-[28px] border border-border-light bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.26em] text-text-light">Live pulse</span>
                    <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">Swipe to switch</span>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {homeTestimonials.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setDirection(index > activeIndex ? 1 : -1);
                          setActiveIndex(index);
                        }}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition",
                          index === activeIndex
                            ? "border-primary-200 bg-primary-50 shadow-sm"
                            : "border-border-light bg-background hover:border-primary-200",
                        )}
                        data-cursor-expand="true"
                      >
                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-xs font-semibold text-white", item.accent)}>
                          {item.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold text-text-primary">{item.name}</div>
                          <div className="truncate text-xs text-text-muted">{item.role}</div>
                        </div>
                        <div className={cn("h-2.5 w-2.5 rounded-full", index === activeIndex ? "bg-primary-600" : "bg-border")}></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {homeTestimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === activeIndex ? "w-10 bg-primary-600" : "w-2.5 bg-border",
                )}
                aria-label={`Show testimonial from ${item.name}`}
                data-cursor-expand="true"
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-text-primary transition hover:border-primary-200 hover:text-primary-600"
              aria-label="Previous testimonial"
              data-cursor-expand="true"
            >
              <Icons.ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-text-primary transition hover:border-primary-200 hover:text-primary-600"
              aria-label="Next testimonial"
              data-cursor-expand="true"
            >
              <Icons.ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="container-app pb-20">
      <AnimatedSectionHeading
        eyebrow="FAQ"
        title={<>Common questions, answered cleanly</>}
        accent="purple"
        description="The FAQ keeps the launch story practical and should be easy to extend once the database-backed content arrives."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {homeFaqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <m.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="squircle border border-white/80 bg-white/90 shadow-card"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                data-cursor-expand="true"
              >
                <span className="text-base font-semibold text-text-primary">{faq.question}</span>
                <Icons.ChevronDown className={cn("h-5 w-5 shrink-0 text-primary-600 transition", isOpen ? "rotate-180" : "rotate-0")} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm leading-7 text-text-muted">
                      {faq.answer}
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </m.div>
          );
        })}
      </div>
    </section>
  );
}

function AppCtaSection() {
  return (
    <section className="container-app pb-20">
      <m.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-[38px] border border-white/80 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary p-6 shadow-[0_30px_80px_rgba(124,58,237,0.22)] md:p-8"
      >
        <Image
          src="/illustrations/cta-wave.svg"
          alt=""
          aria-hidden="true"
          width={1440}
          height={260}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full object-cover opacity-70"
        />
        <div className="relative grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/80">Mobile-ready growth</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Take CreatorNE with you, everywhere.</h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/85 md:text-lg">
              The mobile experience keeps the same premium energy as the homepage while making it easier to discover, shortlist, and collaborate on the move.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-700 shadow-sm transition hover:-translate-y-0.5"
                data-cursor-expand="true"
              >
                Join as Creator
              </Link>
              <Link
                href="/find-creators"
                className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15"
                data-cursor-expand="true"
              >
                Hire Creators
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/85">
              {[
                "Touch-friendly",
                "Fast discovery",
                "Secure onboarding",
                "Built for mobile first",
              ].map((item) => (
                <span key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[430px]">
            <m.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6 }}
              animate={{ y: [0, -8, 0] }}
              className="relative overflow-hidden rounded-[34px] border border-white/20 bg-white/95 p-4 text-text-primary shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
            >
              <div className="rounded-[28px] border border-border-light bg-background p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary-600">CreatorNE app</p>
                    <h3 className="mt-1 text-lg font-semibold">Discovery in your pocket</h3>
                  </div>
                  <div className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">Live</div>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { title: "Travel creators in Meghalaya", detail: "12 verified results found" },
                    { title: "Fashion creators in Assam", detail: "3 shortlists ready" },
                    { title: "Brand message inbox", detail: "2 unread replies" },
                  ].map((item, index) => (
                    <div key={item.title} className="rounded-3xl border border-border-light bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br text-white", index === 0 ? "from-primary-600 to-secondary" : index === 1 ? "from-accent-pink to-primary-600" : "from-success to-secondary")}>
                          <Icons.Smartphone className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                          <p className="text-xs text-text-muted">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </m.div>
    </section>
  );
}


function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary-600 shadow-[0_18px_32px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5"
      aria-label="Scroll back to top"
      data-cursor-expand="true"
    >
      <Icons.MoveUp className="h-4 w-4" />
    </button>
  );
}

export function HomePage() {
  const { scrollY } = useScroll();

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen overflow-hidden bg-background text-text-primary">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.08),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.08),_transparent_34%)]" />
        <ScrollProgressBar />
        <CursorFollower />
        <Navbar />

        <main>
          <HeroSection scrollY={scrollY} />
          <FeaturesSection />
          <FeaturedCreatorsSection />
          <FeaturedBrandsSection />
          <CategoriesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <FaqSection />
          <AppCtaSection />
        </main>

        <Footer />
        <ScrollToTopButton />
      </div>
    </LazyMotion>
  );
}