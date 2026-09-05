/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient, type Client, type ResultSet } from "@libsql/client";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { seedArticles, seedFaqs } from "@/lib/content";
import { slugify } from "@/lib/utils";
import { assertTursoConfig, dbConfig } from "@/server/db/config";
import { hashPassword, nowIso } from "@/server/db/common";

type SqlParams = unknown[] | Record<string, unknown>;

let client: Client | null = null;
let readyPromise: Promise<void> | null = null;

function getClient(): Client {
  if (client) return client;
  assertTursoConfig();
  
  // Create a custom fetch that bypasses Next.js cache
  const customFetch = (url: RequestInfo | URL, init?: RequestInit) => {
    return fetch(url, {
      ...init,
      cache: "no-store",
    });
  };

  client = createClient({
    url: dbConfig.tursoUrl!,
    authToken: dbConfig.tursoAuthToken,
    fetch: customFetch as any,
  });
  return client;
}

function normalizeArgs(params: SqlParams): unknown[] | Record<string, unknown> | undefined {
  if (Array.isArray(params)) {
    return params.length === 0 ? undefined : params;
  }
  if (params && typeof params === "object") {
    const keys = Object.keys(params);
    if (keys.length === 0) return undefined;
    return params as Record<string, unknown>;
  }
  return undefined;
}

async function ensureTursoReady() {
  if (readyPromise) return readyPromise;
  readyPromise = (async () => {
    const c = getClient();
    await applyMigrations(c);
    await seedDatabase(c);
  })();
  return readyPromise;
}

// --- Low-level helpers ---

export async function queryRows<T>(sql: string, params: SqlParams = []): Promise<T[]> {
  await ensureTursoReady();
  const c = getClient();
  const args = normalizeArgs(params);
  const rs: ResultSet = args ? await c.execute({ sql, args } as any) : await c.execute(sql);
  return rs.rows as unknown as T[];
}

export async function queryFirst<T>(sql: string, params: SqlParams = []): Promise<T | null> {
  const rows = await queryRows<T>(sql, params);
  return rows[0] ?? null;
}

export async function execute(sql: string, params: SqlParams = []): Promise<void> {
  await ensureTursoReady();
  const c = getClient();
  const args = normalizeArgs(params);
  if (args) {
    await c.execute({ sql, args } as any);
  } else {
    await c.execute(sql);
  }
}

export async function getLastInsertId(): Promise<number> {
  const row = await queryFirst<{ "last_insert_rowid()": number | string }>(
    "SELECT last_insert_rowid()",
  );
  const v = row?.["last_insert_rowid()"];
  return Number(v ?? 0);
}

function toSqlJsExecResult(rs: ResultSet): Array<{ columns: string[]; values: unknown[][] }> {
  const columns = rs.columns as string[];
  const values = rs.rows.map((row: any) => columns.map((col) => (row as Record<string, unknown>)[col]));
  return [{ columns, values }];
}

export async function runInTransaction<T>(
  callback: (db: { run: (sql: string, params?: SqlParams) => Promise<unknown>; exec: (sql: string, params?: SqlParams) => Promise<any> }) => T | Promise<T>,
): Promise<T> {
  await ensureTursoReady();
  const c = getClient();
  const tx = await c.transaction("write");
  let committed = false;

  const wrapper = {
    run: async (sql: string, params: SqlParams = []) => {
      const args = normalizeArgs(params);
      const rs = args ? await tx.execute({ sql, args } as any) : await tx.execute(sql);
      return rs;
    },
    exec: async (sql: string, params: SqlParams = []) => {
      const args = normalizeArgs(params);
      const rs = args ? await tx.execute({ sql, args } as any) : await tx.execute(sql);
      return toSqlJsExecResult(rs);
    },
  };

  try {
    const result = await callback(wrapper as any);
    await tx.commit();
    committed = true;
    return result;
  } catch (e) {
    if (!committed) {
      try {
        await tx.rollback();
      } catch {}
    }
    throw e;
  } finally {
    try {
      tx.close();
    } catch {}
  }
}

// --- Migrations & seeding for Turso ---

