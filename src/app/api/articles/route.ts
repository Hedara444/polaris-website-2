import { NextResponse } from "next/server";

import { listPublishedArticles } from "@/server/content-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const category = searchParams.get("category") ?? undefined;

  const result = await listPublishedArticles(page, 6, category);
  return NextResponse.json(result);
}
