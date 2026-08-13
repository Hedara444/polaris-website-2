import { NextResponse } from "next/server";

import { getCategoryList } from "@/server/content-service";

export async function GET() {
  const categories = await getCategoryList();
  return NextResponse.json({ categories });
}
