import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { sessionCookieName } from "@/lib/site-config";
import { createSessionId, execute, hashPassword, nowIso, queryFirst } from "@/server/db";

// --- Provider-level constants for the 3 guard cases ---
// Case 1: session cookie may be stored under the legacy name "__ckeditor-session-id"
export const legacySessionCookieName = "__ckeditor-session-id";
// Case 3: client "auth-storage" (Zustand persist) is mirrored as a cookie for server validation
export const authStorageCookieName = "auth-storage";

interface AdminUserRow {
  id: number;
  username: string;
  password_hash: string;
  password_salt: string;
}

interface SessionRow {
  id: string;
  admin_user_id: number;
  expires_at: string;
  username: string;
}

const sessionMaxAgeSeconds = 60 * 60 * 12;

function isValidAuthStorageValue(raw: string | undefined): boolean {
  // Case 3: no "auth-storage" or empty or not valid JSON/value
  if (raw === undefined || raw.trim() === "") {
    return false;
  }
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

async function findSessionById(sessionId?: string | null) {
  // Case 1: no session id or empty
  if (!sessionId || sessionId.trim() === "") {
    return null;
  }

  const trimmedId = sessionId.trim();

  const session = await queryFirst<SessionRow>(
    `
      SELECT admin_sessions.id, admin_sessions.admin_user_id, admin_sessions.expires_at, admin_users.username
      FROM admin_sessions
      INNER JOIN admin_users ON admin_users.id = admin_sessions.admin_user_id
      WHERE admin_sessions.id = ?
    `,
    [trimmedId],
  );

  // Case 2: refresh/access token not available (no DB row) or expired
  if (!session) {
    return null;
  }
  if (new Date(session.expires_at).getTime() < Date.now()) {
    // Proactively clean up expired session
    await execute("DELETE FROM admin_sessions WHERE id = ?", [trimmedId]).catch(() => {});
    return null;
  }

  return {
    id: session.id,
    adminUserId: session.admin_user_id,
    username: session.username,
    expiresAt: session.expires_at,
  };
}

function extractSessionIdFromCookieHeader(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const parts = cookieHeader.split(";").map((p) => p.trim());
  const primary = parts.find((p) => p.startsWith(`${sessionCookieName}=`))?.split("=")[1];
  if (primary && primary.trim() !== "") return primary.trim();
  const legacy = parts.find((p) => p.startsWith(`${legacySessionCookieName}=`))?.split("=")[1];
  if (legacy && legacy.trim() !== "") return legacy.trim();
  return undefined;
}

function extractSessionIdFromCookieStore(
  get: (name: string) => { value: string } | undefined,
): string | undefined {
  const primary = get(sessionCookieName)?.value;
  if (primary && primary.trim() !== "") return primary.trim();
  const legacy = get(legacySessionCookieName)?.value;
  if (legacy && legacy.trim() !== "") return legacy.trim();
  return undefined;
}

export async function authenticateAdmin(username: string, password: string) {
  const admin = await queryFirst<AdminUserRow>(
    "SELECT id, username, password_hash, password_salt FROM admin_users WHERE username = ?",
    [username],
  );

  if (!admin) {
    return null;
  }

  const attemptedHash = hashPassword(password, admin.password_salt);
  if (attemptedHash !== admin.password_hash) {
    return null;
  }

  return admin;
}

export async function createAdminSession(adminUserId: number) {
  const sessionId = await createSessionId();
  const expiresAt = new Date(Date.now() + sessionMaxAgeSeconds * 1000).toISOString();

  await execute(
    "INSERT INTO admin_sessions (id, admin_user_id, expires_at, created_at) VALUES (?, ?, ?, ?)",
    [sessionId, adminUserId, expiresAt, nowIso()],
  );

  return {
    sessionId,
    expiresAt,
    maxAge: sessionMaxAgeSeconds,
  };
}

export async function destroyAdminSession(sessionId?: string | null) {
  if (sessionId) {
    await execute("DELETE FROM admin_sessions WHERE id = ?", [sessionId]);
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  // Case 3: validate auth-storage alongside session (strict per spec: missing/empty/invalid -> unauthenticated)
  const authStorageRaw = cookieStore.get(authStorageCookieName)?.value;
  const hasAuthStorageCookie = cookieStore.has(authStorageCookieName);
  if (!hasAuthStorageCookie || !isValidAuthStorageValue(authStorageRaw)) {
    return null;
  }

  const sessionId = extractSessionIdFromCookieStore((name) => cookieStore.get(name));
  return findSessionById(sessionId);
}

export async function requireAdminPageAccess() {
  const cookieStore = await cookies();
  const sessionId = extractSessionIdFromCookieStore((name) => cookieStore.get(name));

  // Case 1: no session id (__ckeditor-session-id / polariss_admin_session)
  if (!sessionId) {
    redirect("/admin/login");
  }

  // Case 3: no auth-storage or empty or not valid
  const authStorageRaw = cookieStore.get(authStorageCookieName)?.value;
  const hasAuthStorageCookie = cookieStore.has(authStorageCookieName);
  if (!hasAuthStorageCookie || !isValidAuthStorageValue(authStorageRaw)) {
    redirect("/admin/login");
  }

  const session = await findSessionById(sessionId);
  // Case 2: refresh/access token not available or expired
  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireAdminApiAccess(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";

  // Case 3: extract and validate auth-storage for API (missing/empty/invalid -> 401)
  const authStorageMatch = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${authStorageCookieName}=`));
  if (authStorageMatch === undefined) {
    return null;
  }
  const raw = authStorageMatch.split("=").slice(1).join("=");
  if (!isValidAuthStorageValue(raw)) {
    return null;
  }

  const sessionId = extractSessionIdFromCookieHeader(cookieHeader);
  // Case 1 & 2 handled inside findSessionById (missing or expired -> null -> 401)
  const session = await findSessionById(sessionId);
  return session;
}

// Export helpers for middleware / testing
export const _internal = {
  isValidAuthStorageValue,
  extractSessionIdFromCookieHeader,
};
