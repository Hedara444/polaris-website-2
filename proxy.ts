import { NextResponse, type NextRequest } from "next/server";

import { sessionCookieName } from "@/lib/site-config";

const legacySessionCookieName = "__ckeditor-session-id";
const authStorageCookieName = "auth-storage";

function isValidAuthStorageValue(raw: string | undefined): boolean {
  if (raw === undefined || raw.trim() === "") return false;
  const candidates: string[] = [raw];
  try {
    candidates.push(decodeURIComponent(raw));
  } catch {}
  try {
    candidates.push(decodeURIComponent(decodeURIComponent(raw)));
  } catch {}
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      if (parsed === null || parsed === undefined) continue;
      if (typeof parsed === "string" && parsed.trim() === "") continue;
      if (typeof parsed === "object" && Object.keys(parsed as object).length === 0) continue;
      return true;
    } catch {}
  }
  return false;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and login/logout API to be accessed without session
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/") ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  // Only protect /admin and /api/admin (except allowed above)
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname.startsWith("/api/admin/");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  // Case 1: no session id (__ckeditor-session-id / polariss_admin_session)
  const sessionId =
    request.cookies.get(sessionCookieName)?.value?.trim() ||
    request.cookies.get(legacySessionCookieName)?.value?.trim();

  const authStorageRaw = request.cookies.get(authStorageCookieName)?.value;
  const hasAuthStorage = request.cookies.has(authStorageCookieName);
  const authValid = isValidAuthStorageValue(authStorageRaw);

  if (!sessionId) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Case 3: no "auth-storage" or empty or not valid
  if (!hasAuthStorage || !authValid) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Case 2 (expired token) cannot be verified without DB in edge middleware;
  // it is handled by `requireAdminPageAccess` / `requireAdminApiAccess` which checks
  // DB expires_at and deletes expired sessions. Middleware lets the request through
  // and the page/API will redirect / 401 if token is expired.

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};

