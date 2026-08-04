"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ALL_ACCEPTED_PREFERENCES,
  ConsentState,
  CookiePreferences,
  DEFAULT_PREFERENCES,
  REJECTED_PREFERENCES,
  applyConsentToScripts,
  getStoredConsent,
  saveStoredConsent,
} from "@/lib/cookie-consent";

interface CookieConsentContextType {
  consent: ConsentState;
  isBannerVisible: boolean;
  isModalOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (preferences: CookiePreferences) => void;
  openModal: () => void;
  closeModal: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
  undefined
);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>({
    hasResponded: true, // Prevent flash on SSR
    preferences: DEFAULT_PREFERENCES,
  });
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    if (!stored.hasResponded) {
      setIsBannerVisible(true);
    } else {
      applyConsentToScripts(stored.preferences);
    }
  }, []);

  const acceptAll = () => {
    const newState = saveStoredConsent(ALL_ACCEPTED_PREFERENCES);
    setConsent(newState);
    setIsBannerVisible(false);
    setIsModalOpen(false);
  };

  const rejectNonEssential = () => {
    const newState = saveStoredConsent(REJECTED_PREFERENCES);
    setConsent(newState);
    setIsBannerVisible(false);
    setIsModalOpen(false);
  };

  const savePreferences = (preferences: CookiePreferences) => {
    const newState = saveStoredConsent(preferences);
    setConsent(newState);
    setIsBannerVisible(false);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        isBannerVisible,
        isModalOpen,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openModal,
        closeModal,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
