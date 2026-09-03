import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "POLARISS | 特定商取引法に基づく表記",
  description: "特定商取引法に基づく表記は準備中です。",
  path: "/commerce",
});

export default function Page() {
  return (
    <section className="section" style={{ padding: "clamp(72px,9vw,112px) 0" }}>
      <div className="wrap">
        <p className="eyebrow">POLARISS</p>
        <h1 className="h2">特定商取引法に基づく表記</h1>
        <p className="lead" style={{ maxWidth: "40em" }}>特定商取引法に基づく表記は準備中です。</p>
        <p style={{ marginTop: 24, color: "var(--ink2)" }}>特定商取引法に基づく表記は準備中です。 詳細は後日公開予定です。</p>
      </div>
    </section>
  );
}
