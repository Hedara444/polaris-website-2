import Link from "next/link";

import type { ArticleListItem } from "@/lib/types";
import "./styles/guide.css";

export function LatestGuideSection({ latestArticles }: { latestArticles: ArticleListItem[] }) {
  return (
    <section className="latest-guide" id="latest-guide">
      <div className="wrap">
        <div className="latest-guide-hd rv">
          <div>
            <p className="eyebrow">盗難対策ガイド</p>
            <h2>お知らせと読みもの</h2>
          </div>
          <Link href="/articles" className="txtlink">
            一覧を見る →
          </Link>
        </div>
        <div className="guide-latest rv" data-guide-latest>
          <div className="news-list">
            {latestArticles.length > 0 ? (
              latestArticles.slice(0, 3).map((a) => (
                <Link key={a.id} className="news-row" href={`/articles/${a.slug}`}>
                  <time dateTime={a.publishedAt ?? a.updatedAt}>{new Date(a.publishedAt ?? a.updatedAt).toISOString().split("T")[0].replace(/-/g, ".")}</time>
                  <span className="news-category">{a.categoryName ?? "お知らせ"}</span>
                  <h3>{a.title}</h3>
                  <span className="news-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))
            ) : (
              <>
                <Link className="news-row" href="/articles">
                  <time>2026.08.18</time>
                  <span className="news-category">バイク盗難</span>
                  <h3>バイク盗難は、なぜ増えている？</h3>
                  <span className="news-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link className="news-row" href="/articles">
                  <time>2026.08.10</time>
                  <span className="news-category">クルマ盗難</span>
                  <h3>リレーアタックとは？まず知っておきたい対策</h3>
                  <span className="news-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link className="news-row" href="/articles">
                  <time>2026.08.02</time>
                  <span className="news-category">選び方</span>
                  <h3>GPS盗難対策の選び方</h3>
                  <span className="news-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}