import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/server/auth";
import { getAdminArticles, upsertArticle } from "@/server/content-service";
import { articleInputSchema } from "@/server/validators";

export async function GET(request: Request) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const articles = await getAdminArticles();
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = articleInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid article." }, { status: 400 });
  }

  const article = await upsertArticle(null, parsed.data);
  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${article?.id ?? ""}`);
  revalidatePath(`/articles/${article?.slug ?? ""}`);
  return NextResponse.json({ article });
}
