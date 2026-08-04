"use client";

import { useState, useEffect } from "react";

/**
 * Hook to track media query matches.
 * @param query - CSS media query string, e.g. "(min-width: 768px)"
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/** Convenience hooks for common breakpoints */
export function useIsMobile() {
  return !useMediaQuery("(min-width: 640px)");
}

export function useIsTablet() {
  const isAboveMobile = useMediaQuery("(min-width: 640px)");
  const isAboveTablet = useMediaQuery("(min-width: 1024px)");
  return isAboveMobile && !isAboveTablet;
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}
