"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import * as Icons from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "register";
type Audience = "creator" | "brand";
type Step = "entry" | "verify" | "success";

type FormState = {
  email: string;
  code: string;
  creatorName: string;
  brandName: string;
  contactPerson: string;
  phone: string;
  state: string;
  category: string;
  industry: string;
  budget: string;
};

const initialFormState: FormState = {
  email: "",
  code: "",
  creatorName: "",
  brandName: "",
  contactPerson: "",
  phone: "",
  state: "Assam",
  category: "Travel",
  industry: "Food & Hospitality",
  budget: "",
};

const creatorFields = [
  { key: "creatorName", label: "Creator name", placeholder: "Enter your full name" },
  { key: "phone", label: "Phone", placeholder: "+91 98XXXXXX" },
  { key: "state", label: "State", placeholder: "Assam" },
  { key: "category", label: "Primary category", placeholder: "Travel" },
];

const brandFields = [
  { key: "brandName", label: "Brand name", placeholder: "Enter your brand name" },
  { key: "contactPerson", label: "Contact person", placeholder: "Who should we contact?" },
  { key: "phone", label: "Phone", placeholder: "+91 98XXXXXX" },
  { key: "industry", label: "Industry", placeholder: "Food & Hospitality" },
];

const loginHighlights = [
  "Email OTP login",
  "Google OAuth available",
  "Session cookies handled by Supabase",
  "Built for creators, brands, and admins",
];

const registerHighlights = [
  "Creator and brand onboarding in one flow",
  "Role metadata attached to auth user",
  "Progressive profile collection after verification",
  "Premium sliding-panel experience on desktop and mobile",
];

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="group relative block">
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder=" "
        className="peer h-14 w-full rounded-[18px] border border-border bg-background px-4 pt-5 text-sm text-text-primary outline-none transition placeholder-transparent focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100"
      />
      <span className="pointer-events-none absolute left-4 top-4 text-sm text-text-muted transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-600 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary-600">
        {label}
      </span>
      {placeholder ? <span className="sr-only">{placeholder}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="group relative block">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="peer h-14 w-full appearance-none rounded-[18px] border border-border bg-background px-4 pt-5 text-sm text-text-primary outline-none transition focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute left-4 top-2 text-xs text-primary-600">
        {label}
      </span>
    </label>
  );
}

function SocialButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-4 text-sm font-semibold text-text-primary transition hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-600"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export function AuthPage({
  mode,
  initialAudience = "creator",
}: {
  mode: AuthMode;
  initialAudience?: Audience;
}) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [audience, setAudience] = useState<Audience>(initialAudience);
  const [step, setStep] = useState<Step>("entry");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialFormState);

  const roleLabel = audience === "creator" ? "Creator" : "Brand";
  const highlights = mode === "login" ? loginHighlights : registerHighlights;
  const socialLabel = mode === "login" ? "Continue with Google" : "Continue with Google";

  const setValue = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const persistSignupDraft = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      "creatorne.pending-signup",
      JSON.stringify({
        mode,
        audience,
        email: form.email,
        creatorName: form.creatorName,
        brandName: form.brandName,
        contactPerson: form.contactPerson,
        phone: form.phone,
        state: form.state,
        category: form.category,
        industry: form.industry,
        budget: form.budget,
      }),
    );
  };

  const sendOtp = async () => {
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: {
        shouldCreateUser: mode === "register",
        data: {
          role: audience.toUpperCase(),
          onboardingMode: mode,
        },
      },
    });

    if (error) {
      setStatus(error.message);
      setLoading(false);
      return;
    }

    if (mode === "register") {
      persistSignupDraft();
    }

    setStep("verify");
    setStatus(`OTP sent to ${form.email}. Check your inbox and enter the code here.`);
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.verifyOtp({
      email: form.email,
      token: form.code,
      type: "email",
    });

    if (error) {
      setStatus(error.message);
      setLoading(false);
      return;
    }

    setStep("success");
    setStatus(mode === "login" ? "Signed in successfully." : "Account verified successfully.");

    window.setTimeout(() => {
      router.push("/");
    }, 900);

    setLoading(false);
  };

  return (
    <LazyMotion features={domAnimation}>
      <main className="relative min-h-screen overflow-hidden bg-background px-4 py-6 text-text-primary sm:px-6 lg:px-8 lg:py-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.12),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(6,182,212,0.12),_transparent_26%),linear-gradient(180deg,rgba(248,250,252,1)_0%,rgba(248,250,252,0.94)_100%)]" />
        <div className="container-app relative">
          <div className="mx-auto grid min-h-[calc(100vh-3rem)] items-center lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
            <m.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[36px] border border-white/80 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary p-6 text-white shadow-[0_28px_70px_rgba(124,58,237,0.25)] lg:min-h-[720px] lg:p-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.1),_transparent_22%)]" />
              <Image
                src="/illustrations/auth-orbit.svg"
                alt=""
                aria-hidden="true"
                width={680}
                height={680}
                className="pointer-events-none absolute -right-20 top-8 h-64 w-64 opacity-35 lg:h-96 lg:w-96"
              />
              <Image
                src="/illustrations/sparkle-burst.svg"
                alt=""
                aria-hidden="true"
                width={120}
                height={120}
                className="pointer-events-none absolute left-6 top-6 h-20 w-20 opacity-70"
              />

              <div className="relative flex h-full flex-col justify-between gap-10">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
                    <Icons.Sparkles className="h-4 w-4 text-gold" />
                    Phase 0.3 Auth Flow
                  </div>
                  <h1 className="mt-6 max-w-md text-4xl font-semibold tracking-tight md:text-5xl">
                    {mode === "login" ? "Welcome back to CreatorNE." : "Start your CreatorNE journey."}
                  </h1>
                  <p className="mt-4 max-w-lg text-base leading-8 text-white/82 md:text-lg">
                    {mode === "login"
                      ? "Sign in with email OTP or Google, then continue into the platform experience built for Northeast creators and brands."
                      : "Register once, verify your email, and move into a premium creator or brand onboarding path with role-specific context."}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div key={item} className="rounded-[24px] border border-white/15 bg-white/10 p-4 text-sm text-white/90 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/18 text-xs font-semibold">
                          <Icons.Check className="h-4 w-4" />
                        </span>
                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </m.section>

            <m.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="relative mt-6 rounded-[36px] border border-white/80 bg-white/90 p-5 shadow-[0_26px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:mt-0 lg:min-h-[720px] lg:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.26em] text-text-light">{mode === "login" ? "Log in" : "Register"}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-text-primary md:text-3xl">
                    {audience === "creator" ? "Creator" : "Brand"} {mode === "login" ? "login" : "registration"}
                  </h2>
                </div>

                <div className="inline-flex rounded-full border border-border bg-background p-1">
                  {(["creator", "brand"] as Audience[]).map((option) => {
                    const active = audience === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setAudience(option)}
                        className={cn(
                          "relative rounded-full px-4 py-2 text-sm font-semibold transition",
                          active ? "bg-primary-600 text-white shadow-sm" : "text-text-muted hover:text-text-primary",
                        )}
                      >
                        {option === "creator" ? "Creator" : "Brand"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <SocialButton
                  icon={Icons.Chrome}
                  label={socialLabel}
                  onClick={async () => {
                    await supabase.auth.signInWithOAuth({
                      provider: "google",
                      options: {
                        redirectTo: `${window.location.origin}/`,
                        queryParams: {
                          role: audience.toUpperCase(),
                          onboardingMode: mode,
                        },
                      },
                    });
                  }}
                />
                <div className="inline-flex items-center rounded-full border border-border bg-white px-4 text-sm text-text-muted">
                  Secure OTP sign-in
                </div>
              </div>

              <form
                className="mt-6 space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault();

                  if (step === "entry") {
                    await sendOtp();
                    return;
                  }

                  if (step === "verify") {
                    await verifyOtp();
                  }
                }}
              >
                <Field
                  label="Email address"
                  value={form.email}
                  onChange={(value) => setValue("email", value)}
                  type="email"
                  placeholder="name@example.com"
                />

                {mode === "register" && step === "entry" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {(audience === "creator" ? creatorFields : brandFields).map((field) => {
                      if (field.key === "state") {
                        return (
                          <SelectField
                            key={field.key}
                            label={field.label}
                            value={form.state}
                            onChange={(value) => setValue("state", value)}
                            options={[
                              "Assam",
                              "Arunachal Pradesh",
                              "Manipur",
                              "Meghalaya",
                              "Mizoram",
                              "Nagaland",
                              "Sikkim",
                              "Tripura",
                            ]}
                          />
                        );
                      }

                      if (field.key === "category") {
                        return (
                          <SelectField
                            key={field.key}
                            label={field.label}
                            value={form.category}
                            onChange={(value) => setValue("category", value)}
                            options={[
                              "Travel",
                              "Food",
                              "Lifestyle",
                              "Fashion & Beauty",
                              "Photography",
                              "Tech",
                              "Comedy",
                              "Fitness",
                              "Music",
                            ]}
                          />
                        );
                      }

                      if (field.key === "industry") {
                        return (
                          <SelectField
                            key={field.key}
                            label={field.label}
                            value={form.industry}
                            onChange={(value) => setValue("industry", value)}
                            options={[
                              "Food & Hospitality",
                              "Travel",
                              "Beauty",
                              "Technology",
                              "Fashion",
                              "Education",
                              "Finance",
                              "Lifestyle",
                            ]}
                          />
                        );
                      }

                      return (
                        <Field
                          key={field.key}
                          label={field.label}
                          value={form[field.key as keyof FormState]}
                          onChange={(value) => setValue(field.key as keyof FormState, value)}
                          placeholder={field.placeholder}
                        />
                      );
                    })}
                  </div>
                ) : null}

                {step === "verify" ? (
                  <Field
                    label="Verification code"
                    value={form.code}
                    onChange={(value) => setValue("code", value)}
                    placeholder="Enter the 6-digit code"
                  />
                ) : null}

                {mode === "register" && step === "entry" ? (
                  <div className="rounded-[24px] border border-primary-100 bg-primary-50 px-4 py-4 text-sm leading-7 text-primary-900">
                    <span className="font-semibold text-primary-700">Role selected: {roleLabel}</span>
                    <p className="mt-2 text-primary-800/90">
                      The full profile will be staged after OTP verification so the platform can attach your role metadata cleanly.
                    </p>
                  </div>
                ) : null}

                {status ? (
                  <div className="rounded-[20px] border border-border-light bg-background px-4 py-3 text-sm text-text-secondary">
                    {status}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading || (step === "verify" && !form.code)}
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-secondary px-5 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(124,58,237,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <Icons.Loader2 className="h-4 w-4 animate-spin" />
                  ) : step === "entry" ? (
                    <Icons.Mail className="h-4 w-4" />
                  ) : (
                    <Icons.LockKeyhole className="h-4 w-4" />
                  )}
                  {step === "entry"
                    ? mode === "login"
                      ? "Send OTP"
                      : "Create account and send OTP"
                    : "Verify and continue"}
                </button>

                <div className="flex items-center justify-between gap-3 text-sm text-text-muted">
                  <span>
                    {mode === "login" ? "Need an account?" : "Already registered?"}
                  </span>
                  <button
                    type="button"
                    onClick={() => router.push(mode === "login" ? "/register" : "/login")}
                    className="font-semibold text-primary-600 transition hover:text-primary-700"
                  >
                    {mode === "login" ? "Register" : "Log in"}
                  </button>
                </div>
              </form>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { value: "OTP", label: "Email verification" },
                  { value: "OAuth", label: "Google sign-in" },
                  { value: "Secure", label: "Session cookies" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[22px] border border-border-light bg-white px-4 py-4 shadow-sm">
                    <p className="text-lg font-semibold text-text-primary">{item.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-text-light">{item.label}</p>
                  </div>
                ))}
              </div>

              {step === "success" ? (
                <m.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-[24px] border border-success/20 bg-success/10 px-4 py-4 text-sm text-success"
                >
                  Redirecting to the homepage.
                </m.div>
              ) : null}
            </m.section>
          </div>
        </div>
      </main>
    </LazyMotion>
  );
}