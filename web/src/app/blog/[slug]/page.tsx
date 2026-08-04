import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { APP_CONFIG } from "@/lib/constants";
import { blogPosts } from "@/lib/content-data";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return {
      title: "Blog",
      description: "CreatorNE blog post",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${APP_CONFIG.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return (
      <main className="container-app min-h-[60vh] py-24">
        <h1 className="text-2xl font-semibold text-text-primary">Post not found</h1>
        <Link href="/blog" className="mt-4 inline-flex text-primary-700 hover:text-primary-800">
          Back to blog
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,#eef2ff)] pb-20 pt-24">
      <article className="container-app max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishedAt,
              author: {
                "@type": "Organization",
                name: post.author,
              },
              mainEntityOfPage: `${APP_CONFIG.url}/blog/${post.slug}`,
            }),
          }}
        />

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-text-muted md:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {post.publishedAt}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" />
              {post.readTimeMinutes} min read
            </span>
            <span>By {post.author}</span>
          </div>
        </header>

        <div className="mt-8 squircle border border-border/70 bg-white/90 p-6 shadow-[0_16px_34px_rgba(15,23,42,0.08)] md:p-8">
          <div className="space-y-5 text-base leading-8 text-text-secondary">
            {post.content.map((paragraph, index) => (
              <p key={`${post.slug}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
