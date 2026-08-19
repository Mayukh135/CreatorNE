import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { legalLastUpdated, privacySections } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CreatorNE Privacy Policy for creators, brands, and platform users.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,#f1f5f9)] pt-28 pb-20 lg:pt-32">
      <section className="container-app max-w-4xl space-y-8">
        <SectionHeader
          eyebrow="Legal"
          title="Privacy Policy"
          description="How CreatorNE collects, uses, protects, and respects platform data under GDPR & CCPA frameworks."
        />
        <p className="text-xs text-text-muted">Last updated: {legalLastUpdated}</p>

        {/* Cookie Policy Quick Reference Banner */}
        <div className="p-6 rounded-3xl bg-white border border-[#ccc3d8]/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#151c27]">
              Cookie Consent &amp; Tracking
            </h3>
            <p className="text-xs text-[#4a4455] mt-0.5">
              Learn how we use essential, analytics, and marketing cookies on CreatorNE.
            </p>
          </div>
          <Link
            href="/cookie-policy"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#630ed4] bg-white border border-[#630ed4] px-5 py-2.5 rounded-full hover:bg-[#630ed4] hover:text-white transition-all shrink-0"
          >
            Read Cookie Policy →
          </Link>
        </div>

        <div className="space-y-5">
          {privacySections.map((section) => (
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

          {/* GDPR & CCPA Rights Section */}
          <article className="squircle border border-border/70 bg-white/90 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-text-primary">GDPR &amp; CCPA User Rights</h2>
            <p className="text-sm leading-7 text-text-secondary md:text-base">
              As a user of CreatorNE, you have full control over your personal information:
            </p>
            <ul className="list-disc list-inside text-sm text-text-secondary space-y-1.5 pt-1">
              <li><strong>Right to Access &amp; Portability:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Erasure (Right to be Forgotten):</strong> Request the permanent deletion of your account and personal records.</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete profile data in your settings.</li>
              <li><strong>CCPA Opt-Out:</strong> Exercise your right to opt-out of third-party data sharing or targeted advertising.</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
