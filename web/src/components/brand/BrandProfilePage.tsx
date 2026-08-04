import Link from "next/link";
import * as Icons from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { APP_CONFIG } from "@/lib/constants";
import { brandProfiles } from "@/lib/brand-data";
import { cn } from "@/lib/utils";

export function BrandProfilePage({ slug }: { slug: string }) {
  const brand = brandProfiles.find((entry) => entry.slug === slug) ?? brandProfiles[0];

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-text-primary sm:px-6 lg:px-8 lg:py-8">
      <JsonLd
        type="Organization"
        data={{
          name: brand.brandName,
          url: `${APP_CONFIG.url}/brands/${brand.slug}`,
          description: brand.description,
          areaServed: {
            "@type": "Place",
            name: brand.targetState,
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "brand partnerships",
            name: brand.contactPerson,
          },
        }}
      />

      <div className="container-app">
        <div className="overflow-hidden rounded-[38px] border border-white/80 bg-white/90 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
          <div className={cn("relative overflow-hidden bg-gradient-to-r p-6 text-white md:p-8", brand.coverImage)}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.12),_transparent_26%)]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  <Icons.ArrowLeft className="h-4 w-4" /> Back to home
                </Link>
                <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border-4 border-white/40 bg-white/15 text-3xl font-semibold backdrop-blur-sm">
                    {brand.brandName
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] backdrop-blur-sm">
                      <Icons.Building2 className="h-4 w-4 text-gold" />
                      {brand.industry}
                    </div>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{brand.brandName}</h1>
                    <p className="mt-3 max-w-2xl text-base leading-8 text-white/85 md:text-lg">{brand.headline}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:w-[28rem] lg:grid-cols-1">
                <StatCard label="Budget" value={brand.budget} />
                <StatCard label="Campaigns" value={`${brand.activeCampaigns}`} />
                <StatCard label="Reach" value={brand.reach} />
              </div>
            </div>
          </div>

          <div className="grid gap-10 p-6 md:p-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-8">
              <SectionCard title="About">
                <p className="max-w-3xl text-base leading-8 text-text-secondary">{brand.description}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Pill icon={Icons.UserRound}>{brand.contactPerson}</Pill>
                  <Pill icon={Icons.MapPin}>{brand.targetState}</Pill>
                  <Pill icon={Icons.Clock3}>{brand.timeline}</Pill>
                  <Pill icon={Icons.Target}>{brand.campaignGoal}</Pill>
                </div>
              </SectionCard>

              <SectionCard title="Website and contact">
                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoRow label="Website" value={brand.website ?? "Available on request"} />
                  <InfoRow label="Industry" value={brand.industry} />
                  <InfoRow label="Budget range" value={brand.budget} />
                  <InfoRow label="Primary goal" value={brand.campaignGoal} />
                </div>
              </SectionCard>

              <SectionCard title="Featured creator fit">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { title: "Travel creators", note: "State-led storytelling with strong discovery value." },
                    { title: "Food creators", note: "Local-first food content built for launches and recaps." },
                    { title: "Lifestyle creators", note: "Brand-friendly visuals with polished editorial presentation." },
                    { title: "Tech creators", note: "Explain complex products in clean, conversion-ready language." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-[28px] border border-border-light bg-background p-5">
                      <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-text-muted">{item.note}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[32px] border border-white/80 bg-white p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-light">Partnership summary</p>
                    <h2 className="mt-2 text-2xl font-semibold text-text-primary">Quick brand signals</h2>
                  </div>
                  {brand.isFeatured ? (
                    <span className="rounded-full bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">Featured</span>
                  ) : null}
                </div>
                <div className="mt-6 space-y-4">
                  <Metric label="Target state" value={brand.targetState} />
                  <Metric label="Campaigns live" value={`${brand.activeCampaigns}`} />
                  <Metric label="Contact person" value={brand.contactPerson} />
                </div>
                <div className="mt-6 flex gap-3">
                  <Link href="/dashboard/brand" className="flex-1 rounded-full bg-gradient-to-r from-primary-600 to-secondary px-5 py-3 text-center text-sm font-semibold text-white shadow-sm">
                    Open Dashboard
                  </Link>
                  <Link href="/register?type=brand" className="flex-1 rounded-full border border-border bg-white px-5 py-3 text-center text-sm font-semibold text-text-primary">
                    Update profile
                  </Link>
                </div>
              </div>

              <div className="rounded-[32px] border border-white/80 bg-white p-6 shadow-card">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-light">Campaign lens</p>
                <div className="mt-4 grid gap-3">
                  <InfoRow label="Goal" value={brand.campaignGoal} />
                  <InfoRow label="Budget" value={brand.budget} />
                  <InfoRow label="Timeline" value={brand.timeline} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[32px] border border-white/80 bg-white p-6 shadow-card md:p-7">
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[28px] border border-white/15 bg-white/12 p-5 text-white backdrop-blur-sm">
      <p className="text-sm text-white/75">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-border-light bg-background px-4 py-4">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}

function Pill({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">
      <Icon className="h-4 w-4" />
      {children}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border border-border-light bg-background px-4 py-4">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}