async function applyMigrations(c: Client) {
  // Ensure schema_migrations table exists (handled by migration file itself, but create here for query)
  await c.execute(
    "CREATE TABLE IF NOT EXISTS schema_migrations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  );

  const migrationsDir = path.join(process.cwd(), "migrations");
  let files: string[] = [];
  try {
    files = (await readdir(migrationsDir)).filter((f) => f.endsWith(".sql")).sort();
  } catch {
    return;
  }

  for (const file of files) {
    const existing = await c.execute({ sql: "SELECT name FROM schema_migrations WHERE name = ?", args: [file] });
    if (existing.rows.length > 0) continue;

    const sql = await readFile(path.join(migrationsDir, file), "utf8");
    // Turso supports executeMultiple for multi-statement SQL
    try {
      // Try batch execution via transaction for atomicity
      const tx = await c.transaction("write");
      try {
        await tx.executeMultiple(sql);
        await tx.execute({ sql: "INSERT INTO schema_migrations (name) VALUES (?)", args: [file] });
        await tx.commit();
      } catch (e) {
        await tx.rollback().catch(() => {});
        throw e;
      } finally {
        tx.close();
      }
    } catch {
      // Fallback: execute each statement individually if executeMultiple not available
      const statements = sql
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
      const tx2 = await c.transaction("write");
      try {
        for (const stmt of statements) {
          await tx2.execute(stmt);
        }
        await tx2.execute({ sql: "INSERT INTO schema_migrations (name) VALUES (?)", args: [file] });
        await tx2.commit();
      } catch (e) {
        await tx2.rollback().catch(() => {});
        throw e;
      } finally {
        tx2.close();
      }
    }
  }
}

async function seedDatabase(c: Client) {
  const adminCheck = await c.execute("SELECT id FROM admin_users LIMIT 1");
  if (adminCheck.rows.length === 0) {
    const username = process.env.ADMIN_USERNAME ?? "admin";
    const password = process.env.ADMIN_PASSWORD ?? "change-me";
    const salt = process.env.ADMIN_PASSWORD_SALT ?? "polariss-dev-salt";
    const passwordHash = hashPassword(password, salt);
    await c.execute({
      sql: "INSERT INTO admin_users (username, password_hash, password_salt, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
      args: [username, passwordHash, salt, nowIso(), nowIso()],
    });
  }

  const articlesCheck = await c.execute("SELECT id FROM articles LIMIT 1");
  if (articlesCheck.rows.length === 0) {
    for (const article of seedArticles) {
      const categorySlug = slugify(article.categoryName);
      const catRow = await c.execute({ sql: "SELECT id FROM article_categories WHERE slug = ?", args: [categorySlug] });
      let categoryId: number | null = (catRow.rows[0] as any)?.id ? Number((catRow.rows[0] as any).id) : null;

      if (!categoryId) {
        const catRes = await c.execute({
          sql: "INSERT INTO article_categories (name, slug, created_at, updated_at) VALUES (?, ?, ?, ?)",
          args: [article.categoryName, categorySlug, nowIso(), nowIso()],
        });
        categoryId = Number(catRes.lastInsertRowid ?? 0) || null;
        if (!categoryId) {
          const idRow = await c.execute("SELECT last_insert_rowid() as id");
          categoryId = Number((idRow.rows[0] as any)?.id ?? 0) || null;
        }
      }

      const artRes = await c.execute({
        sql: "INSERT INTO articles (title, slug, description, cover_image_url, category_id, body_html, direction, status, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args: [
          article.title,
          slugify(article.title),
          article.description,
          article.coverImageUrl,
          categoryId,
          article.bodyHtml,
          article.direction,
          "published",
          nowIso(),
          nowIso(),
          nowIso(),
        ],
      });
      let articleId = Number(artRes.lastInsertRowid ?? 0);
      if (!articleId) {
        const idRow = await c.execute("SELECT last_insert_rowid() as id");
        articleId = Number((idRow.rows[0] as any)?.id ?? 0);
      }

      for (const keyword of article.keywords) {
        await c.execute({
          sql: "INSERT INTO article_keywords (article_id, keyword) VALUES (?, ?)",
          args: [articleId, keyword],
        });
      }
    }
  }

  const faqCheck = await c.execute("SELECT id FROM faq_items LIMIT 1");
  if (faqCheck.rows.length === 0) {
    for (const faq of seedFaqs) {
      const faqRes = await c.execute({
        sql: "INSERT INTO faq_items (question, answer, category_id, sort_order, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [faq.question, faq.answer, null, faq.sortOrder, "published", nowIso(), nowIso()],
      });
      let faqId = Number(faqRes.lastInsertRowid ?? 0);
      if (!faqId) {
        const idRow = await c.execute("SELECT last_insert_rowid() as id");
        faqId = Number((idRow.rows[0] as any)?.id ?? 0);
      }
      for (const keyword of faq.keywords) {
        await c.execute({
          sql: "INSERT INTO faq_keywords (faq_id, keyword) VALUES (?, ?)",
          args: [faqId, keyword],
        });
      }
    }
  }
}
