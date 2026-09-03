import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "POLARISS | お問い合わせ",
  description: "お問い合わせフォームは準備中です。",
  path: "/contact",
});

export default function Page() {
  return (
    <section className="section" style={{ padding: "clamp(72px,9vw,112px) 0" }}>
      <div className="wrap">
        <p className="eyebrow">POLARISS</p>
        <h1 className="h2">お問い合わせ</h1>
        <p className="lead" style={{ maxWidth: "40em" }}>お問い合わせフォームは準備中です。</p>
        <p style={{ marginTop: 24, color: "var(--ink2)" }}>お問い合わせフォームは準備中です。 詳細は後日公開予定です。</p>
      </div>
    </section>
  );
}
