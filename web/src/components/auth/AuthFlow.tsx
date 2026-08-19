"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { APP_CONFIG, SPRING } from "@/lib/constants";
import { RoleSelect } from "./RoleSelect";
import { PhoneInput } from "./PhoneInput";
import { OtpVerify } from "./OtpVerify";

type Step = "role-select" | "phone" | "otp" | "success";
type Audience = "creator" | "brand";

export function AuthFlow({
  initialAudience,
}: {
  initialAudience?: Audience;
}) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [step, setStep] = useState<Step>(
    initialAudience ? "phone" : "role-select"
  );
  const [audience, setAudience] = useState<Audience>(
    initialAudience || "creator"
  );
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = (role: Audience) => {
    setAudience(role);
    setStep("phone");
  };

  const handleSendOtp = async (phoneNumber: string) => {
    setLoading(true);
    setError(null);
    setPhone(phoneNumber);

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
        options: {
          data: {
            role: audience.toUpperCase(),
          },
        },
      });

      if (otpError) {
        setError(otpError.message);
        setLoading(false);
        return;
      }

      setStep("otp");
    } catch {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        phone,
        token: code,
        type: "sms",
      });

      if (verifyError) {
        setError(verifyError.message);
        setLoading(false);
        return;
      }

      // Check if user has a profile
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      if (token) {
        try {
          const meResponse = await fetch("/api/app/user/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const meData = await meResponse.json();

          if (meData.exists) {
            // Existing user — go to dashboard
            setStep("success");
            setTimeout(() => {
              router.push(
                meData.profile?.role === "BRAND"
                  ? "/dashboard/brand"
                  : "/dashboard/creator"
              );
            }, 800);
            return;
          }
        } catch {
          // Profile check failed — continue to home
        }
      }

      // New user — go to home (onboarding can happen on dashboard)
      setStep("success");
      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError(null);

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          data: {
            role: audience.toUpperCase(),
          },
        },
      });

      if (otpError) {
        setError(otpError.message);
      }
    } catch {
      setError("Failed to resend OTP.");
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      {/*
        Layout breakpoints:
        - Mobile  (<640px):  single column, stacked
        - Tablet  (640-1023px): single column, wider card, centered
        - Desktop (≥1024px): two columns — branding left, form right
      */}
      <main className="relative flex min-h-[100dvh] items-center justify-center overflow-y-auto bg-[#f9f9ff] px-4 py-8 sm:px-8 md:px-12 lg:px-6">
        {/* Background gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.08),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.08),_transparent_26%)]" />

        <div className="mx-auto grid w-full max-w-md items-center gap-6 sm:max-w-lg md:max-w-xl lg:max-w-[960px] lg:grid-cols-[1fr_1fr] lg:gap-10">
          {/* Left panel — branding (desktop only) */}
          <m.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
                  <span className="text-base text-white">⊕</span>
                </div>
                <span className="text-lg font-bold text-slate-800">
                  creatorne
                </span>
              </div>

              {/* Tagline */}
              <div>
                <p className="text-xl text-slate-800">
                  The{" "}
                  <span className="font-medium text-violet-600">
                    Exclusive
                  </span>
                  <sup className="text-sm font-medium text-violet-600">+</sup>
                </p>
                <h1 className="text-4xl font-bold leading-tight text-slate-800">
                  Brand <span className="font-normal text-slate-400">×</span>{" "}
                  Creator
                  <br />
                  Professional Network.
                </h1>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 pt-4">
                <div className="flex -space-x-2">
                  {["🟣", "🔵", "🟢", "🟡", "🟠"].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-sm"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-400">
                  creators joined in last 7 days
                </span>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Phone OTP login",
                  "Verified profiles",
                  "Direct brand connections",
                  "Northeast India focused",
                ].map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-500"
                  >
                    <span className="text-emerald-500">✓</span>
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </m.section>

          {/* Right panel — auth form card */}
          <m.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="w-full rounded-2xl border border-white/60 bg-white/80 p-5 shadow-xl shadow-slate-200/40 backdrop-blur-sm sm:rounded-[28px] sm:p-7 md:rounded-[32px] md:p-8"
          >
            {/* Logo — shown on mobile & tablet, hidden on desktop */}
            <div className="mb-5 flex items-center gap-3 sm:mb-6 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 sm:h-9 sm:w-9">
                <span className="text-sm text-white">⊕</span>
              </div>
              <span className="text-base font-bold text-slate-800 sm:text-lg">
                creatorne
              </span>
            </div>

            <AnimatePresence mode="wait">
              {step === "role-select" && (
                <m.div
                  key="role-select"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={SPRING.smooth}
                >
                  {/* Tagline — shown on mobile & tablet */}
                  <div className="mb-5 sm:mb-6 lg:hidden">
                    <p className="text-sm text-slate-800 sm:text-base">
                      The{" "}
                      <span className="font-medium text-violet-600">
                        Exclusive
                      </span>
                      <sup className="text-[10px] font-medium text-violet-600 sm:text-xs">
                        +
                      </sup>
                    </p>
                    <h1 className="text-xl font-bold text-slate-800 sm:text-2xl md:text-[28px] md:leading-tight">
                      Brand{" "}
                      <span className="font-normal text-slate-400">×</span>{" "}
                      Creator
                      <br />
                      Professional Network.
                    </h1>
                  </div>
                  <RoleSelect onSelect={handleRoleSelect} />
                </m.div>
              )}

              {step === "phone" && (
                <m.div
                  key="phone"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={SPRING.smooth}
                >
                  <PhoneInput
                    role={audience}
                    onSubmit={handleSendOtp}
                    onBack={() => setStep("role-select")}
                    loading={loading}
                  />
                </m.div>
              )}

              {step === "otp" && (
                <m.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={SPRING.smooth}
                >
                  <OtpVerify
                    phone={phone}
                    onVerify={handleVerifyOtp}
                    onResend={handleResendOtp}
                    onBack={() => setStep("phone")}
                    loading={loading}
                    error={error}
                  />
                </m.div>
              )}

              {step === "success" && (
                <m.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 sm:py-16"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 sm:h-16 sm:w-16">
                    <span className="text-2xl sm:text-3xl">✓</span>
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-slate-800 sm:text-xl">
                    Signed in successfully
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Redirecting you to your dashboard...
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </m.section>
        </div>
      </main>
    </LazyMotion>
  );
}
