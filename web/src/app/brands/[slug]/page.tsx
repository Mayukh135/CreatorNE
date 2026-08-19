import { notFound } from "next/navigation";
import { BrandProfilePage } from "@/components/pages/BrandProfilePage";
import { brandProfiles } from "@/lib/brand-data";

export function generateStaticParams() {
  return brandProfiles.map((brand) => ({ slug: brand.slug }));
}

export default async function BrandProfileRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const exists = brandProfiles.some((brand) => brand.slug === resolvedParams.slug);

  if (!exists) {
    notFound();
  }

  return <BrandProfilePage slug={resolvedParams.slug} />;
}