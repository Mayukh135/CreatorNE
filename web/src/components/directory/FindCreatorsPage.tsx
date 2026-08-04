"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { useMemo, useState } from "react";
import { directoryCategories, directoryCreators, directoryLanguages, directoryPlatforms, directoryStates } from "@/lib/directory-data";
import { cn, formatNumber } from "@/lib/utils";

type SortKey = "relevance" | "followers" | "engagement" | "newest";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "followers", label: "Followers" },
  { value: "engagement", label: "Engagement" },
  { value: "newest", label: "Newest" },
];

export function FindCreatorsPage({ initialCategory }: { initialCategory?: string }) {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState(initialCategory ?? "");
  const [platform, setPlatform] = useState("");
  const [language, setLanguage] = useState("");
  const [gender, setGender] = useState("");
  const [verified, setVerified] = useState("");
  const [sort, setSort] = useState<SortKey>("relevance");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (state) params.set("state", state);
    if (city) params.set("city", city);
    if (category) params.set("category", category);
    if (platform) params.set("platform", platform);
    if (language) params.set("language", language);
    if (gender) params.set("gender", gender);
    if (verified) params.set("verified", verified);
    if (sort) params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", "12");

    return fetch(`/api/creators?${params.toString()}`)
      .then((response) => response.json())
      .then((payload) => payload as { data?: typeof directoryCreators; meta?: { totalPages: number; total: number } })
      .catch(() => ({ data: directoryCreators.slice(0, 12), meta: { totalPages: 1, total: directoryCreators.length } }));
  }, [search, state, city, category, platform, language, gender, verified, sort, page]);

  const [results, setResults] = useState(directoryCreators.slice(0, 12));
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(directoryCreators.length);

  useMemo(() => {
    filtered.then((payload) => {
      setResults(payload.data ?? []);
      setTotalPages(payload.meta?.totalPages ?? 1);
      setTotalResults(payload.meta?.total ?? 0);
    });
  }, [filtered]);

  const clearFilters = () => {
    setSearch("");
    setState("");
    setCity("");
    setCategory(initialCategory ?? "");
    setPlatform("");
    setLanguage("");
    setGender("");
    setVerified("");
    setSort("relevance");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-background px-4 pt-28 pb-16 text-text-primary sm:px-6 lg:px-8 lg:pt-32">
      <div className="container-app">
        <div className="rounded-[38px] border border-white/80 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-border-light bg-background px-4 py-2 text-sm font-medium text-text-secondary">
                <Icons.ArrowLeft className="h-4 w-4" /> Back to home
              </Link>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">Find the Voice of the Northeast</h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-text-muted md:text-lg">
                Search by creator category, state, language, audience fit, and verification status to quickly shortlist creators for campaigns and collaborations.
              </p>

              <div className="mt-8 grid gap-4 rounded-[30px] border border-border-light bg-background p-4 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.5fr]">
                <SearchInput value={search} onChange={setSearch} placeholder="Search creators, states, cities, or tags" icon="Search" />
                <SelectInput value={category} onChange={setCategory} placeholder="Category" options={["", ...directoryCategories.map((item) => item.name)]} />
                <SelectInput value={state} onChange={setState} placeholder="State" options={["", ...directoryStates]} />
                <button type="button" onClick={() => setPage(1)} className="inline-flex h-14 items-center justify-center rounded-[20px] bg-gradient-to-r from-primary-600 to-secondary px-5 text-sm font-semibold text-white shadow-sm">
                  Search
                </button>
              </div>
            </div>

            <div className="grid gap-3">
              <StatBadge label="Creators" value={`${formatNumber(totalResults)}`} />
              <StatBadge label="States" value={`${directoryStates.length}`} />
              <StatBadge label="Categories" value={`${directoryCategories.length}`} />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <SortPicker value={sort} onChange={setSort} />
            <button type="button" onClick={clearFilters} className="inline-flex items-center gap-2 rounded-full border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-text-secondary transition hover:border-primary-200 hover:text-primary-600">
              <Icons.RotateCcw className="h-4 w-4" /> Clear filters
            </button>
            <div className="ml-auto text-sm text-text-muted">
              {results.length} creators shown
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[280px_1fr]">
            <aside className="space-y-4 rounded-[32px] border border-border-light bg-background p-5">
              <FilterSection title="Filters">
                <SelectInput value={platform} onChange={setPlatform} placeholder="Platform" options={["", ...directoryPlatforms, "Instagram", "YouTube", "Reels"]} />
                <SelectInput value={language} onChange={setLanguage} placeholder="Language" options={["", ...directoryLanguages]} />
                <SelectInput value={gender} onChange={setGender} placeholder="Gender" options={["", "Female", "Male", "Non-binary"]} />
                <SelectInput value={verified} onChange={setVerified} placeholder="Verified status" options={["", "true", "false"]} />
                <SelectInput value={city} onChange={setCity} placeholder="City" options={["", "Kohima", "Guwahati", "Shillong", "Agartala"]} />
              </FilterSection>

              <FilterSection title="Top categories">
                <div className="flex flex-wrap gap-2">
                  {directoryCategories.slice(0, 8).map((item) => (
                    <Link key={item.slug} href={`/categories/${item.slug}`} className="rounded-full bg-white px-3 py-2 text-sm font-medium text-text-secondary ring-1 ring-border-light transition hover:ring-primary-200 hover:text-primary-600">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </FilterSection>
            </aside>

            <section>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {results.map((creator) => (
                  <article key={creator.id} className="group overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-card">
                    <div className={cn("h-36 bg-gradient-to-br", creator.coverGradient)} />
                    <div className="relative px-5 pb-5 pt-0">
                      <div className="-mt-10 flex items-end justify-between gap-3">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border-4 border-white bg-white text-2xl font-semibold text-primary-700 shadow-[0_14px_30px_rgba(15,23,42,0.14)]">
                          {creator.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        {creator.isVerified ? <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Verified</span> : null}
                      </div>

                      <div className="mt-4 flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-semibold text-text-primary">{creator.name}</h2>
                          <p className="text-sm text-text-muted">{creator.category} · {creator.city}, {creator.state}</p>
                        </div>
                        <div className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">{creator.gender}</div>
                      </div>

                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">{creator.profileHint}</p>

                      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                        <MetaPill label="Followers" value={formatNumber(creator.followers)} />
                        <MetaPill label="Views" value={formatNumber(creator.avgViews)} />
                        <MetaPill label="Engagement" value={`${creator.engagementRate.toFixed(1)}%`} />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {creator.platform.map((platformItem) => (
                          <span key={platformItem} className="rounded-full bg-background px-3 py-1 text-[11px] font-medium text-text-secondary ring-1 ring-border-light">
                            {platformItem}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link href={`/creators/${creator.slug}`} className="flex-1 rounded-full bg-gradient-to-r from-primary-600 to-secondary px-4 py-3 text-center text-sm font-semibold text-white shadow-sm">
                          View Profile
                        </Link>
                        <Link href="/register?type=brand" className="flex-1 rounded-full border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-text-primary">
                          Hire Now
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <button type="button" disabled={page <= 1} onClick={() => setPage((current) => Math.max(current - 1, 1))} className="rounded-full border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-text-secondary disabled:opacity-50">
                  Previous
                </button>
                <div className="text-sm text-text-muted">
                  Page {page} of {totalPages}
                </div>
                <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-full border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-text-secondary disabled:opacity-50">
                  Next
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/80 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-light">{title}</p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function SearchInput({ value, onChange, placeholder, icon }: { value: string; onChange: (value: string) => void; placeholder: string; icon: keyof typeof Icons }) {
  const Icon = Icons[icon] as React.ComponentType<{ className?: string }>;

  return (
    <label className="relative block lg:col-span-1">
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-14 w-full rounded-[20px] border border-border bg-white pl-11 pr-4 text-sm text-text-primary outline-none transition placeholder:text-text-light focus:border-primary-300 focus:ring-4 focus:ring-primary-100"
      />
    </label>
  );
}

function SelectInput({ value, onChange, placeholder, options }: { value: string; onChange: (value: string) => void; placeholder: string; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-14 w-full rounded-[20px] border border-border bg-white px-4 text-sm text-text-primary outline-none transition focus:border-primary-300 focus:ring-4 focus:ring-primary-100"
      aria-label={placeholder}
    >
      {options.map((option) => (
        <option key={option || placeholder} value={option}>
          {option || placeholder}
        </option>
      ))}
    </select>
  );
}

function SortPicker({ value, onChange }: { value: SortKey; onChange: (value: SortKey) => void }) {
  return (
    <div className="inline-flex rounded-full border border-border-light bg-white p-1 shadow-sm">
      {sortOptions.map((option) => {
        const active = value === option.value;
        return (
          <button key={option.value} type="button" onClick={() => onChange(option.value)} className={cn("rounded-full px-4 py-2 text-sm font-medium transition", active ? "bg-primary-600 text-white shadow-sm" : "text-text-muted hover:text-text-primary")}>
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/80 bg-white p-5 shadow-sm">
      <p className="text-sm text-text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-text-primary">{value}</p>
    </div>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-background px-3 py-2 text-center ring-1 ring-border-light">
      <span className="block text-[10px] uppercase tracking-[0.18em] text-text-light">{label}</span>
      <span className="block text-xs font-semibold text-text-primary">{value}</span>
    </div>
  );
}
