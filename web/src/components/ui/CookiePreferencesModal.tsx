"use client";

import { useEffect, useRef, useState } from "react";
import { Sliders, X, Lock } from "@/lib/icons";
import { AnimatePresence, m } from "framer-motion";
import { useCookieConsent } from "@/components/ui/CookieConsentContext";
import { CookiePreferences } from "@/lib/cookie-consent";

export function CookiePreferencesModal() {
  const { isModalOpen, closeModal, consent, savePreferences, acceptAll, rejectNonEssential } =
    useCookieConsent();

  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  const modalRef = useRef<HTMLDivElement>(null);

  // Sync state when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setPreferences(consent.preferences);
    }
  }, [isModalOpen, consent.preferences]);

  // Trap Escape key for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  const handleToggle = (key: "analytics" | "marketing") => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    savePreferences(preferences);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          onClick={closeModal}
        />

        {/* Modal Window */}
        <m.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          aria-describedby="cookie-modal-desc"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="relative w-full max-w-2xl rounded-[2.5rem] border border-white/80 bg-white p-6 md:p-8 shadow-2xl shadow-purple-900/20"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#ccc3d8]/30 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-2xl bg-purple-100 text-[#7C3AED]">
                <Sliders className="w-5 h-5" />
              </span>
              <div>
                <h2 id="cookie-modal-title" className="text-xl font-extrabold text-[#151c27]">
                  Cookie Preferences
                </h2>
                <p id="cookie-modal-desc" className="text-xs text-[#7b7487]">
                  Manage your data and privacy preferences across CreatorNE.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="p-2 rounded-full border border-border text-[#7b7487] hover:text-[#151c27] hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Preferences Categories List */}
          <div className="py-6 space-y-6 max-h-[60vh] overflow-y-auto pr-1">
            {/* Essential Category */}
            <div className="p-5 rounded-3xl bg-[#f9f9ff] border border-[#ccc3d8]/30 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#151c27]">
                    Essential & System Cookies
                  </h3>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-[#4a4455] leading-relaxed">
                  Required for security, user authentication, session integrity, and core navigation. These cannot be disabled.
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <Lock className="w-5 h-5 text-purple-500" />
              </div>
            </div>

            {/* Analytics Category */}
            <div className="p-5 rounded-3xl bg-[#f9f9ff] border border-[#ccc3d8]/30 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#151c27]">
                  Analytics & Performance Cookies
                </h3>
                <p className="text-xs text-[#4a4455] leading-relaxed">
                  Allows us to measure visitor traffic, page load speed, and usage patterns to optimize platform performance.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.analytics}
                onClick={() => handleToggle("analytics")}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  preferences.analytics ? "bg-[#7C3AED]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    preferences.analytics ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Marketing Category */}
            <div className="p-5 rounded-3xl bg-[#f9f9ff] border border-[#ccc3d8]/30 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#151c27]">
                  Marketing & Campaign Targeting Cookies
                </h3>
                <p className="text-xs text-[#4a4455] leading-relaxed">
                  Used to deliver relevant campaign recommendations, track ad conversions, and personalize creator discovery announcements.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={preferences.marketing}
                onClick={() => handleToggle("marketing")}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  preferences.marketing ? "bg-[#7C3AED]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    preferences.marketing ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-[#ccc3d8]/30 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={rejectNonEssential}
              className="text-xs font-bold text-[#4a4455] px-4 py-2.5 rounded-full border border-[#ccc3d8]/60 bg-white hover:bg-slate-50 transition-all"
            >
              Reject All
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={acceptAll}
                className="text-xs font-bold text-[#630ed4] px-4 py-2.5 rounded-full border border-[#630ed4] bg-white hover:bg-purple-50 transition-all"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="text-xs font-bold text-white px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] shadow-md shadow-purple-500/20 hover:shadow-purple-500/35 transition-all"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </m.div>
      </div>
    </AnimatePresence>
  );
}
