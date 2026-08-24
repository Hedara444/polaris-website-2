/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Unified DB interface.
 * - Local: sql.js file at data/polariss.sqlite (default, ephemeral-safe for dev)
 * - Remote: Turso/libSQL via TURSO_DATABASE_URL + TURSO_AUTH_TOKEN
 * Flag: DB_PROVIDER or presence of TURSO_DATABASE_URL.
 */

import { isTursoEnabled } from "@/server/db/config";
import { createSessionId, hashPassword, nowIso } from "@/server/db/common";

export { createSessionId, hashPassword, nowIso };

type SqlParams = unknown[] | Record<string, unknown>;

// Re-export via dynamic delegate to avoid circular import issues
import * as sqlite from "@/server/db/sqlite";
import * as turso from "@/server/db/turso";

export async function queryRows<T>(sql: string, params: SqlParams = []): Promise<T[]> {
  if (isTursoEnabled) {
    return turso.queryRows<T>(sql, params);
  }
  return sqlite.queryRows<T>(sql, params as any);
}

export async function queryFirst<T>(sql: string, params: SqlParams = []): Promise<T | null> {
  if (isTursoEnabled) {
    return turso.queryFirst<T>(sql, params);
  }
  return sqlite.queryFirst<T>(sql, params as any);
}

export async function execute(sql: string, params: SqlParams = []): Promise<void> {
  if (isTursoEnabled) {
    return turso.execute(sql, params);
  }
  return sqlite.execute(sql, params as any);
}

export async function runInTransaction<T>(
  callback: (db: any) => T | Promise<T>,
): Promise<T> {
  if (isTursoEnabled) {
    return turso.runInTransaction(callback);
  }
  return sqlite.runInTransaction(callback as any);
}

export async function getLastInsertId(): Promise<number> {
  if (isTursoEnabled) {
    return turso.getLastInsertId();
  }
  return sqlite.getLastInsertId();
}

// Keep sqlite getDatabaseState available for local-only callers (e.g. migrate script fallback)
export async function getDatabaseState() {
  if (isTursoEnabled) {
    // Turso does not expose sql.js DatabaseState; return null sentinel
    return null as any;
  }
  return sqlite.getDatabaseState();
}
