"use client";

import Link from "next/link";
import { resolveIcon } from "@/lib/icons";
import { useMemo, useState } from "react";
import { adminApprovals, adminSettings, adminStats, adminUsers } from "@/lib/admin-data";
import { conversations, messages } from "@/lib/message-data";
import { cn, formatNumber } from "@/lib/utils";

type AdminTab = "overview" | "approvals" | "users" | "messages" | "analytics" | "export" | "settings";

const adminTabs: { key: AdminTab; label: string; icon: string }[] = [
  { key: "overview", label: "Overview", icon: "LayoutDashboard" },
  { key: "approvals", label: "Approvals", icon: "ShieldCheck" },
  { key: "users", label: "Users", icon: "UsersRound" },
  { key: "messages", label: "Messages", icon: "MessagesSquare" },
  { key: "analytics", label: "Analytics", icon: "ChartNoAxesCombined" },
  { key: "export", label: "Export", icon: "FileDown" },
  { key: "settings", label: "Settings", icon: "Settings2" },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const unreadCount = useMemo(() => messages.filter((message) => !message.readAt).length, []);

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-text-primary sm:px-6 lg:px-8 lg:py-8">
      <div className="container-app">
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="rounded-[34px] border border-white/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <div className="rounded-[28px] bg-gradient-to-br from-primary-600 via-secondary to-accent-pink p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-xl font-semibold backdrop-blur-sm">
                  CN
                </div>
                <div>
                  <p className="text-lg font-semibold">CreatorNE Admin</p>
                  <p className="text-sm text-white/80">Platform control center</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
                <MiniStat label="Creators" value="500+" />
                <MiniStat label="Brands" value="120+" />
                <MiniStat label="Threads" value={formatNumber(conversations.length)} />
              </div>
            </div>

            <nav className="mt-5 space-y-2">
              {adminTabs.map((tab) => {
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
                    {tab.key === "messages" && unreadCount ? (
                      <span className="rounded-full bg-accent-pink px-2 py-1 text-[11px] font-semibold text-white">
                        {unreadCount}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 grid gap-3">
              <Link href="/" className="rounded-[22px] border border-border-light bg-white px-4 py-4 text-sm font-medium text-text-secondary transition hover:border-primary-200 hover:text-primary-600">
                Back to homepage
              </Link>
              <Link href="/api/admin/export" className="rounded-[22px] bg-gradient-to-r from-primary-600 to-secondary px-4 py-4 text-center text-sm font-semibold text-white">
                Export data
              </Link>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[34px] border border-white/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:p-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.26em] text-text-light">Admin panel</p>
                  <h1 className="mt-2 text-3xl font-semibold text-text-primary md:text-4xl">Approve users, review campaigns, and manage the site.</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge label="Live platform" tone="blue" />
                  <Badge label="Protected access" tone="green" />
                </div>
              </div>
            </div>

            {activeTab === "overview" ? (
              <DashboardCard title="Overview" description="High-level metrics for the platform and the current approval pipeline.">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {adminStats.map((stat) => (
                    <div key={stat.key} className={cn("rounded-[30px] bg-gradient-to-br p-5 text-white shadow-sm", stat.tone)}>
                      <p className="text-sm text-white/80">{stat.label}</p>
                      <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <InfoPanel title="Pending actions" items={["Review creator approvals", "Check brand documents", "Respond to unread threads", "Refresh featured content"]} />
                  <InfoPanel title="System status" items={["Auth session refresh enabled", "Messaging endpoints seeded", "API routes ready for Prisma wiring", "Homepage content synced"]} />
                </div>
              </DashboardCard>
            ) : null}

            {activeTab === "approvals" ? (
              <DashboardCard title="Approvals" description="Pending creator and brand registrations awaiting review.">
                <div className="grid gap-4 xl:grid-cols-2">
                  {adminApprovals.map((item) => (
                    <div key={item.id} className="rounded-[28px] border border-border-light bg-background p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{item.name}</p>
                          <p className="text-sm text-text-muted">{item.role} · {item.location}</p>
                        </div>
                        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">{item.status}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3 text-sm text-text-muted">
                        <span>Submitted {item.submittedAt}</span>
                        <div className="flex gap-2">
                          <button className="rounded-full bg-success/10 px-3 py-2 text-success">Approve</button>
                          <button className="rounded-full bg-accent-pink/10 px-3 py-2 text-accent-pink">Reject</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            ) : null}

            {activeTab === "users" ? (
              <DashboardCard title="Users" description="Search and manage creator, brand, and admin accounts.">
                <div className="grid gap-4">
                  {adminUsers.map((user) => (
                    <div key={user.id} className="rounded-[28px] border border-border-light bg-background p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{user.name}</p>
                          <p className="text-sm text-text-muted">{user.email}</p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="rounded-full bg-primary-50 px-3 py-1.5 font-medium text-primary-700">{user.role}</span>
                          <span className="rounded-full bg-white px-3 py-1.5 font-medium text-text-secondary ring-1 ring-border-light">{user.status}</span>
                          <span className="rounded-full bg-white px-3 py-1.5 font-medium text-text-secondary ring-1 ring-border-light">{user.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            ) : null}

            {activeTab === "messages" ? (
              <DashboardCard title="Messages" description="View all conversations and jump into any thread.">
                <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
                  <div className="space-y-3">
                    {conversations.map((conversation) => (
                      <div key={conversation.id} className="rounded-[24px] border border-border-light bg-background p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{conversation.participantNames.join(" · ")}</p>
                            <p className="text-xs text-text-light">{conversation.lastMessageAt}</p>
                          </div>
                          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                            {conversation.unreadCount} unread
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-text-secondary">{conversation.lastMessage}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-[28px] border border-border-light bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-text-light">Conversation</p>
                    <div className="mt-4 space-y-3">
                      {messages.map((message) => (
                        <div key={message.id} className={cn("rounded-[22px] border px-4 py-4", message.senderRole === "Admin" ? "border-primary-200 bg-primary-50" : "border-border-light bg-background")}>
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-text-primary">{message.senderName}</p>
                            <span className="text-xs text-text-light">{message.createdAt}</span>
                          </div>
                          <p className="mt-2 text-sm leading-7 text-text-secondary">{message.content}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 space-y-3">
                      <textarea className="min-h-32 w-full rounded-[20px] border border-border bg-background p-4 text-sm text-text-primary outline-none transition focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100" defaultValue="Write a message to the selected creator or brand..." />
                      <button type="button" className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-secondary px-5 text-sm font-semibold text-white shadow-sm">
                        Send message
                      </button>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            ) : null}

            {activeTab === "analytics" ? (
              <DashboardCard title="Analytics" description="Platform performance and moderation signals.">
                <div className="grid gap-4 md:grid-cols-3">
                  <MetricCard label="Total creators" value="500+" note="Across the Northeast" />
                  <MetricCard label="Total brands" value="120+" note="Active and pending" />
                  <MetricCard label="Unread messages" value={formatNumber(unreadCount)} note="Across all inboxes" />
                </div>
              </DashboardCard>
            ) : null}

            {activeTab === "export" ? (
              <DashboardCard title="Export" description="Download structured data and share platform snapshots.">
                <div className="grid gap-4 md:grid-cols-2">
                  <ActionCard title="Creator export" description="CSV or Excel download for creator profiles and stats." icon="FileSpreadsheet" />
                  <ActionCard title="Brand export" description="CSV or Excel download for brand profiles and campaign notes." icon="FileSpreadsheet" />
                </div>
              </DashboardCard>
            ) : null}

            {activeTab === "settings" ? (
              <DashboardCard title="Website settings" description="Control featured content and homepage content sources.">
                <div className="grid gap-3 md:grid-cols-2">
                  {adminSettings.map((setting) => (
                    <div key={setting.label} className="rounded-[24px] border border-border-light bg-background p-4">
                      <p className="text-sm font-semibold text-text-primary">{setting.label}</p>
                      <p className="mt-2 text-sm leading-7 text-text-muted">{setting.value}</p>
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

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[28px] border border-border-light bg-background p-5">
      <p className="text-sm font-semibold text-text-primary">{title}</p>
      <ul className="mt-4 space-y-3 text-sm text-text-secondary">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[28px] border border-border-light bg-background p-5">
      <p className="text-sm text-text-muted">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-text-primary">{value}</p>
      <p className="mt-2 text-sm leading-7 text-text-secondary">{note}</p>
    </div>
  );
}

function ActionCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  const Icon = resolveIcon(icon) as React.ComponentType<{ className?: string }>;

  return (
    <div className="rounded-[28px] border border-border-light bg-background p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-sm font-semibold text-text-primary">{title}</p>
      <p className="mt-2 text-sm leading-7 text-text-muted">{description}</p>
    </div>
  );
}
