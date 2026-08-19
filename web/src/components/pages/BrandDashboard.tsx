"use client";

import { resolveIcon } from "@/lib/icons";
import Link from "next/link";
import { useMemo, useState } from "react";
import { brandCampaigns, brandConversations, brandProfiles, brandShortlists } from "@/lib/brand-data";
import { cn } from "@/lib/utils";

type BrandTab = "profile" | "messages" | "shortlist" | "campaigns";

const dashboardTabs: { key: BrandTab; label: string; icon: string }[] = [
  { key: "profile", label: "Profile", icon: "Building2" },
  { key: "messages", label: "Messages", icon: "MessagesSquare" },
  { key: "shortlist", label: "Shortlist", icon: "ListChecks" },
  { key: "campaigns", label: "Campaigns", icon: "BadgeDollarSign" },
];

export function BrandDashboard() {
  const brand = brandProfiles[0];
  const [activeTab, setActiveTab] = useState<BrandTab>("profile");
  const [profile, setProfile] = useState({
    brandName: brand.brandName,
    contactPerson: brand.contactPerson,
    website: brand.website ?? "",
    industry: brand.industry,
    budget: brand.budget,
  });

  const unreadMessages = useMemo(() => brandConversations.filter((message) => message.unread).length, []);

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-text-primary sm:px-6 lg:px-8 lg:py-8">
      <div className="container-app">
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="rounded-[34px] border border-white/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <div className="rounded-[28px] bg-gradient-to-br from-primary-600 via-secondary to-accent-pink p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-xl font-semibold backdrop-blur-sm">
                  NE
                </div>
                <div>
                  <p className="text-lg font-semibold">{brand.brandName}</p>
                  <p className="text-sm text-white/80">{brand.industry}</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
                <MiniStat label="Reach" value={brand.reach} />
                <MiniStat label="Campaigns" value={`${brand.activeCampaigns}`} />
                <MiniStat label="Budget" value={brand.budget} />
              </div>
            </div>

            <nav className="mt-5 space-y-2">
              {dashboardTabs.map((tab) => {
                const active = activeTab === tab.key;
                const TabIcon = resolveIcon(tab.icon) as React.ComponentType<{ className?: string }>;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-[22px] border px-4 py-4 text-left transition",
                      active
                        ? "border-primary-200 bg-primary-50 text-primary-700 shadow-sm"
                        : "border-border-light bg-white text-text-secondary hover:border-primary-200 hover:text-primary-600",
                    )}
                  >
                    <span className="flex items-center gap-3 text-sm font-medium">
                      <TabIcon className="h-4 w-4" />
                      {tab.label}
                    </span>
                    {tab.key === "messages" && unreadMessages ? (
                      <span className="rounded-full bg-accent-pink px-2 py-1 text-[11px] font-semibold text-white">
                        {unreadMessages}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 grid gap-3">
              <Link href="/brands/north-eats" className="rounded-[22px] border border-border-light bg-white px-4 py-4 text-sm font-medium text-text-secondary transition hover:border-primary-200 hover:text-primary-600">
                View public profile
              </Link>
              <Link href="/find-creators" className="rounded-[22px] bg-gradient-to-r from-primary-600 to-secondary px-4 py-4 text-center text-sm font-semibold text-white">
                Discover creators
              </Link>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[34px] border border-white/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:p-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.26em] text-text-light">Brand dashboard</p>
                  <h1 className="mt-2 text-3xl font-semibold text-text-primary md:text-4xl">Manage your brand presence, creator outreach, and campaigns.</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge label="Approval: Approved" tone="green" />
                  <Badge label="4 active campaigns" tone="blue" />
                </div>
              </div>
            </div>

            {activeTab === "profile" ? (
              <DashboardCard title="Profile editor" description="Update the brand registration fields and keep your collaboration story current.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Brand name" value={profile.brandName} onChange={(value) => setProfile((current) => ({ ...current, brandName: value }))} />
                  <Input label="Contact person" value={profile.contactPerson} onChange={(value) => setProfile((current) => ({ ...current, contactPerson: value }))} />
                  <Input label="Website" value={profile.website} onChange={(value) => setProfile((current) => ({ ...current, website: value }))} />
                  <Input label="Industry" value={profile.industry} onChange={(value) => setProfile((current) => ({ ...current, industry: value }))} />
                  <Input label="Budget" value={profile.budget} onChange={(value) => setProfile((current) => ({ ...current, budget: value }))} />
                  <Input label="Logo upload" value="Cloudinary upload enabled" onChange={() => undefined} />
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" className="rounded-full bg-gradient-to-r from-primary-600 to-secondary px-5 py-3 text-sm font-semibold text-white shadow-sm">
                    Save changes
                  </button>
                  <button type="button" className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-text-primary">
                    Preview public profile
                  </button>
                </div>
              </DashboardCard>
            ) : null}

            {activeTab === "messages" ? (
              <DashboardCard title="Messages" description="Talk to creators and admin from one brand inbox.">
                <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                  <div className="space-y-3">
                    {brandConversations.map((message) => (
                      <div key={message.id} className={cn("rounded-[24px] border px-4 py-4", message.unread ? "border-primary-200 bg-primary-50" : "border-border-light bg-background")}>
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{message.creatorName}</p>
                            <p className="text-xs text-text-light">Creator conversation</p>
                          </div>
                          <span className="text-xs text-text-light">{message.time}</span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-text-secondary">{message.preview}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-[28px] border border-border-light bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-text-light">Compose message</p>
                    <div className="mt-4 space-y-3">
                      <Input label="Recipient" value="Sentila Jamir" onChange={() => undefined} />
                      <textarea className="min-h-40 w-full rounded-[20px] border border-border bg-background p-4 text-sm text-text-primary outline-none transition focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100" defaultValue="We love your Meghalaya travel style. Can we align on a concept for our next launch?" />
                      <button type="button" className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-secondary px-5 text-sm font-semibold text-white shadow-sm">
                        Send message
                      </button>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            ) : null}

            {activeTab === "shortlist" ? (
              <DashboardCard title="Shortlist" description="Saved creators and campaign-ready profiles live here.">
                <div className="grid gap-4 md:grid-cols-2">
                  {brandShortlists.map((creator) => (
                    <div key={creator.id} className="rounded-[28px] border border-border-light bg-background p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{creator.creatorName}</p>
                          <p className="text-sm text-text-muted">{creator.category} · {creator.state}</p>
                        </div>
                        <Link href={`/creators/${creator.creatorSlug}`} className="text-sm font-semibold text-primary-600">
                          View profile
                        </Link>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                        <StatPill label="Followers" value={creator.followers} />
                        <StatPill label="Status" value={creator.status} />
                        <StatPill label="State" value={creator.state} />
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            ) : null}

            {activeTab === "campaigns" ? (
              <DashboardCard title="Campaigns" description="Track your live and planned campaigns.">
                <div className="grid gap-4 md:grid-cols-3">
                  {brandCampaigns.map((campaign) => (
                    <div key={campaign.id} className="rounded-[28px] border border-border-light bg-background p-5">
                      <p className="text-sm font-semibold text-text-primary">{campaign.title}</p>
                      <p className="mt-1 text-sm text-text-muted">{campaign.creatorCount}</p>
                      <div className="mt-4 space-y-2 text-sm text-text-secondary">
                        <Row label="Status" value={campaign.status} />
                        <Row label="Budget" value={campaign.budget} />
                        <Row label="Timeline" value={campaign.timeline} />
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}

function DashboardCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[34px] border border-white/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:p-7">
      <div>
        <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-text-muted">{description}</p>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-text-light">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full rounded-[20px] border border-border bg-background px-4 text-sm text-text-primary outline-none transition focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100"
      />
    </label>
  );
}

function Badge({ label, tone }: { label: string; tone: "green" | "blue" }) {
  return (
    <span className={cn("rounded-full px-4 py-2 text-sm font-semibold", tone === "green" ? "bg-success/10 text-success" : "bg-primary-50 text-primary-700")}>{label}</span>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/15 bg-white/10 p-3 text-white backdrop-blur-sm">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-text-muted">{label}</span>
      <span className="font-semibold text-text-primary">{value}</span>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-3 py-3 text-center shadow-sm ring-1 ring-border-light">
      <p className="text-[10px] uppercase tracking-[0.18em] text-text-light">{label}</p>
      <p className="mt-1 text-xs font-semibold text-text-primary">{value}</p>
    </div>
  );
}