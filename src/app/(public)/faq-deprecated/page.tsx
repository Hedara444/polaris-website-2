import Link from "next/link";

import { defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { getPublishedFaqs, getFaqCategories } from "@/server/content-service";
import "./faq.css";
import FaqClient from "./FaqClient";

export const metadata = buildMetadata({
  title: "POLARISS | よくあるご質問",
  description: "購入前からご利用中の疑問まで。料金・取り付け・LINE通知・位置情報・相互監視など、POLARISSのFAQをまとめています。",
  path: "/faq-deprecated",
  keywords: defaultKeywords.faq,
});

export default async function FaqPage() {
  const faqs = await getPublishedFaqs();
  const categories = await getFaqCategories();
  
  const groupedFaqs = categories.map(cat => ({
    ...cat,
    items: faqs.filter(f => f.categoryId === cat.id)
  })).filter(cat => cat.items.length > 0);

  const uncategorizedFaqs = faqs.filter(f => !f.categoryId);
  if (uncategorizedFaqs.length > 0) {
    groupedFaqs.push({
      id: 0,
      name: "その他の質問",
      slug: "uncategorized",
      keywords: "",
      sortOrder: 999,
      items: uncategorizedFaqs
    });
  }

  return (
    <main>
      <FaqClient groupedFaqs={groupedFaqs} totalFaqs={faqs.length} />
      
      <section className="qhelp" id="help">
        <div className="wrap qhelp-grid">
          <div>
            <p className="kicker rv in">STILL LOOKING?</p>
            <h2 className="rv in">解決しない場合は。</h2>
            <p className="rv in">操作や設定については使い方ページにてご案内しております。ご不明な点はお問い合わせページよりご連絡ください。</p>
          </div>
          <div className="qlinks rv in">
            <Link href="/contact">
              <span><b>お問い合わせ</b><small>POLARISSについて個別に相談する。</small></span>
              <span className="go">Contact →</span>
            </Link>
            <Link href="/howto">
              <span><b>使い方を見る</b><small>購入から設定、通知を受けるまでの流れ。</small></span>
              <span className="go">How to use →</span>
            </Link>
            <Link href="/compare">
              <span><b>他のGPSとの違いを見る</b><small>見守りや紛失防止、セキュリティと用途が異なります。</small></span>
              <span className="go">Compare →</span>
            </Link>
            <Link href="/price">
              <span><b>費用を確認する</b><small>初期費用や月額料金の内訳。</small></span>
              <span className="go">Fees →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="qfin">
        <div className="wrap qfin-in">
          <div>
            <b className="rv in">疑問がクリアになったら、はじめられます。</b>
            <p className="rec rv in">初回 19,800円（税込・送料無料） / 月額 2,178円（税込）</p>
          </div>
          <div className="qfin-btns rv in">
            <Link href="/order" className="btn btn-fill">購入</Link>
            <Link href="/howto" className="btn btn-line">使い方を見る</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
