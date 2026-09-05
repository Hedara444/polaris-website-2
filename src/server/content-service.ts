import type {
  ArticleDetails,
  ArticleEditorInput,
  ArticleListItem,
  CategoryItem,
  DashboardStats,
  FaqEditorInput,
  FaqItem,
  FaqCategoryItem,
  PaginationResult,
} from "@/lib/types";
import { parseKeywords, slugify } from "@/lib/utils";
import { nowIso, queryFirst, queryRows, runInTransaction } from "@/server/db";

interface CountRow {
  count: number;
}

interface ArticleRow {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover_image_url: string | null;
  category_id: number | null;
  category_name: string | null;
  direction: "ltr" | "rtl" | "auto";
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string;
  body_html?: string;
}

interface FaqRow {
  id: number;
  question: string;
  answer: string;
  category_id: number | null;
  category_name: string | null;
  sort_order: number;
  status: "draft" | "published";
  updated_at: string;
}

function mapArticle(row: ArticleRow): ArticleListItem {
  return {
    id: Number(row.id),
    title: row.title,
    slug: row.slug,
    description: row.description,
    coverImageUrl: row.cover_image_url,
    categoryId: row.category_id ? Number(row.category_id) : null,
    categoryName: row.category_name,
    direction: row.direction,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
}

function mapFaq(row: FaqRow, keywords: string[]): FaqItem {
  return {
    id: Number(row.id),
    question: row.question,
    answer: row.answer,
    categoryId: row.category_id ? Number(row.category_id) : null,
    categoryName: row.category_name,
    keywords,
    sortOrder: Number(row.sort_order),
    status: row.status,
    updatedAt: row.updated_at,
  };
}

async function getKeywords(table: "article_keywords" | "faq_keywords", column: "article_id" | "faq_id", id: number) {
  const rows = await queryRows<{ keyword: string }>(
    `SELECT keyword FROM ${table} WHERE ${column} = ? ORDER BY id ASC`,
    [id],
  );
  return rows.map((row) => row.keyword);
}

async function ensureCategory(name: string) {
  const trimmed = name.trim();
  if (!trimmed) {
    return null;
  }

  const slug = slugify(trimmed);
  const existing = await queryFirst<{ id: number }>(
    "SELECT id FROM article_categories WHERE slug = ?",
    [slug],
  );

  if (existing) {
    return Number(existing.id);
  }

  await runInTransaction(async (db) => {
    await db.run(
      "INSERT INTO article_categories (name, slug, created_at, updated_at) VALUES (?, ?, ?, ?)",
      [trimmed, slug, nowIso(), nowIso()],
    );
  });

  const created = await queryFirst<{ id: number }>(
    "SELECT id FROM article_categories WHERE slug = ?",
    [slug],
  );

  return Number(created?.id ?? 0) || null;
}

export async function getCategoryList() {
  return queryRows<CategoryItem>(
    "SELECT id, name, slug FROM article_categories ORDER BY name ASC",
  );
}

export async function getPublishedFaqs(limit?: number) {
  const sql = `
    SELECT faq_items.id, faq_items.question, faq_items.answer, faq_items.category_id,
           faq_categories.name as category_name, faq_items.sort_order, faq_items.status, faq_items.updated_at
    FROM faq_items
    LEFT JOIN faq_categories ON faq_categories.id = faq_items.category_id
    WHERE faq_items.status = 'published' AND faq_items.category_id IS NOT NULL
    ORDER BY faq_items.sort_order ASC, faq_items.updated_at DESC
    ${typeof limit === "number" ? `LIMIT ${limit}` : ""}
  `;
  const rows = await queryRows<FaqRow>(sql);

  return Promise.all(
    rows.map(async (row) => mapFaq(row, await getKeywords("faq_keywords", "faq_id", Number(row.id)))),
  );
}

export async function getAdminFaqs() {
  const rows = await queryRows<FaqRow>(
    `SELECT faq_items.id, faq_items.question, faq_items.answer, faq_items.category_id,
            faq_categories.name as category_name, faq_items.sort_order, faq_items.status, faq_items.updated_at
     FROM faq_items
     LEFT JOIN faq_categories ON faq_categories.id = faq_items.category_id
     ORDER BY faq_items.sort_order ASC, faq_items.updated_at DESC`
  );

  return Promise.all(
    rows.map(async (row) => mapFaq(row, await getKeywords("faq_keywords", "faq_id", Number(row.id)))),
  );
}

export async function getFaqById(id: number) {
  const row = await queryFirst<FaqRow>(
    `SELECT faq_items.id, faq_items.question, faq_items.answer, faq_items.category_id,
            faq_categories.name as category_name, faq_items.sort_order, faq_items.status, faq_items.updated_at
     FROM faq_items
     LEFT JOIN faq_categories ON faq_categories.id = faq_items.category_id
     WHERE faq_items.id = ?`,
    [id],
  );

  if (!row) {
    return null;
  }

  return mapFaq(row, await getKeywords("faq_keywords", "faq_id", id));
}

export async function listPublishedArticles(page = 1, pageSize = 6, categorySlug?: string): Promise<PaginationResult<ArticleListItem>> {
  const safePage = Math.max(1, page);
  const offset = (safePage - 1) * pageSize;
  const where = categorySlug
    ? "WHERE articles.status = 'published' AND article_categories.slug = ?"
    : "WHERE articles.status = 'published'";
  const params = categorySlug ? [categorySlug] : [];

  const totalRow = await queryFirst<CountRow>(
    `
      SELECT COUNT(*) as count
      FROM articles
      LEFT JOIN article_categories ON article_categories.id = articles.category_id
      ${where}
    `,
    params,
  );

  const rows = await queryRows<ArticleRow>(
    `
      SELECT articles.id, articles.title, articles.slug, articles.description, articles.cover_image_url,
             articles.category_id, article_categories.name as category_name, articles.direction,
             articles.status, articles.published_at, articles.updated_at
      FROM articles
      LEFT JOIN article_categories ON article_categories.id = articles.category_id
      ${where}
      ORDER BY articles.published_at DESC, articles.updated_at DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `,
    params,
  );

  const total = Number(totalRow?.count ?? 0);
  return {
    items: rows.map(mapArticle),
    page: safePage,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getLatestArticles(limit = 3) {
  const rows = await queryRows<ArticleRow>(
    `
      SELECT articles.id, articles.title, articles.slug, articles.description, articles.cover_image_url,
             articles.category_id, article_categories.name as category_name, articles.direction,
             articles.status, articles.published_at, articles.updated_at
      FROM articles
      LEFT JOIN article_categories ON article_categories.id = articles.category_id
      WHERE articles.status = 'published'
      ORDER BY articles.published_at DESC, articles.updated_at DESC
      LIMIT ${limit}
    `,
  );

  return rows.map(mapArticle);
}

export async function getArticleBySlug(slug: string) {
  const row = await queryFirst<ArticleRow>(
    `
      SELECT articles.id, articles.title, articles.slug, articles.description, articles.cover_image_url,
             articles.category_id, article_categories.name as category_name, articles.direction,
             articles.status, articles.published_at, articles.updated_at, articles.body_html
      FROM articles
      LEFT JOIN article_categories ON article_categories.id = articles.category_id
      WHERE articles.slug = ? AND articles.status = 'published'
    `,
    [slug],
  );

  if (!row || !row.body_html) {
    return null;
  }

  return {
    ...mapArticle(row),
    bodyHtml: row.body_html,
    keywords: await getKeywords("article_keywords", "article_id", Number(row.id)),
    status: row.status,
  } satisfies ArticleDetails;
}

export async function getAdminArticles() {
  const rows = await queryRows<ArticleRow>(
    `
      SELECT articles.id, articles.title, articles.slug, articles.description, articles.cover_image_url,
             articles.category_id, article_categories.name as category_name, articles.direction,
             articles.status, articles.published_at, articles.updated_at
      FROM articles
      LEFT JOIN article_categories ON article_categories.id = articles.category_id
      ORDER BY articles.updated_at DESC
    `,
  );

  return rows.map(mapArticle);
}

export async function getAdminArticleById(id: number) {
  const row = await queryFirst<ArticleRow>(
    `
      SELECT articles.id, articles.title, articles.slug, articles.description, articles.cover_image_url,
             articles.category_id, article_categories.name as category_name, articles.direction,
             articles.status, articles.published_at, articles.updated_at, articles.body_html
      FROM articles
      LEFT JOIN article_categories ON article_categories.id = articles.category_id
      WHERE articles.id = ?
    `,
    [id],
  );

  if (!row || !row.body_html) {
    return null;
  }

  return {
    ...mapArticle(row),
    bodyHtml: row.body_html,
    keywords: await getKeywords("article_keywords", "article_id", id),
    status: row.status,
  } satisfies ArticleDetails;
}

export async function upsertArticle(id: number | null, input: ArticleEditorInput) {
  const categoryId = await ensureCategory(input.categoryName);
  const slug = slugify(input.title);
  const publishedAt = input.status === "published" ? nowIso() : null;
  const keywords = parseKeywords(input.keywords);

  const articleId = await runInTransaction(async (db) => {
    if (id) {
      await db.run(
        `
          UPDATE articles
          SET title = ?, slug = ?, description = ?, cover_image_url = ?, category_id = ?, body_html = ?,
              direction = ?, status = ?, published_at = COALESCE(published_at, ?), updated_at = ?
          WHERE id = ?
        `,
        [
          input.title,
          slug,
          input.description,
          input.coverImageUrl || null,
          categoryId,
          input.bodyHtml,
          input.direction,
          input.status,
          publishedAt,
          nowIso(),
          id,
        ],
      );
      await db.run("DELETE FROM article_keywords WHERE article_id = ?", [id]);

      for (const keyword of keywords) {
        await db.run("INSERT INTO article_keywords (article_id, keyword) VALUES (?, ?)", [
          id,
          keyword,
        ]);
      }

      return id;
    }

    await db.run(
      `
        INSERT INTO articles (title, slug, description, cover_image_url, category_id, body_html, direction, status, published_at, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        input.title,
        slug,
        input.description,
        input.coverImageUrl || null,
        categoryId,
        input.bodyHtml,
        input.direction,
        input.status,
        publishedAt,
        nowIso(),
        nowIso(),
      ],
    );

    const inserted = await db.exec("SELECT last_insert_rowid() as id");
    const newId = Number(inserted[0].values[0][0]);
    for (const keyword of keywords) {
      await db.run("INSERT INTO article_keywords (article_id, keyword) VALUES (?, ?)", [
        newId,
        keyword,
      ]);
    }

    return newId;
  });

  return getAdminArticleById(articleId);
}

export async function deleteArticle(id: number) {
  await runInTransaction(async (db) => {
    await db.run("DELETE FROM article_keywords WHERE article_id = ?", [id]);
    await db.run("DELETE FROM articles WHERE id = ?", [id]);
  });
}

export async function getFaqCategories() {
  return queryRows<FaqCategoryItem>(
    "SELECT id, name, slug, keywords, sort_order as sortOrder FROM faq_categories ORDER BY sort_order ASC",
  );
}

export async function getFaqCategoryById(id: number) {
  return queryFirst<FaqCategoryItem>(
    "SELECT id, name, slug, keywords, sort_order as sortOrder FROM faq_categories WHERE id = ?",
    [id],
  );
}

export async function upsertFaqCategory(id: number | null, input: import("@/lib/types").FaqCategoryEditorInput) {
  const slug = slugify(input.name);
  
  return runInTransaction(async (db) => {
    if (id) {
      await db.run(
        "UPDATE faq_categories SET name = ?, slug = ?, keywords = ?, sort_order = ?, updated_at = ? WHERE id = ?",
        [input.name, slug, input.keywords, input.sortOrder, nowIso(), id],
      );
      return id;
    }

    await db.run(
      "INSERT INTO faq_categories (name, slug, keywords, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      [input.name, slug, input.keywords, input.sortOrder, nowIso(), nowIso()],
    );
    const inserted = await db.exec("SELECT last_insert_rowid() as id");
    return Number(inserted[0].values[0][0]);
  });
}

export async function deleteFaqCategory(id: number) {
  await runInTransaction(async (db) => {
    // When a category is deleted, ON DELETE SET NULL should handle the foreign key in faq_items
    await db.run("DELETE FROM faq_categories WHERE id = ?", [id]);
  });
}

export async function upsertFaq(id: number | null, input: FaqEditorInput) {
  const keywords = parseKeywords(input.keywords);

  const faqId = await runInTransaction(async (db) => {
    if (id) {
      await db.run(
        "UPDATE faq_items SET question = ?, answer = ?, category_id = ?, sort_order = ?, status = ?, updated_at = ? WHERE id = ?",
        [input.question, input.answer, input.categoryId, input.sortOrder, input.status, nowIso(), id],
      );
      await db.run("DELETE FROM faq_keywords WHERE faq_id = ?", [id]);
      for (const keyword of keywords) {
        await db.run("INSERT INTO faq_keywords (faq_id, keyword) VALUES (?, ?)", [id, keyword]);
      }
      return id;
    }

    await db.run(
      "INSERT INTO faq_items (question, answer, category_id, sort_order, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [input.question, input.answer, input.categoryId, input.sortOrder, input.status, nowIso(), nowIso()],
    );
    const inserted = await db.exec("SELECT last_insert_rowid() as id");
    const newId = Number(inserted[0].values[0][0]);
    for (const keyword of keywords) {
      await db.run("INSERT INTO faq_keywords (faq_id, keyword) VALUES (?, ?)", [newId, keyword]);
    }
    return newId;
  });

  return getFaqById(faqId);
}

export async function deleteFaq(id: number) {
  await runInTransaction(async (db) => {
    await db.run("DELETE FROM faq_keywords WHERE faq_id = ?", [id]);
    await db.run("DELETE FROM faq_items WHERE id = ?", [id]);
  });
}

export async function reorderFaq(items: Array<{ id: number; sortOrder: number }>) {
  await runInTransaction(async (db) => {
    for (const item of items) {
      await db.run("UPDATE faq_items SET sort_order = ?, updated_at = ? WHERE id = ?", [
        item.sortOrder,
        nowIso(),
        item.id,
      ]);
    }
  });
}

export async function getDashboardStats() {
  const [articleCount, faqCount, publishedArticleCount] = await Promise.all([
    queryFirst<CountRow>("SELECT COUNT(*) as count FROM articles"),
    queryFirst<CountRow>("SELECT COUNT(*) as count FROM faq_items"),
    queryFirst<CountRow>("SELECT COUNT(*) as count FROM articles WHERE status = 'published'"),
  ]);

  return {
    articleCount: Number(articleCount?.count ?? 0),
    faqCount: Number(faqCount?.count ?? 0),
    publishedArticleCount: Number(publishedArticleCount?.count ?? 0),
  } satisfies DashboardStats;
}
