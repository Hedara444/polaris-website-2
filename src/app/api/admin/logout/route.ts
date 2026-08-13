import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { sessionCookieName } from "@/lib/site-config";
import { destroyAdminSession } from "@/server/auth";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(sessionCookieName)?.value;

  await destroyAdminSession(sessionId);

  const response = NextResponse.redirect(new URL("/admin/login", request.url), { status: 303 });
  response.cookies.delete(sessionCookieName);
  return response;
}
