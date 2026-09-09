"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import "./styles/faq.css";

const items = [
  {
    q: "自分で取り付けられる？",
    a: "基本はご自身で取り付けできます。取り付け位置や電源のつなぎ方は、使い方ページで写真付きでご案内します。専用ハーネスを使えば、車両からの常時給電にも対応します。",
  },
  {
    q: "アプリは必要？",
    a: "いいえ。新しいアプリのダウンロードは不要です。操作はいつものLINEから行い、マップや状態などはWeb上で確認できます。",
  },
  {
    q: "紛失防止タグとの違いは？",
    a: "紛失防止タグは身の回りの持ち物を探す用途に便利な製品です。POLARISSは、クルマ・バイクの移動検知とLINE通知、地図での位置確認に特化しています。",
  },
  {
    q: "毎月いくらかかる？",
    a: "月額は2,178円（税込）です。初回はGPS本体込みで19,800円（税込・送料無料）。月額には移動検知・通知・位置確認の利用料が含まれます。",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const bar = document.getElementById("buybar") as HTMLElement | null;
    if (!bar) return;
    if (open !== null) bar.classList.add("show");
    else {
      // when closing, let scroll logic decide; if not past hero, hide
      const heroEnd = document.getElementById("heroEnd");
      const pastHero = heroEnd ? heroEnd.getBoundingClientRect().top < 0 : false;
      if (!pastHero) bar.classList.remove("show");
    }
  }, [open]);

  return (
    <section className="faq" id="faq">
      <div className="faq-in wrap">
        <div className="faq-hd rv">
          <p className="eyebrow">よくある質問</p>
          <h2 className="h2">ちょっと気になること。</h2>
        </div>
        <div className="acc rv" id="acc">
          {items.map((it, i) => (
            <div key={it.q} className={`acc-item ${open === i ? "open" : ""}`}>
              <button className="acc-q" aria-expanded={open === i ? "true" : "false"} onClick={() => setOpen(open === i ? null : i)} type="button">
                <span>{it.q}</span>
                <i>{open === i ? "−" : "＋"}</i>
              </button>
              <div className="acc-a">
                <div>
                  <p>{it.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="faq-more rv">
          <Link href="/faq" className="txtlink">
            FAQをすべて見る →
          </Link>
        </div>
      </div>
    </section>
  );
}