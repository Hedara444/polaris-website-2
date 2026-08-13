import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <section className="auth-page">
      <LoginForm error={params.error ? "Invalid username or password." : undefined} />
    </section>
  );
}
