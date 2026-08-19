import type { Metadata } from "next";
import { CookiePolicyContent } from "@/components/pages/CookiePolicyContent";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn about CreatorNE's cookie practices, privacy rights under GDPR and CCPA, and how to manage your cookie preferences.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(1000px_450px_at_0%_0%,rgba(124,58,237,0.12),transparent),linear-gradient(to_bottom,#f8fafc,#eef2ff)] pt-28 pb-20 lg:pt-32">
      <section className="container-app max-w-4xl">
        <CookiePolicyContent />
      </section>
    </main>
  );
}
