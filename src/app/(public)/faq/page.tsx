import Link from "next/link";

import { defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { getPublishedFaqs } from "@/server/content-service";

export const metadata = buildMetadata({
  title: "POLARISS | よくあるご質問",
  description: "購入前からご利用中の疑問まで。料金・取り付け・LINE通知・位置情報・相互監視など、POLARISSのFAQをまとめています。",
  path: "/faq",
  keywords: defaultKeywords.faq,
});

export default async function FaqPage() {
  const faqs = await getPublishedFaqs();

  return (
    <main>
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
            <label className="visually-hidden" htmlFor="qs" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              質問を検索
            </label>
            <input id="qs" type="search" placeholder="キーワードで探す（例：アプリ、充電、解約）" autoComplete="off" disabled />
            <span className="ic" aria-hidden="true" />
          </div>
          <p className="qcount" id="qcount">
            {faqs.length}件の質問
          </p>
        </div>
      </section>

      <section className="qbody">
        <div className="wrap qgrid">
          <aside className="qnav" id="qnav">
            <span className="k">CATEGORY</span>
            <a href="#g1">
              <span>すべて</span>
              <span className="n">{faqs.length}</span>
            </a>
            <a href="#g1">
              <span>購入前について</span>
              <span className="n">{faqs.length}</span>
            </a>
            <a href="#g1">
              <span>料金・契約について</span>
              <span className="n">—</span>
            </a>
            <a href="#g1">
              <span>取り付け・電源について</span>
              <span className="n">—</span>
            </a>
          </aside>

          <div id="qlist">
            <div className="qchips" id="qchips">
              <button className="on" data-g="all">
                すべて
              </button>
              <button data-g="g1">購入前</button>
              <button data-g="g2">料金・契約</button>
            </div>

            <section className="qgroup" id="g1">
              <div className="qgroup-hd">
                <span className="n">01</span>
                <h2>よくある質問</h2>
              </div>

              {faqs.map((item, idx) => (
                <div key={item.id} className={`qitem ${idx === 0 ? "open" : ""}`}>
                  <button className="qq" aria-expanded={idx === 0 ? "true" : "false"}>
                    <span>{item.question}</span>
                    <i>＋</i>
                  </button>
                  <div className="qa">
                    <div>
                      <div className="in">
                        <p className="lead" style={{ fontSize: 15, lineHeight: 1.9, color: "#57574F" }}>
                          {item.answer}
                        </p>
                        {item.keywords && item.keywords.length > 0 && (
                          <p style={{ marginTop: 12, fontSize: 12, color: "var(--gray)" }}>キーワード: {item.keywords.join("、")}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {faqs.length === 0 && (
                <>
                  <div className="qitem open">
                    <button className="qq" aria-expanded="true">
                      <span>POLARISSはどんなサービスですか？</span>
                      <i>＋</i>
                    </button>
                    <div className="qa">
                      <div>
                        <div className="in">
                          <p className="lead">クルマ・バイクの移動を検知して、いつものLINEへ通知し、地図で位置を確認できるGPS盗難対策サービスです。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="qitem">
                    <button className="qq" aria-expanded="false">
                      <span>毎月いくらかかりますか？</span>
                      <i>＋</i>
                    </button>
                    <div className="qa">
                      <div>
                        <div className="in">
                          <p>月額2,178円（税込）です。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>

            <section className="qgroup" id="g2" style={{ marginTop: 48 }}>
              <div className="qgroup-hd">
                <span className="n">02</span>
                <h2>お困りのときは</h2>
              </div>
              <p style={{ color: "var(--ink2)", lineHeight: 1.8, marginTop: 16 }}>
                解決しない場合は、<Link href="/contact" style={{ textDecoration: "underline", fontWeight: 700 }}>お問い合わせ</Link>よりご連絡ください。管理画面からFAQの並び順や内容を更新できます。
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="ofin" id="final" style={{ padding: "56px 0", background: "var(--warm)" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div>
            <p className="kicker">NEXT</p>
            <h2 style={{ marginTop: 12, fontSize: 22, fontWeight: 900 }}>他にも気になることがありますか？</h2>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/contact" className="btn btn-fill">
              お問い合わせ
            </Link>
            <Link href="/order" className="btn btn-line">
              購入
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
