import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/server/auth";
import { getAdminArticleCategories, upsertArticleCategory } from "@/server/content-service";
import { articleCategoryInputSchema } from "@/server/validators";

export async function GET(request: Request) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const categories = await getAdminArticleCategories();
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = articleCategoryInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid category." }, { status: 400 });
  }

  try {
    const id = await upsertArticleCategory(null, parsed.data);
    revalidatePath("/articles");
    revalidatePath("/admin/articles");
    revalidatePath("/admin/article-categories");
    return NextResponse.json({ id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save category.";
    const status = message.includes("already exists") ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
