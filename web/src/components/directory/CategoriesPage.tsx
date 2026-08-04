import Link from "next/link";
import * as Icons from "lucide-react";
import { directoryCategories } from "@/lib/directory-data";

export function CategoriesPage() {
  return (
    <main className="min-h-screen bg-background px-4 pt-28 pb-16 text-text-primary sm:px-6 lg:px-8 lg:pt-32">
      <div className="container-app">
        <div className="rounded-[38px] border border-white/80 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:p-8">
          <Link href="/find-creators" className="inline-flex items-center gap-2 rounded-full border border-border-light bg-background px-4 py-2 text-sm font-medium text-text-secondary">
            <Icons.ArrowLeft className="h-4 w-4" /> Back to directory
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary-600">Categories</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">All creator categories in one premium directory view.</h1>
            <p className="mt-4 text-base leading-8 text-text-muted md:text-lg">Browse every category, compare creator counts, and jump into a filtered directory view with one click.</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {directoryCategories.map((category) => {
              const Icon = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

              return (
                <Link
                  key={category.slug}
                  href={`/find-creators?category=${encodeURIComponent(category.name)}`}
                  className="group rounded-[32px] border border-border-light bg-background p-5 transition hover:-translate-y-1 hover:border-primary-200 hover:bg-white hover:shadow-[0_22px_50px_rgba(124,58,237,0.12)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-text-muted ring-1 ring-border-light">{category.creatorCount} creators</span>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-text-primary">{category.name}</h2>
                  <p className="mt-2 text-sm leading-7 text-text-muted">View creators who fit this category and open a filtered directory view instantly.</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-600">
                    Explore category
                    <Icons.MoveRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}