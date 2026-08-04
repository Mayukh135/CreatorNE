import type { Metadata } from "next";
import Link from "next/link";
import { Compass, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { SectionHeader } from "@/components/content/SectionHeader";
import { APP_CONFIG } from "@/lib/constants";
import { aboutMilestones, aboutValues, contentPageSummary } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about CreatorNE's mission, values, and long-term vision for creator-brand collaborations across Northeast India.",
};

const icons = [Compass, ShieldCheck, UsersRound, Sparkles] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_500px_at_0%_-10%,rgba(59,130,246,0.15),transparent),radial-gradient(900px_450px_at_100%_0%,rgba(233,30,140,0.14),transparent),linear-gradient(to_bottom,#f8fafc,#eef2ff)] pb-20 pt-24">
      <section className="container-app">
        <SectionHeader
          eyebrow="About CreatorNE"
          title="Built for the creator economy of Northeast India"
          description={contentPageSummary}
        />

        <div className="mt-8 squircle border border-border/70 bg-white/85 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:p-8">
          <p className="text-base leading-8 text-text-secondary md:text-lg">
            {APP_CONFIG.name} exists to close the gap between regional creator talent and brand demand.
            We focus on discoverability, trust, and collaboration structure so that brands can launch
            better campaigns and creators can grow with clear opportunities.
          </p>
        </div>
      </section>

      <section className="container-app mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">What we value</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {aboutValues.map((value, index) => {
            const Icon = icons[index % icons.length];

            return (
              <article
                key={value.title}
                className="squircle border border-border/70 bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
              >
                <div className="inline-flex rounded-xl bg-primary-50 p-2 text-primary-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-text-primary">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-text-secondary md:text-base">{value.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-app mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">Roadmap markers</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {aboutMilestones.map((milestone) => (
            <article key={milestone.title} className="squircle border border-border/70 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600">{milestone.year}</p>
              <h3 className="mt-2 text-lg font-semibold text-text-primary">{milestone.title}</h3>
              <p className="mt-2 text-sm leading-7 text-text-secondary md:text-base">{milestone.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-app mt-14">
        <div className="squircle bg-gradient-to-r from-primary-700 via-primary-600 to-secondary p-[1px] shadow-[0_20px_48px_rgba(76,29,149,0.25)]">
          <div className="squircle bg-white px-6 py-7 md:flex md:items-center md:justify-between md:px-8">
            <div>
              <h2 className="text-xl font-semibold text-text-primary md:text-2xl">Ready to collaborate better?</h2>
              <p className="mt-2 text-sm text-text-secondary md:text-base">
                Join as a creator or start discovering creators for your next campaign.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 md:mt-0">
              <Link
                href="/register"
                className="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                Join as Creator
              </Link>
              <Link
                href="/find-creators"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:border-primary-300 hover:text-primary-700"
              >
                Find Creators
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
