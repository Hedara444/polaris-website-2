import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { sessionCookieName } from "@/lib/site-config";
import { createSessionId, execute, hashPassword, nowIso, queryFirst } from "@/server/db/sqlite";

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

async function findSessionById(sessionId?: string | null) {
  if (!sessionId) {
    return null;
  }

  const session = await queryFirst<SessionRow>(
    `
      SELECT admin_sessions.id, admin_sessions.admin_user_id, admin_sessions.expires_at, admin_users.username
      FROM admin_sessions
      INNER JOIN admin_users ON admin_users.id = admin_sessions.admin_user_id
      WHERE admin_sessions.id = ?
    `,
    [sessionId],
  );

  if (!session || new Date(session.expires_at).getTime() < Date.now()) {
    return null;
  }

  return {
    id: session.id,
    adminUserId: session.admin_user_id,
    username: session.username,
    expiresAt: session.expires_at,
  };
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
  return findSessionById(cookieStore.get(sessionCookieName)?.value);
}

export async function requireAdminPageAccess() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireAdminApiAccess(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const sessionId = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${sessionCookieName}=`))
    ?.split("=")[1];

  const session = await findSessionById(sessionId);
  return session;
}
