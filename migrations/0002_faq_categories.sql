CREATE TABLE IF NOT EXISTS faq_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  keywords TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE faq_items ADD COLUMN category_id INTEGER REFERENCES faq_categories(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_faq_items_category_id
  ON faq_items(category_id);

INSERT INTO faq_categories (name, slug, sort_order, keywords) VALUES
('購入前', 'before-purchase', 1, '購入,導入,検討'),
('料金・契約', 'pricing-contracts', 2, '料金,月額,契約,解約'),
('取り付け・電源', 'installation-power', 3, '取り付け,設置,電源,バッテリー'),
('LINE・通知', 'line-notifications', 4, 'LINE,通知,設定'),
('位置情報・通信', 'location-communication', 5, 'GPS,位置情報,通信'),
('相互監視', 'mutual-monitoring', 6, '相互監視,連携'),
('ご利用中の方', 'current-users', 7, 'トラブル,使い方');

UPDATE faq_items SET category_id = (SELECT id FROM faq_categories WHERE slug = 'before-purchase') WHERE question = 'POLARISSとはなんですか？';
UPDATE faq_items SET category_id = (SELECT id FROM faq_categories WHERE slug = 'line-notifications') WHERE question = 'LINEではどのような操作や通知を受けられますか？';
UPDATE faq_items SET category_id = (SELECT id FROM faq_categories WHERE slug = 'installation-power') WHERE question = '導入時の設定は難しいですか？';
UPDATE faq_items SET category_id = (SELECT id FROM faq_categories WHERE slug = 'current-users') WHERE question = '記事やFAQは後から更新できますか？';
