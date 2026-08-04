"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { APP_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setStatus("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="border-t border-white/80 bg-white/70 backdrop-blur-md">
      <div className="container-app py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.85fr_0.85fr_0.85fr_1.05fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo.svg" alt="CreatorNE" width={44} height={44} className="h-11 w-11" />
              <span className="text-lg font-semibold text-text-primary">CreatorNE</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-text-muted">
              A premium creator discovery platform built for Northeast India, with a long-term path toward a shared API and mobile-first product ecosystem.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-secondary transition hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-600"
                    aria-label={social.name}
                    data-cursor-expand="true"
                  >
                    <Icons.Globe className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.26em] text-text-muted">Platform</h3>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li><Link href="/find-creators" className="hover:text-primary-600">Creators</Link></li>
              <li><Link href="/categories" className="hover:text-primary-600">Categories</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-primary-600">How It Works</Link></li>
              <li><Link href="/register?type=brand" className="hover:text-primary-600">For Brands</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.26em] text-text-muted">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li><Link href="/about" className="hover:text-primary-600">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary-600">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary-600">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-primary-600">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.26em] text-text-muted">Resources</h3>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li><Link href="/faq" className="hover:text-primary-600">FAQ</Link></li>
              <li><Link href="/creator-guide" className="hover:text-primary-600">Creator Guide</Link></li>
              <li><Link href="/help" className="hover:text-primary-600">Help Center</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary-600">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.26em] text-text-muted">Newsletter</h3>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="h-12 w-full rounded-full border border-border bg-white px-4 text-sm text-text-primary outline-none transition placeholder:text-text-light focus:border-primary-300 focus:ring-4 focus:ring-primary-100"
              />
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-secondary px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
                data-cursor-expand="true"
              >
                Subscribe
              </button>
            </form>
            {status ? <p className="mt-3 text-sm text-text-muted">{status}</p> : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border-light pt-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <p>Made with care in Northeast India.</p>
          <p>© {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
