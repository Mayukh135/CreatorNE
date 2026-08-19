import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { legalLastUpdated, termsSections } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "CreatorNE terms and conditions for use of the platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,#eff6ff)] pb-20 pt-24">
      <section className="container-app max-w-4xl">
        <SectionHeader
          eyebrow="Legal"
          title="Terms & Conditions"
          description="Platform usage terms for creators, brands, and admins."
        />
        <p className="mt-3 text-sm text-text-muted">Last updated: {legalLastUpdated}</p>

        <div className="mt-7 space-y-5">
          {termsSections.map((section) => (
            <article key={section.title} className="squircle border border-border/70 bg-white/90 p-6">
              <h2 className="text-xl font-semibold text-text-primary">{section.title}</h2>
              <ul className="mt-3 space-y-2">
                {section.points.map((point) => (
                  <li key={point} className="text-sm leading-7 text-text-secondary md:text-base">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
