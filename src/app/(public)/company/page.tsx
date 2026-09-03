import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "POLARISS | 運営会社",
  description: "株式会社OWL-TY",
  path: "/company",
});

export default function Page() {
  return (
    <section className="section" style={{ padding: "clamp(72px,9vw,112px) 0" }}>
      <div className="wrap">
        <p className="eyebrow">POLARISS</p>
        <h1 className="h2">運営会社</h1>
        <p className="lead" style={{ maxWidth: "40em" }}>株式会社OWL-TY</p>
        <p style={{ marginTop: 24, color: "var(--ink2)" }}>株式会社OWL-TY 詳細は後日公開予定です。</p>
      </div>
    </section>
  );
}
