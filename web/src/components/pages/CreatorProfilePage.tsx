import Link from "next/link";
import { ArrowLeft, BadgeCheck, MapPin, Globe, Clock3, Star } from "@/lib/icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { APP_CONFIG } from "@/lib/constants";
import { creatorProfiles } from "@/lib/creator-data";
import { cn, formatNumber } from "@/lib/utils";

export function CreatorProfilePage({ slug }: { slug: string }) {
  const creator = creatorProfiles.find((entry) => entry.slug === slug) ?? creatorProfiles[0];

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-text-primary sm:px-6 lg:px-8 lg:py-8">
      <JsonLd
        type="Person"
        data={{
          name: creator.name,
          url: `${APP_CONFIG.url}/creators/${creator.slug}`,
          description: creator.bio,
          jobTitle: creator.category,
          address: {
            "@type": "PostalAddress",
            addressLocality: creator.city,
            addressRegion: creator.state,
            addressCountry: "IN",
          },
          sameAs: Object.values(creator.socialLinks),
        }}
      />

      <div className="container-app">
        <div className="overflow-hidden rounded-[38px] border border-white/80 bg-white/90 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
          <div className={cn("relative overflow-hidden bg-gradient-to-r p-6 text-white md:p-8", creator.coverImage)}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.12),_transparent_26%)]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  <ArrowLeft className="h-4 w-4" /> Back to home
                </Link>
                <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border-4 border-white/40 bg-white/15 text-3xl font-semibold backdrop-blur-sm">
                    {creator.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] backdrop-blur-sm">
                      {creator.isVerified ? <BadgeCheck className="h-4 w-4 text-gold" /> : null}
                      {creator.category} Creator
                    </div>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{creator.name}</h1>
                    <p className="mt-3 max-w-2xl text-base leading-8 text-white/85 md:text-lg">{creator.tagline}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:w-[28rem] lg:grid-cols-1">
                <StatCard label="Followers" value={formatNumber(creator.followers)} />
                <StatCard label="Avg Views" value={formatNumber(creator.avgViews)} />
                <StatCard label="Engagement" value={`${creator.engagementRate.toFixed(1)}%`} />
              </div>
            </div>
          </div>

          <div className="grid gap-10 p-6 md:p-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-8">
              <SectionCard title="About">
                <p className="max-w-3xl text-base leading-8 text-text-secondary">{creator.bio}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Pill icon={MapPin}>{creator.city}, {creator.state}</Pill>
                  <Pill icon={Globe}>{creator.languages.join(" · ")}</Pill>
                  <Pill icon={Clock3}>{creator.availability}</Pill>
                  <Pill icon={Star}>{creator.rating.toFixed(1)} rating</Pill>
                </div>
              </SectionCard>

              <SectionCard title="Social links">
                <div className="grid gap-3 sm:grid-cols-3">
                  {Object.entries(creator.socialLinks).map(([key, href]) => (
                    <a key={key} href={href} target="_blank" rel="noreferrer" className="rounded-3xl border border-border-light bg-background px-4 py-4 text-sm font-medium text-text-secondary transition hover:border-primary-200 hover:text-primary-600">
                      {key}
                    </a>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Portfolio">
                <div className="grid gap-4 md:grid-cols-2">
                  {creator.portfolioMedia.map((item, index) => (
                    <div key={item} className="group rounded-[28px] border border-border-light bg-gradient-to-br from-white to-background p-5 shadow-sm transition hover:-translate-y-1">
                      <div className={cn("h-32 rounded-[22px] bg-gradient-to-br", index % 2 === 0 ? "from-primary-600 via-secondary to-accent-pink" : "from-success via-secondary to-primary-600")} />
                      <p className="mt-4 text-sm font-semibold text-text-primary">{item}</p>
                      <p className="mt-1 text-sm leading-7 text-text-muted">Ready for brand-safe storytelling, campaign recaps, and shareable highlights.</p>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Previous collaborations">
                <div className="flex flex-wrap gap-3">
                  {creator.previousCollabs.map((brand) => (
                    <span key={brand} className="rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">{brand}</span>
                  ))}
                </div>
              </SectionCard>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[32px] border border-white/80 bg-white p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-light">Performance</p>
                    <h2 className="mt-2 text-2xl font-semibold text-text-primary">Fast trust signals</h2>
                  </div>
                  {creator.isVerified ? (
                    <span className="rounded-full bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">Verified</span>
                  ) : null}
                </div>
                <div className="mt-6 space-y-4">
                  <Metric label="Response rate" value={creator.responseRate} />
                  <Metric label="Campaign fit" value="Strong" />
                  <Metric label="Availability" value={creator.availability} />
                </div>
                <div className="mt-6 flex gap-3">
                  <Link href="/register?type=brand" className="flex-1 rounded-full bg-gradient-to-r from-primary-600 to-secondary px-5 py-3 text-center text-sm font-semibold text-white shadow-sm">
                    Hire Now
                  </Link>
                  <Link href="/dashboard/creator" className="flex-1 rounded-full border border-border bg-white px-5 py-3 text-center text-sm font-semibold text-text-primary">
                    Open Dashboard
                  </Link>
                </div>
              </div>

              <div className="rounded-[32px] border border-white/80 bg-white p-6 shadow-card">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-light">Snapshot</p>
                <div className="mt-4 grid gap-3">
                  <InfoRow label="State" value={creator.state} />
                  <InfoRow label="Category" value={creator.category} />
                  <InfoRow label="Languages" value={creator.languages.join(", ")} />
                  <InfoRow label="Audience" value={`${formatNumber(creator.followers)} followers`} />
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
    <div className="rounded-[28px] border border-white/20 bg-white/12 p-5 text-white backdrop-blur-sm">
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