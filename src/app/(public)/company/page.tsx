import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import "@/app/(public)/terms/terms.css";

export const metadata = buildMetadata({
  title: "運営会社 ｜ POLARISS",
  description: "POLARISSを運営する株式会社OWL-TYの会社情報です。",
  path: "/company",
});

export default function CompanyPage() {
  return (
    <main id="top">
      <section className="legal-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">ホーム</Link>／<span>運営会社</span>
          </div>
          <p className="kicker">COMPANY</p>
          <h1>運営会社</h1>
          <p>POLARISSを運営する株式会社OWL-TYの会社情報です。</p>
        </div>
      </section>
      <section className="legal-body">
        <div className="wrap">
          <article className="legal-copy">
            <dl className="legal-details">
              <div>
                <dt>会社名</dt>
                <dd>株式会社OWL-TY</dd>
              </div>
              <div>
                <dt>英文社名</dt>
                <dd>OWL-TY Co. Ltd.</dd>
              </div>
              <div>
                <dt>代表取締役</dt>
                <dd>田中 裕喜也</dd>
              </div>
              <div>
                <dt>所在地</dt>
                <dd>
                  〒231-0801<br />
                  神奈川県横浜市中区新山下1-4-22
                </dd>
              </div>
              <div>
                <dt>電話番号</dt>
                <dd>045-264-8772</dd>
              </div>
              <div>
                <dt>メールアドレス</dt>
                <dd>
                  info@owl-ty.com<br />
                  ※迷惑メール防止のため「＠」を全角にしています。送信の際は半角に置き換えてください。
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </section>
    </main>
  );
}

