import { AuthPage } from "@/components/auth/AuthPage";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <AuthPage
      mode="register"
      initialAudience={resolvedSearchParams?.type === "brand" ? "brand" : "creator"}
    />
  );
}