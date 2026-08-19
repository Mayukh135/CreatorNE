import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/pages/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with CreatorNE for partnerships, creator support, and platform assistance.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_540px_at_0%_0%,rgba(59,130,246,0.14),transparent),linear-gradient(to_bottom,#f8fafc,#ecfeff)] pb-20 pt-24">
      <section className="container-app">
        <SectionHeader
          eyebrow="Contact"
          title="Talk to the CreatorNE team"
          description="Partnership inquiries, creator onboarding help, and support requests all start here."
        />
        <ContactForm />
      </section>
    </main>
  );
}
