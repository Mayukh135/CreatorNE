"use client";

import Link from "next/link";
import { Cookie } from "@/lib/icons";
import { AnimatePresence, m } from "framer-motion";
import { useCookieConsent } from "@/components/common/CookieConsentContext";

export function CookieConsentBanner() {
  const { isBannerVisible, acceptAll, rejectNonEssential, openModal } =
    useCookieConsent();

  if (!isBannerVisible) return null;

  return (
    <AnimatePresence>
      <m.aside
        role="region"
        aria-label="Cookie consent banner"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl"
      >
        <div className="rounded-[2.5rem] border border-white/80 bg-white/95 p-6 shadow-2xl shadow-purple-900/15 backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-purple-100 text-[#7C3AED]">
                  <Cookie className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-[#151c27]">
                  We value your privacy
                </h3>
              </div>
              <p className="text-xs md:text-sm text-[#4a4455] leading-relaxed">
                CreatorNE uses essential cookies to keep our platform secure and operational, and optional analytics and marketing cookies to enhance your discovery experience. Read our{" "}
                <Link
                  href="/cookie-policy"
                  className="font-semibold text-[#630ed4] underline underline-offset-2 hover:text-[#7C3AED]"
                >
                  Cookie Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-[#630ed4] underline underline-offset-2 hover:text-[#7C3AED]"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={openModal}
                className="text-xs font-bold text-[#4a4455] px-4 py-2.5 rounded-full border border-[#ccc3d8]/60 bg-white hover:border-[#7C3AED] hover:text-[#630ed4] transition-all"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="text-xs font-bold text-[#151c27] px-4 py-2.5 rounded-full border border-[#ccc3d8]/60 bg-white hover:bg-slate-50 transition-all"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="text-xs font-bold text-white px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] shadow-md shadow-purple-500/20 hover:shadow-purple-500/35 transition-all"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </m.aside>
    </AnimatePresence>
  );
}
