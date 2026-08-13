import { NextResponse } from "next/server";

import { getPublishedFaqs } from "@/server/content-service";

export async function GET() {
  const faqs = await getPublishedFaqs();
  return NextResponse.json({ faqs });
}
