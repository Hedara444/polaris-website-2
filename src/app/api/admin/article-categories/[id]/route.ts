import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/server/auth";
import {
  deleteArticleCategory,
  getArticleCategoryById,
  getArticlesByArticleCategoryId,
  upsertArticleCategory,
} from "@/server/content-service";
import { articleCategoryInputSchema } from "@/server/validators";

export const dynamic = "force-dynamic";

function parseId(idStr: string) {
  const id = parseInt(idStr, 10);
  return Number.isNaN(id) ? null : id;
}

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: idStr } = await props.params;
  const id = parseId(idStr);
  if (!id) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }

  const category = await getArticleCategoryById(id);
  if (!category) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const articles = await getArticlesByArticleCategoryId(id);
  return NextResponse.json({ category, articles }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: idStr } = await props.params;
  const id = parseId(idStr);
  if (!id) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }

  const existing = await getArticleCategoryById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const payload = await request.json();
  const parsed = articleCategoryInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid category." }, { status: 400 });
  }

  try {
    await upsertArticleCategory(id, parsed.data);
    revalidatePath("/");
    revalidatePath("/articles");
    revalidatePath("/admin/articles");
    revalidatePath("/admin/article-categories");
    revalidatePath(`/admin/article-categories/${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save category.";
    const status = message.includes("already exists") ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: idStr } = await props.params;
  const id = parseId(idStr);
  if (!id) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }

  await deleteArticleCategory(id);
  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
  revalidatePath("/admin/article-categories");
  return NextResponse.json({ success: true });
}
