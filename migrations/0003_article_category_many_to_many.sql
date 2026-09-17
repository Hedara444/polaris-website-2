CREATE TABLE IF NOT EXISTS article_category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES article_categories(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_article_category_article_id ON article_category(article_id);
CREATE INDEX IF NOT EXISTS idx_article_category_category_id ON article_category(category_id);

-- Backfill legacy many-to-one records into the pivot table.
-- INSERT OR IGNORE keeps this idempotent across sqlite/libsql/Turso reruns.
INSERT OR IGNORE INTO article_category (article_id, category_id)
SELECT id, category_id FROM articles WHERE category_id IS NOT NULL;
