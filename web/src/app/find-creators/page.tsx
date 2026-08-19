import { FindCreatorsPage } from "@/components/pages/FindCreatorsPage";

export default async function FindCreatorsRoute({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  return <FindCreatorsPage initialCategory={resolvedSearchParams?.category} />;
}