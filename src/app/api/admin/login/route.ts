import { NextResponse } from "next/server";
import { z } from "zod";

import { sessionCookieName } from "@/lib/site-config";
import { authenticateAdmin, createAdminSession } from "@/server/auth";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await request.json()
    : Object.fromEntries((await request.formData()).entries());
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    if (contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid credentials payload." }, { status: 400 });
    }

    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), { status: 303 });
  }

  const admin = await authenticateAdmin(parsed.data.username, parsed.data.password);
  if (!admin) {
    if (contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), { status: 303 });
  }

  const session = await createAdminSession(admin.id);
  const response = contentType.includes("application/json")
    ? NextResponse.json({ ok: true })
    : NextResponse.redirect(new URL("/admin", request.url), { status: 303 });

  response.cookies.set(sessionCookieName, session.sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: session.maxAge,
  });

  // Case 1: also set legacy cookie name so checks for __ckeditor-session-id pass
  response.cookies.set("__ckeditor-session-id", session.sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: session.maxAge,
  });

  // Case 3: mirror auth-storage (Zustand persist) as a cookie so the provider/middleware
  // can validate "no auth-storage / empty / not valid" without accessing localStorage
  const authStorageValue = JSON.stringify({
    state: { isAuthenticated: true, username: admin.username, sessionId: session.sessionId },
    version: 0,
  });
  response.cookies.set("auth-storage", authStorageValue, {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: session.maxAge,
  });

  return response;
}
