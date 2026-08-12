"use client";

import Link from "next/link";
import { ShieldCheck, Sliders } from "@/lib/icons";
import { useCookieConsent } from "@/components/common/CookieConsentContext";

export function CookiePolicyContent() {
  const { openModal } = useCookieConsent();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-xs font-bold text-[#630ed4]">
          <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
          <span>Legal & Transparency</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#151c27]">
          Cookie Policy
        </h1>
        <p className="text-sm text-[#7b7487]">
          Last updated: February 2026 • Compliant with GDPR &amp; CCPA Guidelines
        </p>
      </div>

      {/* Interactive Controls Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#ccc3d8]/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#151c27]">
            Your Cookie Settings
          </h3>
          <p className="text-xs text-[#4a4455] mt-0.5">
            You can change your consent preferences at any time while browsing CreatorNE.
          </p>
        </div>
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center gap-2 text-xs font-bold text-white px-5 py-3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] shadow-md shadow-purple-500/20 hover:shadow-purple-500/35 transition-all shrink-0"
        >
          <Sliders className="w-4 h-4" />
          <span>Manage Preferences</span>
        </button>
      </div>

      {/* Policy Sections */}
      <div className="space-y-6">
        <section className="p-6 rounded-3xl bg-white border border-[#ccc3d8]/30 space-y-3">
          <h2 className="text-xl font-bold text-[#151c27]">1. What Are Cookies?</h2>
          <p className="text-sm text-[#4a4455] leading-relaxed">
            Cookies are small text files stored on your computer or mobile device when you visit a website. They help websites recognize your device, remember preferences, and provide a seamless navigation experience.
          </p>
        </section>

        <section className="p-6 rounded-3xl bg-white border border-[#ccc3d8]/30 space-y-4">
          <h2 className="text-xl font-bold text-[#151c27]">2. How We Use Cookies</h2>
          <p className="text-sm text-[#4a4455] leading-relaxed">
            CreatorNE uses both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until deleted or expired) to serve the following categories:
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#f9f9ff] border border-[#ccc3d8]/20">
              <h3 className="text-sm font-bold text-[#151c27]">A. Essential Cookies (Strictly Necessary)</h3>
              <p className="text-xs text-[#4a4455] mt-1 leading-relaxed">
                Required for security verification, authentication, session maintenance, and CSRF protection. These cookies are always active and cannot be switched off.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f9f9ff] border border-[#ccc3d8]/20">
              <h3 className="text-sm font-bold text-[#151c27]">B. Analytics &amp; Performance Cookies</h3>
              <p className="text-xs text-[#4a4455] mt-1 leading-relaxed">
                Helps us gather aggregate data on page views, audience geographic distribution across Northeast India, and technical performance. These scripts only load when you grant consent.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f9f9ff] border border-[#ccc3d8]/20">
              <h3 className="text-sm font-bold text-[#151c27]">C. Marketing &amp; Targeting Cookies</h3>
              <p className="text-xs text-[#4a4455] mt-1 leading-relaxed">
                Enables tailored campaign announcements, brand-creator match recommendations, and conversion tracking. These cookies require explicit consent.
              </p>
            </div>
          </div>
        </section>

        <section className="p-6 rounded-3xl bg-white border border-[#ccc3d8]/30 space-y-3">
          <h2 className="text-xl font-bold text-[#151c27]">3. GDPR &amp; CCPA Rights</h2>
          <p className="text-sm text-[#4a4455] leading-relaxed">
            Under the EU General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA):
          </p>
          <ul className="list-disc list-inside text-sm text-[#4a4455] space-y-1.5 pt-1">
            <li>You have the right to grant or withdraw consent for non-essential cookies at any time.</li>
            <li>You have the right to request access, correction, or deletion of your personal data.</li>
            <li>You can exercise your CCPA right to opt-out of the sale or sharing of personal information.</li>
          </ul>
        </section>

        <section className="p-6 rounded-3xl bg-white border border-[#ccc3d8]/30 space-y-3">
          <h2 className="text-xl font-bold text-[#151c27]">4. Contact Us</h2>
          <p className="text-sm text-[#4a4455] leading-relaxed">
            If you have questions regarding our Cookie Policy or data privacy practices, please contact our Data Protection Lead at{" "}
            <a href="mailto:privacy@creatorne.in" className="font-bold text-[#630ed4] hover:underline">
              privacy@creatorne.in
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="font-bold text-[#630ed4] hover:underline">
              Contact Page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
