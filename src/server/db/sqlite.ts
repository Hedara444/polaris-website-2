import { createHash, randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import initSqlJs, { type Database, type ParamsObject, type SqlJsStatic } from "sql.js";

import { seedArticles, seedFaqs } from "@/lib/content";
import { slugify } from "@/lib/utils";

const storageDir = path.join(process.cwd(), "data");
const databaseFile = path.join(storageDir, "polariss.sqlite");
const migrationsDir = path.join(process.cwd(), "migrations");

type SqlParams = ParamsObject | unknown[];

interface DatabaseState {
  SQL: SqlJsStatic;
  db: Database;
  databaseMtimeMs: number;
  databaseSize: number;
}

let databaseStatePromise: Promise<DatabaseState> | null = null;
let databaseState: DatabaseState | null = null;

function locateSqlJsFile(file: string) {
  return path.join(process.cwd(), "node_modules", "sql.js", "dist", file);
}

function toRows<T>(statement: ReturnType<Database["prepare"]>) {
  const rows: T[] = [];

  while (statement.step()) {
    rows.push(statement.getAsObject() as T);
  }

  return rows;
}

async function persistDatabase(db: Database) {
  await mkdir(storageDir, { recursive: true });
  await writeFile(databaseFile, Buffer.from(db.export()));
  try {
    const stats = await stat(databaseFile);
    if (databaseState) {
      databaseState.databaseMtimeMs = stats.mtimeMs;
      databaseState.databaseSize = stats.size;
    }
  } catch {}
}

async function applyMigrations(db: Database) {
  db.run(
    "CREATE TABLE IF NOT EXISTS schema_migrations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  );

  const files = (await readdir(migrationsDir))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const existing = db.exec(
      "SELECT name FROM schema_migrations WHERE name = $name",
      { $name: file },
    );

    if (existing.length > 0 && existing[0].values.length > 0) {
      continue;
    }

    const sql = await readFile(path.join(migrationsDir, file), "utf8");
    db.run("BEGIN");
    try {
      db.exec(sql);
      db.run(
        "INSERT INTO schema_migrations (name) VALUES ($name)",
        { $name: file },
      );
      db.run("COMMIT");
    } catch (error) {
      db.run("ROLLBACK");
      throw error;
    }
  }

  await persistDatabase(db);
}

function hashPassword(password: string, salt: string) {
  return createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

function nowIso() {
  return new Date().toISOString();
}

async function seedDatabase(db: Database) {
  const adminExists = db.exec("SELECT id FROM admin_users LIMIT 1");

  if (adminExists.length === 0 || adminExists[0].values.length === 0) {
    const username = process.env.ADMIN_USERNAME ?? "admin";
    const password = process.env.ADMIN_PASSWORD ?? "change-me";
    const salt = process.env.ADMIN_PASSWORD_SALT ?? "polariss-dev-salt";
    const passwordHash = hashPassword(password, salt);

    db.run(
      "INSERT INTO admin_users (username, password_hash, password_salt, created_at, updated_at) VALUES ($username, $passwordHash, $passwordSalt, $createdAt, $updatedAt)",
      {
        $username: username,
        $passwordHash: passwordHash,
        $passwordSalt: salt,
        $createdAt: nowIso(),
        $updatedAt: nowIso(),
      },
    );
  }

  const articlesExist = db.exec("SELECT id FROM articles LIMIT 1");
  if (articlesExist.length === 0 || articlesExist[0].values.length === 0) {
    for (const article of seedArticles) {
      const categorySlug = slugify(article.categoryName);
      const categoryLookup = db.exec(
        "SELECT id FROM article_categories WHERE slug = $slug",
        { $slug: categorySlug },
      );

      let categoryId = Number(categoryLookup[0]?.values[0]?.[0] ?? 0);

      if (!categoryId) {
        db.run(
          "INSERT INTO article_categories (name, slug, created_at, updated_at) VALUES ($name, $slug, $createdAt, $updatedAt)",
          {
            $name: article.categoryName,
            $slug: categorySlug,
            $createdAt: nowIso(),
            $updatedAt: nowIso(),
          },
        );

        const categoryIdResult = db.exec("SELECT last_insert_rowid()");
        categoryId = Number(categoryIdResult[0].values[0][0]);
      }

      db.run(
        "INSERT INTO articles (title, slug, description, cover_image_url, category_id, body_html, direction, status, published_at, created_at, updated_at) VALUES ($title, $slug, $description, $coverImageUrl, $categoryId, $bodyHtml, $direction, 'published', $publishedAt, $createdAt, $updatedAt)",
        {
          $title: article.title,
          $slug: slugify(article.title),
          $description: article.description,
          $coverImageUrl: article.coverImageUrl,
          $categoryId: categoryId || null,
          $bodyHtml: article.bodyHtml,
          $direction: article.direction,
          $publishedAt: nowIso(),
          $createdAt: nowIso(),
          $updatedAt: nowIso(),
        },
      );

      const articleId = Number(db.exec("SELECT last_insert_rowid()")[0].values[0][0]);

      for (const keyword of article.keywords) {
        db.run(
          "INSERT INTO article_keywords (article_id, keyword) VALUES ($articleId, $keyword)",
          {
            $articleId: articleId,
            $keyword: keyword,
          },
        );
      }
    }
  }

  const faqExists = db.exec("SELECT id FROM faq_items LIMIT 1");
  if (faqExists.length === 0 || faqExists[0].values.length === 0) {
    for (const faq of seedFaqs) {
      db.run(
        "INSERT INTO faq_items (question, answer, sort_order, status, created_at, updated_at) VALUES ($question, $answer, $sortOrder, 'published', $createdAt, $updatedAt)",
        {
          $question: faq.question,
          $answer: faq.answer,
          $sortOrder: faq.sortOrder,
          $createdAt: nowIso(),
          $updatedAt: nowIso(),
        },
      );

      const faqId = Number(db.exec("SELECT last_insert_rowid()")[0].values[0][0]);
      for (const keyword of faq.keywords) {
        db.run(
          "INSERT INTO faq_keywords (faq_id, keyword) VALUES ($faqId, $keyword)",
          { $faqId: faqId, $keyword: keyword },
        );
      }
    }
  }

  await persistDatabase(db);
}

async function createDatabaseState(): Promise<DatabaseState> {
  const SQL = await initSqlJs({ locateFile: locateSqlJsFile });
  await mkdir(storageDir, { recursive: true });

  let db: Database;
  try {
    const databaseStats = await stat(databaseFile);
    if (databaseStats.size > 0) {
      const data = await readFile(databaseFile);
      db = new SQL.Database(data);
    } else {
      db = new SQL.Database();
    }
  } catch {
    db = new SQL.Database();
  }

  await applyMigrations(db);
  await seedDatabase(db);

  let databaseMtimeMs = 0;
  let databaseSize = 0;
  try {
    const stats = await stat(databaseFile);
    databaseMtimeMs = stats.mtimeMs;
    databaseSize = stats.size;
  } catch {}

  return { SQL, db, databaseMtimeMs, databaseSize };
}

export async function getDatabaseState() {
  if (!databaseStatePromise) {
    databaseStatePromise = createDatabaseState().then((state) => {
      databaseState = state;
      return state;
    });
  }

  const state = await databaseStatePromise;
  try {
    const stats = await stat(databaseFile);
    if (stats.mtimeMs !== state.databaseMtimeMs || stats.size !== state.databaseSize) {
      const data = await readFile(databaseFile);
      const nextDb = new state.SQL.Database(data);
      state.db.close();
      state.db = nextDb;
      state.databaseMtimeMs = stats.mtimeMs;
      state.databaseSize = stats.size;
    }
  } catch {}

  return state;
}

export async function queryRows<T>(sql: string, params: SqlParams = []) {
  const { db } = await getDatabaseState();
  const statement = db.prepare(sql);
  statement.bind(params as never);

  try {
    return toRows<T>(statement);
  } finally {
    statement.free();
  }
}

export async function queryFirst<T>(sql: string, params: SqlParams = []) {
  const rows = await queryRows<T>(sql, params);
  return rows[0] ?? null;
}

export async function execute(sql: string, params: SqlParams = []) {
  const { db } = await getDatabaseState();
  const statement = db.prepare(sql);
  statement.bind(params as never);

  try {
    statement.step();
  } finally {
    statement.free();
  }

  await persistDatabase(db);
}

export async function runInTransaction<T>(callback: (db: Database) => T | Promise<T>) {
  const { db } = await getDatabaseState();
  db.run("BEGIN");

  try {
    const result = await callback(db);
    db.run("COMMIT");
    await persistDatabase(db);
    return result;
  } catch (error) {
    db.run("ROLLBACK");
    throw error;
  }
}

export async function getLastInsertId() {
  const row = await queryFirst<{ "last_insert_rowid()": number }>(
    "SELECT last_insert_rowid()",
  );
  return Number(row?.["last_insert_rowid()"] ?? 0);
}

export async function createSessionId() {
  return randomUUID();
}

export { hashPassword, nowIso };
