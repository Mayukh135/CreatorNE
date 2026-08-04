export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentState {
  hasResponded: boolean;
  preferences: CookiePreferences;
  timestamp?: string;
}

export const STORAGE_KEY = "creatorne_cookie_consent_v1";

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const ALL_ACCEPTED_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
  marketing: true,
};

export const REJECTED_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

/** Load consent state from localStorage */
export function getStoredConsent(): ConsentState {
  if (typeof window === "undefined") {
    return {
      hasResponded: false,
      preferences: DEFAULT_PREFERENCES,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        hasResponded: false,
        preferences: DEFAULT_PREFERENCES,
      };
    }

    const parsed = JSON.parse(raw);
    return {
      hasResponded: true,
      preferences: {
        essential: true,
        analytics: Boolean(parsed?.preferences?.analytics),
        marketing: Boolean(parsed?.preferences?.marketing),
      },
      timestamp: parsed?.timestamp,
    };
  } catch (error) {
    console.error("Failed to read cookie consent from localStorage:", error);
    return {
      hasResponded: false,
      preferences: DEFAULT_PREFERENCES,
    };
  }
}

/** Save consent state to localStorage and update scripts */
export function saveStoredConsent(preferences: CookiePreferences): ConsentState {
  const newState: ConsentState = {
    hasResponded: true,
    preferences: {
      essential: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    },
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      applyConsentToScripts(newState.preferences);
    } catch (error) {
      console.error("Failed to save cookie consent to localStorage:", error);
    }
  }

  return newState;
}

/** Apply consent choices to external scripts (GA4 & Meta Pixel) */
export function applyConsentToScripts(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return;

  const win = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };

  // Google Analytics (GA4) Consent Mode Update
  if (typeof win.gtag === "function") {
    win.gtag("consent", "update", {
      analytics_storage: preferences.analytics ? "granted" : "denied",
      ad_storage: preferences.marketing ? "granted" : "denied",
      ad_user_data: preferences.marketing ? "granted" : "denied",
      ad_personalization: preferences.marketing ? "granted" : "denied",
    });
  }

  // Meta Pixel Consent Update
  if (typeof win.fbq === "function") {
    if (preferences.marketing) {
      win.fbq("consent", "grant");
    } else {
      win.fbq("consent", "revoke");
    }
  }
}
