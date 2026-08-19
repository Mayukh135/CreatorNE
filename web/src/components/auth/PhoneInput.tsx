"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { SPRING } from "@/lib/constants";

interface PhoneInputProps {
  role: "creator" | "brand";
  onSubmit: (phone: string) => void;
  onBack: () => void;
  loading: boolean;
}

export function PhoneInput({ role, onSubmit, onBack, loading }: PhoneInputProps) {
  const [phone, setPhone] = useState("");
  const roleLabel = role === "creator" ? "Creator" : "Brand";
  const isValid = phone.replace(/\D/g, "").length === 10;
  const fullPhone = `+91${phone.replace(/\D/g, "")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onSubmit(fullPhone);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={SPRING.smooth}
      >
        {/* Header */}
        <div className="mb-6 flex items-center sm:mb-8">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center text-lg text-slate-800 transition hover:text-violet-600 sm:text-xl"
          >
            ←
          </button>
          <div className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-100 text-[10px] text-violet-600">
              ▶
            </span>
            <span className="text-xs font-medium text-slate-500 sm:text-sm">
              Signing as {roleLabel}
            </span>
          </div>
          <div className="w-9" /> {/* balance */}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
          Add your mobile number
        </h2>

        {/* Tags */}
        <div className="mt-2 flex gap-3 sm:mt-3 sm:gap-4">
          <span className="flex items-center gap-1 text-xs font-medium text-violet-700 sm:gap-1.5 sm:text-sm">
            <span className="text-violet-600">👥</span>
            Direct connections
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-violet-700 sm:gap-1.5 sm:text-sm">
            <span className="text-violet-600">✓</span>
            Verified brands
          </span>
        </div>

        {/* Phone input */}
        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
          <div className="flex h-12 items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-3 transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100 sm:h-14 sm:rounded-[20px] sm:px-4">
            <span className="text-sm font-medium text-slate-800 sm:text-base">+91</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Enter your number"
              autoFocus
              className="ml-2 flex-1 border-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-300 sm:text-base"
            />
          </div>

          {/* Info text */}
          <div className="mt-3 flex gap-2 pr-2 sm:mt-4 sm:pr-4">
            <span className="mt-0.5 text-xs text-slate-400 sm:text-sm">ⓘ</span>
            <p className="text-xs leading-relaxed text-slate-400 sm:text-[13px]">
              Use your own number. If you have a manager, you can add them later
              for managing brand calls and queries.
            </p>
          </div>

          {/* Get OTP button */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`mt-6 flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition sm:mt-8 sm:h-[52px] sm:text-[15px] ${
              isValid
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25 hover:bg-violet-700"
                : "border border-slate-200 bg-transparent text-slate-300"
            } disabled:opacity-50`}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                Sending...
              </span>
            ) : (
              "Get OTP"
            )}
          </button>
        </form>

        {/* Terms */}
        <p className="mt-6 text-center text-[11px] text-slate-400 sm:mt-8 sm:text-xs">
          By continuing, you accept{" "}
          <a href="/terms" className="font-medium text-slate-800 underline">
            terms of service
          </a>{" "}
          &amp;{" "}
          <a
            href="/privacy-policy"
            className="font-medium text-slate-800 underline"
          >
            privacy policy
          </a>
        </p>
      </m.div>
    </LazyMotion>
  );
}
