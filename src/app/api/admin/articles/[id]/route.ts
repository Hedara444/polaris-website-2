import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/server/auth";
import { deleteArticle, getAdminArticleById, upsertArticle } from "@/server/content-service";
import { articleInputSchema } from "@/server/validators";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const article = await getAdminArticleById(Number(id));
  if (!article) {
    return NextResponse.json({ error: "Article not found." }, { status: 404 });
  }

  return NextResponse.json({ article }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const payload = await request.json();
  const parsed = articleInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid article." }, { status: 400 });
  }

  const article = await upsertArticle(Number(id), parsed.data);
  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${article?.id ?? ""}`);
  revalidatePath(`/articles/${article?.slug ?? ""}`);
  return NextResponse.json({ article });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  await deleteArticle(Number(id));
  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
  return NextResponse.json({ ok: true });
}
