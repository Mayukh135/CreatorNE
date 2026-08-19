import { AuthFlow } from "@/components/auth/AuthFlow";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <AuthFlow
      initialAudience={resolvedSearchParams?.type === "brand" ? "brand" : "creator"}
    />
  );
}