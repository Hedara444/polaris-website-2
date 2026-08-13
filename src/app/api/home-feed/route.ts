import { NextResponse } from "next/server";

import { getLatestArticles, getPublishedFaqs } from "@/server/content-service";

export async function GET() {
  const [articles, faqs] = await Promise.all([getLatestArticles(3), getPublishedFaqs(3)]);
  return NextResponse.json({ articles, faqs });
}
