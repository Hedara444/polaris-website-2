"use client";

import { useEffect, useState } from "react";
import { MCMP_NAMES, SCENARIOS, TABLE_ROWS } from "./compare-data";

export function ScenarioInteractive() {
  const [active, setActive] = useState("1");

  return (
    <div className="scn-wrap" id="scn">
      <div className="scn-q">
        {SCENARIOS.map((s) => (
          <button key={s.a} className={active === s.a ? "on" : ""} data-a={s.a} onClick={() => setActive(s.a)} type="button">
            <span className="k">{s.k}</span>
            <b>{s.title}</b>
          </button>
        ))}
      </div>
      <div className="scn-a rv in">
        {SCENARIOS.map((s) => (
          <div key={s.a} className={active === s.a ? "ans on" : "ans"} data-a={s.a}>
            <span className="k">RECOMMEND</span>
            <b>{s.recommend}</b>
            <p>{s.desc}</p>
            <span className="pill">{s.pill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobileCompare() {
  const [idx, setIdx] = useState(0);

  return (
    <div className="mcmp rv in" id="mcmp">
      <div className="mcmp-nav">
        {MCMP_NAMES.map((name, i) => (
          <button key={name} className={idx === i ? "on" : ""} data-c={String(i)} onClick={() => setIdx(i)} type="button">
            {name}
          </button>
        ))}
      </div>
      <div id="mcmpBody">
        {TABLE_ROWS.map((row) => (
          <div key={row.axis} className="mcmp-row">
            <div className="ax">{row.axis}</div>
            <div className="mcmp-pair">
              <div className="a">
                <span className="lb">POLARISS</span>
                <p>{row.vals[0]}</p>
              </div>
              <div className="b">
                <span className="lb">{MCMP_NAMES[idx]}</span>
                <p>{row.vals[idx + 1]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
      );
      els.forEach((n) => io.observe(n));
      return () => io.disconnect();
    } else {
      els.forEach((n) => n.classList.add("in"));
    }
  }, []);
  return null;
}
