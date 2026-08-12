"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, MoveRight } from "@/lib/icons";
import { AnimatePresence, m } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300",
          isScrolled
            ? "border-white/60 bg-white/75 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="container-app flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="CreatorNE home">
            <Image src="/logo-icon.png" alt="CreatorNE" width={44} height={44} className="h-11 w-11 object-contain transition-transform duration-300 hover:scale-105" />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold tracking-[0.22em] text-text-muted uppercase">
                CreatorNE
              </p>
              <p className="text-xs text-text-light">Discover. Collaborate. Grow.</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-text-secondary transition hover:text-primary-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-text-secondary transition hover:text-primary-600"
              data-cursor-expand="true"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(124,58,237,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(124,58,237,0.28)]"
              data-cursor-expand="true"
            >
              Join as Creator
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/90 text-text-primary shadow-sm transition hover:border-primary-200 hover:text-primary-600 lg:hidden"
            aria-label="Open navigation menu"
            data-cursor-expand="true"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <m.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
            />
            <m.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="absolute right-0 top-0 h-full w-[88vw] max-w-sm border-l border-white/60 bg-white/96 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.24)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-text-muted">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="mt-8 space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between rounded-2xl border border-border-light bg-background px-4 py-4 text-base font-medium text-text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                    <MoveRight className="h-4 w-4 text-primary-600" />
                  </Link>
                ))}
              </nav>
              <div className="mt-8 grid gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-border bg-white px-4 py-3 text-center font-medium text-text-primary"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-gradient-to-r from-primary-600 to-secondary px-4 py-3 text-center font-semibold text-white"
                >
                  Join as Creator
                </Link>
              </div>
            </m.div>
          </m.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
