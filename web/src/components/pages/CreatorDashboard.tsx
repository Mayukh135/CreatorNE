"use client";

import { resolveIcon } from "@/lib/icons";
import Link from "next/link";
import { useMemo, useState } from "react";
import { creatorCampaigns, creatorMessages, creatorNotifications, creatorProfiles } from "@/lib/creator-data";
import { cn, formatNumber } from "@/lib/utils";

type CreatorTab = "profile" | "messages" | "campaigns" | "notifications";

const dashboardTabs: { key: CreatorTab; label: string; icon: string }[] = [
  { key: "profile", label: "Profile", icon: "UserRound" },
  { key: "messages", label: "Messages", icon: "MessagesSquare" },
  { key: "campaigns", label: "Campaigns", icon: "LayoutGrid" },
  { key: "notifications", label: "Notifications", icon: "BellRing" },
];

export function CreatorDashboard() {
  const creator = creatorProfiles[0];
  const [activeTab, setActiveTab] = useState<CreatorTab>("profile");
  const [profile, setProfile] = useState({
    bio: creator.bio,
    city: creator.city,
    state: creator.state,
    category: creator.category,
    whatsapp: "+91 98XXXXXX",
  });

  const unreadMessages = useMemo(() => creatorMessages.filter((message) => message.unread).length, []);

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-text-primary sm:px-6 lg:px-8 lg:py-8">
      <div className="container-app">
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="rounded-[34px] border border-white/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <div className="rounded-[28px] bg-gradient-to-br from-primary-600 via-secondary to-accent-pink p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-xl font-semibold backdrop-blur-sm">
                  SJ
                </div>
                <div>
                  <p className="text-lg font-semibold">{creator.name}</p>
                  <p className="text-sm text-white/80">{creator.category} creator</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
                <MiniStat label="Followers" value={formatNumber(creator.followers)} />
                <MiniStat label="Views" value={formatNumber(creator.avgViews)} />
                <MiniStat label="Engagement" value={`${creator.engagementRate.toFixed(1)}%`} />
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
              <Link href="/creators/sentila-jamir" className="rounded-[22px] border border-border-light bg-white px-4 py-4 text-sm font-medium text-text-secondary transition hover:border-primary-200 hover:text-primary-600">
                View public profile
              </Link>
              <Link href="/register?type=brand" className="rounded-[22px] bg-gradient-to-r from-primary-600 to-secondary px-4 py-4 text-center text-sm font-semibold text-white">
                Invite a brand contact
              </Link>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[34px] border border-white/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:p-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.26em] text-text-light">Creator dashboard</p>
                  <h1 className="mt-2 text-3xl font-semibold text-text-primary md:text-4xl">Manage your profile, conversations, and opportunities.</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge label="Approval: Pending" tone="amber" />
                  <Badge label="2 active conversations" tone="blue" />
                </div>
              </div>
            </div>

            {activeTab === "profile" ? (
              <DashboardCard title="Profile editor" description="Edit the same fields the registration flow captured, plus quick creator-facing details.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Bio" value={profile.bio} onChange={(value) => setProfile((current) => ({ ...current, bio: value }))} />
                  <Input label="WhatsApp" value={profile.whatsapp} onChange={(value) => setProfile((current) => ({ ...current, whatsapp: value }))} />
                  <Input label="City" value={profile.city} onChange={(value) => setProfile((current) => ({ ...current, city: value }))} />
                  <Input label="State" value={profile.state} onChange={(value) => setProfile((current) => ({ ...current, state: value }))} />
                  <Input label="Category" value={profile.category} onChange={(value) => setProfile((current) => ({ ...current, category: value }))} />
                  <Input label="Portfolio upload" value="Cloudinary upload enabled" onChange={() => undefined} />
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
              <DashboardCard title="Messages" description="Messages from brands and admin appear here. Creators can reply, but cannot initiate creator-to-creator chats.">
                <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                  <div className="space-y-3">
                    {creatorMessages.map((message) => (
                      <div key={message.id} className={cn("rounded-[24px] border px-4 py-4", message.unread ? "border-primary-200 bg-primary-50" : "border-border-light bg-background")}>
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{message.sender}</p>
                            <p className="text-xs text-text-light">{message.role}</p>
                          </div>
                          <span className="text-xs text-text-light">{message.time}</span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-text-secondary">{message.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-[28px] border border-border-light bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-text-light">Compose reply</p>
                    <div className="mt-4 space-y-3">
                      <Input label="Subject" value="Travel collaboration follow-up" onChange={() => undefined} />
                      <textarea className="min-h-40 w-full rounded-[20px] border border-border bg-background p-4 text-sm text-text-primary outline-none transition focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100" defaultValue="Thanks for the brief. I can share a concept and turnaround by tomorrow." />
                      <button type="button" className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-secondary px-5 text-sm font-semibold text-white shadow-sm">
                        Send reply
                      </button>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            ) : null}

            {activeTab === "campaigns" ? (
              <DashboardCard title="Campaign opportunities" description="A focused list of incoming opportunities and draft work.">
                <div className="grid gap-4 md:grid-cols-3">
                  {creatorCampaigns.map((campaign) => (
                    <div key={campaign.id} className="rounded-[28px] border border-border-light bg-background p-5">
                      <p className="text-sm font-semibold text-text-primary">{campaign.title}</p>
                      <p className="mt-1 text-sm text-text-muted">{campaign.brand}</p>
                      <div className="mt-4 space-y-2 text-sm text-text-secondary">
                        <Row label="Status" value={campaign.status} />
                        <Row label="Budget" value={campaign.budget} />
                        <Row label="Due" value={campaign.dueDate} />
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            ) : null}

            {activeTab === "notifications" ? (
              <DashboardCard title="Notifications" description="Keep an eye on approvals, new matches, and deadlines.">
                <div className="space-y-3">
                  {creatorNotifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-4 rounded-[24px] border border-border-light bg-background p-4">
                      <div className={cn("mt-1 h-3 w-3 rounded-full bg-gradient-to-br", notification.accent)} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-text-primary">{notification.title}</p>
                          <span className="text-xs text-text-light">{notification.time}</span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-text-secondary">{notification.description}</p>
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

function Badge({ label, tone }: { label: string; tone: "amber" | "blue" }) {
  return (
    <span className={cn("rounded-full px-4 py-2 text-sm font-semibold", tone === "amber" ? "bg-gold/15 text-[#9a6700]" : "bg-primary-50 text-primary-700")}>{label}</span>
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