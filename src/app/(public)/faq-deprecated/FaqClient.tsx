"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { FaqItem } from "@/lib/types";

type GroupedCategory = {
  id: number;
  name: string;
  slug: string;
  items: FaqItem[];
};

export default function FaqClient({
  groupedFaqs,
  totalFaqs,
}: {
  groupedFaqs: GroupedCategory[];
  totalFaqs: number;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChip, setActiveChip] = useState("all");
  const [activeNav, setActiveNav] = useState("g1");
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (id: number) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredGroups = groupedFaqs.map((cat, idx) => {
    const groupId = `g${idx + 1}`;
    
    if (activeChip !== "all" && activeChip !== groupId) {
      return { ...cat, groupId, visibleItems: [] };
    }

    const visibleItems = cat.items.filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });

    return { ...cat, groupId, visibleItems };
  });

  const visibleCount = filteredGroups.reduce((acc, g) => acc + g.visibleItems.length, 0);

  useEffect(() => {
    if (searchQuery.trim()) {
      const newOpen: Record<number, boolean> = {};
      filteredGroups.forEach(g => {
        g.visibleItems.forEach(item => {
          newOpen[item.id] = true;
        });
      });
      setOpenItems(newOpen);
    }
  }, [searchQuery]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    const groups = document.querySelectorAll(".qgroup");
    groups.forEach((g) => observerRef.current?.observe(g));

    return () => observerRef.current?.disconnect();
  }, [filteredGroups]);

  return (
    <>
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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveChip("all");
              }}
            />
            <span className="ic" aria-hidden="true" />
          </div>
          <p className="qcount" id="qcount">
            {searchQuery.trim() ? `${visibleCount}件の検索結果` : `${totalFaqs}件の質問`}
          </p>
        </div>
      </section>

      <section className="qbody">
    <div className="wrap qgrid">
      <aside className="qnav" id="qnav">
        <span className="k">CATEGORY</span>
        {groupedFaqs.map((cat, idx) => {
          const groupId = `g${idx + 1}`;
          return (
            <a 
              href={`#${groupId}`} 
              key={cat.id}
              className={activeNav === groupId ? "on" : ""}
              onClick={(e) => {
                // Let native scroll happen, but we can also set active chip if we want
                // Actually native anchor works fine, observer updates activeNav.
              }}
            >
              <span>{cat.name}</span>
              <span className="n">{cat.items.length}</span>
            </a>
          );
        })}
      </aside>

      <div id="qlist">
        <div className="qchips" id="qchips">
          <button 
            className={activeChip === "all" ? "on" : ""} 
            onClick={() => { setActiveChip("all"); setSearchQuery(""); }}
          >
            すべて
          </button>
          {groupedFaqs.map((cat, idx) => {
            const groupId = `g${idx + 1}`;
            return (
              <button 
                key={cat.id}
                className={activeChip === groupId ? "on" : ""}
                onClick={() => { setActiveChip(groupId); setSearchQuery(""); }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {visibleCount === 0 ? (
          <div className="qempty show" id="qempty">
            <b>見つかりませんでした。</b>
            <p>別のキーワードでお試しいただくか、お問い合わせページよりご連絡ください。</p>
          </div>
        ) : null}

        {filteredGroups.map((cat) => {
          if (cat.visibleItems.length === 0) return null;
          return (
            <section className="qgroup" id={cat.groupId} key={cat.id}>
              <div className="qgroup-hd">
                <span className="n">{cat.groupId.replace("g", "").padStart(2, "0")}</span>
                <h2>{cat.name}</h2>
              </div>

              {cat.visibleItems.map((item) => {
                const isOpen = openItems[item.id] || false;
                return (
                  <div key={item.id} className={`qitem ${isOpen ? "open" : ""}`}>
                    <button 
                      className="qq" 
                      aria-expanded={isOpen}
                      onClick={() => toggleItem(item.id)}
                    >
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
                            <p style={{ marginTop: 12, fontSize: 12, color: "var(--gray)" }}>
                              キーワード: {item.keywords.join("、")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  </section>
    </>
  );
}
