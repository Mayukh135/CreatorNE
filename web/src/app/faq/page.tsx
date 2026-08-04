import type { Metadata } from "next";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { SectionHeader } from "@/components/content/SectionHeader";
import { staticFaqs } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about CreatorNE for creators, brands, and partners.",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(900px_420px_at_100%_0%,rgba(6,182,212,0.16),transparent),linear-gradient(to_bottom,#f8fafc,#f1f5f9)] pb-20 pt-24">
      <section className="container-app max-w-4xl">
        <SectionHeader
          eyebrow="FAQ"
          title="Answers to common questions"
          description="Everything from onboarding and messaging permissions to platform scope across Northeast India."
          align="center"
        />

        <div className="mt-8">
          <FaqAccordion items={staticFaqs} />
        </div>
      </section>
    </main>
  );
}
