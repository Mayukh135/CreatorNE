import { notFound } from "next/navigation";
import { CreatorProfilePage } from "@/components/pages/CreatorProfilePage";
import { creatorProfiles } from "@/lib/creator-data";

export function generateStaticParams() {
  return creatorProfiles.map((creator) => ({ slug: creator.slug }));
}

export default async function CreatorProfileRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const exists = creatorProfiles.some((creator) => creator.slug === resolvedParams.slug);

  if (!exists) {
    notFound();
  }

  return <CreatorProfilePage slug={resolvedParams.slug} />;
}