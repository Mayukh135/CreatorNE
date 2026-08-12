import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "@/lib/icons";
import { SectionHeader } from "@/components/content/SectionHeader";
import { blogPosts } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, playbooks, and updates for creators and brands building in Northeast India.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(1000px_500px_at_0%_0%,rgba(124,58,237,0.15),transparent),linear-gradient(to_bottom,#f8fafc,#eff6ff)] pb-20 pt-24">
      <section className="container-app">
        <SectionHeader
          eyebrow="CreatorNE Blog"
          title="Insights for creators and brands"
          description="Practical strategy, platform updates, and market signals from the Northeast creator ecosystem."
        />

        <div className="mt-8 grid gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="squircle border border-border/70 bg-white/90 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-text-muted">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-primary-700">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {post.publishedAt}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {post.readTimeMinutes} min read
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary md:text-base">{post.excerpt}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition hover:text-primary-800"
              >
                Read article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
