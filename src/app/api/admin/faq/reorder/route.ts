import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminApiAccess } from "@/server/auth";
import { reorderFaq } from "@/server/content-service";

const reorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.number().int(),
      sortOrder: z.number().int(),
    }),
  ),
});

export async function POST(request: Request) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = reorderSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid reorder payload." }, { status: 400 });
  }

  await reorderFaq(parsed.data.items);
  revalidatePath("/");
  revalidatePath("/faq-deprecated");
  return NextResponse.json({ ok: true });
}
