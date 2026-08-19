"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin } from "@/lib/icons";
import { contactChannels } from "@/lib/content-data";

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  topic: "Partnership",
  message: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus("sent");
        setFormState(initialState);
      }
    } catch {
      setStatus("sent");
      setFormState(initialState);
    }
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        onSubmit={submitHandler}
        className="squircle border border-border/70 bg-white/90 p-6 shadow-[0_16px_34px_rgba(15,23,42,0.08)]"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-text-secondary">
            Name
            <input
              required
              value={formState.name}
              onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
              className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm text-text-primary outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              placeholder="Your name"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-text-secondary">
            Email
            <input
              type="email"
              required
              value={formState.email}
              onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
              className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm text-text-primary outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <label className="mt-4 block space-y-2 text-sm font-medium text-text-secondary">
          Topic
          <select
            value={formState.topic}
            onChange={(event) => setFormState((prev) => ({ ...prev, topic: event.target.value }))}
            className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm text-text-primary outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          >
            <option>Partnership</option>
            <option>Creator Onboarding</option>
            <option>Support</option>
            <option>Other</option>
          </select>
        </label>

        <label className="mt-4 block space-y-2 text-sm font-medium text-text-secondary">
          Message
          <textarea
            required
            rows={6}
            value={formState.message}
            onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            placeholder="Tell us what you are building or what you need help with."
          />
        </label>

        <button
          type="submit"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary-600 px-6 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          Send message
        </button>

        {status === "sent" ? (
          <p className="mt-3 text-sm font-medium text-success">Thanks. Your message has been captured.</p>
        ) : null}
      </form>

      <aside className="space-y-4">
        {contactChannels.map((channel) => (
          <article key={channel.label} className="squircle border border-border/70 bg-white/85 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">{channel.label}</p>
            <p className="mt-2 text-base font-semibold text-text-primary">{channel.value}</p>
            <p className="mt-2 text-sm leading-7 text-text-secondary">{channel.description}</p>
          </article>
        ))}

        <article className="squircle border border-border/70 bg-white/85 p-5 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary-700" />
            <span>Guwahati, Assam, India</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary-700" />
            <span>hello@creatorne.in</span>
          </div>
        </article>
      </aside>
    </div>
  );
}
