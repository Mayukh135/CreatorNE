"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { SPRING } from "@/lib/constants";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;

interface OtpVerifyProps {
  phone: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  onBack: () => void;
  loading: boolean;
  error: string | null;
}

export function OtpVerify({
  phone,
  onVerify,
  onResend,
  onBack,
  loading,
  error,
}: OtpVerifyProps) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);

  // Resend countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Handle paste of full code
      if (value.length > 1) {
        const clean = value.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
        const newDigits = [...Array(OTP_LENGTH).fill("")];
        clean.forEach((d, i) => (newDigits[i] = d));
        setDigits(newDigits);
        if (clean.length === OTP_LENGTH) {
          onVerify(clean.join(""));
        } else {
          inputRefs.current[clean.length]?.focus();
        }
        return;
      }

      const digit = value.replace(/\D/g, "");
      const newDigits = [...digits];
      newDigits[index] = digit;
      setDigits(newDigits);

      if (digit && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Auto-submit
      const code = newDigits.join("");
      if (code.length === OTP_LENGTH && !newDigits.includes("")) {
        onVerify(code);
      }
    },
    [digits, onVerify]
  );

  const handleKeyDown = (index: number, key: string) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      const newDigits = [...digits];
      newDigits[index - 1] = "";
      setDigits(newDigits);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    onResend();
    setCooldown(RESEND_COOLDOWN);
  };

  // Format phone for display
  const displayPhone = phone.replace("+91", "+91 ");
  const code = digits.join("");

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={SPRING.smooth}
      >
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center text-lg text-slate-800 transition hover:text-violet-600 sm:text-xl"
          >
            ←
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
          Verify your number
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm">
          We&apos;ve sent a 6-digit code to
          <br />
          <span className="font-semibold text-slate-800">{displayPhone}</span>
        </p>

        {/* OTP boxes — flex with max-width to fit all screen sizes */}
        <div className="mx-auto mt-6 flex max-w-[300px] justify-center gap-1.5 sm:mt-8 sm:max-w-xs sm:gap-2">
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={OTP_LENGTH}
              value={digits[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e.key)}
              autoFocus={i === 0}
              className={`h-12 w-full max-w-[48px] flex-1 rounded-lg border text-center text-lg font-semibold text-slate-800 outline-none transition sm:h-14 sm:max-w-[52px] sm:rounded-xl sm:text-xl ${
                digits[i]
                  ? "border-violet-600 bg-violet-50"
                  : "border-slate-200 bg-white"
              } focus:border-violet-600 focus:ring-2 focus:ring-violet-100 sm:focus:ring-4`}
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="mt-3 text-center text-xs text-red-500 sm:mt-4 sm:text-sm">{error}</p>
        )}

        {/* Verify button */}
        <button
          type="button"
          onClick={() => onVerify(code)}
          disabled={code.length < OTP_LENGTH || loading}
          className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-700 disabled:opacity-50 sm:mt-8 sm:h-[52px] sm:text-[15px]"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
              Verifying...
            </span>
          ) : (
            "Verify & Continue"
          )}
        </button>

        {/* Resend */}
        <div className="mt-5 text-center sm:mt-6">
          {cooldown > 0 ? (
            <p className="text-xs text-slate-400 sm:text-sm">
              Resend OTP in{" "}
              <span className="font-semibold text-violet-600">{cooldown}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-xs font-semibold text-violet-600 hover:underline sm:text-sm"
            >
              Resend OTP
            </button>
          )}
        </div>
      </m.div>
    </LazyMotion>
  );
}
