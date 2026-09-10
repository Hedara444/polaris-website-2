import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { staticFaqCategories, staticFaqGroups, staticFaqHeaderKeywords } from "../faq/static-faq-data";
import { StaticFaqInteractions } from "./StaticFaqInteractions";
import "../faq/faq.css";

export const metadata = buildMetadata({
  title: "POLARISS | よくあるご質問",
  description:
    "購入前から、ご利用中の疑問まで。料金・取り付け・LINE通知・位置情報・相互監視など、POLARISSのよくあるご質問をまとめています。",
  path: "/faq-static",
  keywords: staticFaqHeaderKeywords,
});

const totalFaqs = staticFaqGroups.reduce((acc, g) => acc + g.items.length, 0);

/**
 * Static FAQ variation — exact static copy of `polariss-site_all-pages/faq.html`.
 * All content is server-rendered from `../faq/static-faq-data.ts`; no DB.
 */
export default function StaticFaqPage() {
  return (
    <main id="top">
      <StaticFaqInteractions />

      <section className="qhero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">ホーム</Link>／<span>よくあるご質問</span>
          </div>
        </div>
        <div className="qhero-in wrap">
          <p className="kicker">FAQ</p>
          <h1>よくあるご質問。</h1>
          <p>購入前から、ご利用中の疑問まで。</p>
          <div className="qsearch">
            <label
              className="visually-hidden"
              htmlFor="qs"
              style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}
            >
              質問を検索
            </label>
            <input
              id="qs"
              type="search"
              placeholder="キーワードで探す（例：アプリ、充電、解約）"
              autoComplete="off"
            />
            <span className="ic" aria-hidden="true" />
          </div>
          <p className="qcount" id="qcount">
            {totalFaqs}件の質問
          </p>
        </div>
      </section>

      <section className="qbody">
        <div className="wrap qgrid">
          <aside className="qnav" id="qnav">
            <span className="k">CATEGORY</span>
            {staticFaqCategories.map((cat) => {
              const count = staticFaqGroups.find((g) => g.slug === cat.slug)?.items.length ?? 0;
              return (
                <a href={`#${cat.slug}`} key={cat.slug}>
                  <span>{cat.name}</span>
                  <span className="n">{count}</span>
                </a>
              );
            })}
          </aside>

          <div id="qlist">
            <div className="qchips" id="qchips">
              <button className="on" data-g="all">
                すべて
              </button>
              {staticFaqCategories.map((cat) => (
                <button data-g={cat.slug} key={cat.slug}>
                  {cat.shortLabel}
                </button>
              ))}
            </div>

            {staticFaqGroups.map((group) => (
              <section className="qgroup" id={group.slug} key={group.slug}>
                <div className="qgroup-hd">
                  <span className="n">{group.index}</span>
                  <h2>{group.name}</h2>
                </div>

                {group.items.map((item) => (
                  <div className="qitem" key={item.id}>
                    <button className="qq" aria-expanded="false">
                      <span>{item.question}</span>
                      <i>＋</i>
                    </button>
                    <div className="qa">
                      <div>
                        <div className="in">
                          <p className="lead">{item.lead}</p>
                          {item.more && <p className="more">{item.more}</p>}
                          {item.link && (
                            <Link href={item.link.href} className="link">
                              {item.link.label}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            ))}

            <div className="qempty" id="qempty">
              <b>該当する質問が見つかりませんでした。</b>
              <p>
                別のことばでお試しいただくか、カテゴリから探してみてください。使い方ページにも、設定や通知についての説明があります。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="qhelp" id="help">
        <div className="wrap qhelp-grid">
          <div>
            <p className="kicker rv">STILL LOOKING?</p>
            <h2 className="rv">解決しない場合は。</h2>
            <p className="rv">
              操作や設定については、使い方ページに手順を掲載しています。さらに確認したいことがある場合は、お問い合わせページからご連絡ください。
            </p>
          </div>
          <div className="qlinks rv">
            <Link href="/contact">
              <span>
                <b>お問い合わせ</b>
                <small>POLARISSについて個別に相談する。</small>
              </span>
              <span className="go">お問い合わせ →</span>
            </Link>
            <Link href="/howto">
              <span>
                <b>使い方を見る</b>
                <small>購入から設定、通知が届くまでの流れ。</small>
              </span>
              <span className="go">使い方 →</span>
            </Link>
            <Link href="/compare">
              <span>
                <b>他のGPSとの違いを見る</b>
                <small>見守り・紛失防止・警備との、目的の違い。</small>
              </span>
              <span className="go">比較する →</span>
            </Link>
            <Link href="/price">
              <span>
                <b>費用を確認する</b>
                <small>初回費用と月額の内訳。</small>
              </span>
              <span className="go">料金 →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="qfin">
        <div className="wrap qfin-in">
          <div>
            <b className="rv">疑問が解けたら、はじめられます。</b>
            <p className="rec rv">初回 19,800円（税込・送料無料）／ 月額 2,178円（税込）</p>
          </div>
          <div className="qfin-btns rv">
            <Link href="/order" className="btn btn-fill">
              購入
            </Link>
            <Link href="/howto" className="btn btn-line">
              使い方を見る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
