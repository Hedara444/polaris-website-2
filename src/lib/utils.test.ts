import { describe, expect, it } from "vitest";

import {
  ARTICLE_KEYWORDS_MAX,
  formatDate,
  mergeKeywords,
  normalizeKeywords,
  parseKeywords,
  slugify,
  withExternalLinkTargets,
} from "@/lib/utils";

describe("slugify", () => {
  it("creates URL-safe slugs", () => {
    expect(slugify("GPS Devices 101")).toBe("gps-devices-101");
  });

  it("removes duplicate separators", () => {
    expect(slugify("  Hello --- World  ")).toBe("hello-world");
  });
});

describe("parseKeywords", () => {
  it("splits and trims keywords", () => {
    expect(parseKeywords("gps, line tracking, vehicle security")).toEqual([
      "gps",
      "line tracking",
      "vehicle security",
    ]);
  });
});

describe("mergeKeywords", () => {
  it("deduplicates keyword lists", () => {
    expect(mergeKeywords(["gps", "line"], ["line", "security"])).toEqual([
      "gps",
      "line",
      "security",
    ]);
  });
});

describe("normalizeKeywords", () => {
  it("dedupes case-insensitively keeping the first occurrence", () => {
    expect(normalizeKeywords("gps, GPS,  line ,LINE")).toEqual(["gps", "line"]);
  });

  it("caps at max preserving order", () => {
    expect(normalizeKeywords("a, b, c, d", 2)).toEqual(["a", "b"]);
  });

  it("back-fills from the remainder after dedupe", () => {
    const pasted = Array.from({ length: 40 }, (_, i) => `kw${i % 30}`);
    const result = normalizeKeywords(pasted.join(", "), 25);
    expect(result).toHaveLength(25);
    expect(result).toEqual(Array.from({ length: 25 }, (_, i) => `kw${i}`));
  });

  it("defaults to the documented baseline limit", () => {
    expect(ARTICLE_KEYWORDS_MAX).toBe(25);
  });
});

describe("formatDate", () => {
  it("returns Draft for missing dates", () => {
    expect(formatDate(null)).toBe("Draft");
  });
});

describe("withExternalLinkTargets", () => {
  it("opens http(s) links in a new tab with opener protection", () => {
    expect(withExternalLinkTargets('<p><a href="https://example.com">x</a></p>')).toBe(
      '<p><a href="https://example.com" target="_blank" rel="noopener noreferrer">x</a></p>',
    );
  });

  it("handles protocol-relative urls", () => {
    expect(withExternalLinkTargets("<a href='//example.com'>x</a>")).toBe(
      '<a href=\'//example.com\' target="_blank" rel="noopener noreferrer">x</a>',
    );
  });

  it("leaves anchors, relative links, mailto and tel untouched", () => {
    const html =
      '<a href="#top">a</a><a href="/articles/x">b</a><a href="mailto:a@b.c">c</a><a href="tel:123">d</a>';
    expect(withExternalLinkTargets(html)).toBe(html);
  });

  it("keeps an existing target and only tops up a partial rel", () => {
    expect(withExternalLinkTargets('<a href="https://e.com" target="_self">x</a>')).toBe(
      '<a href="https://e.com" target="_self">x</a>',
    );
    expect(withExternalLinkTargets('<a rel="nofollow" href="https://e.com">x</a>')).toBe(
      '<a rel="nofollow noopener noreferrer" href="https://e.com" target="_blank">x</a>',
    );
  });

  it("matches uppercase tags and leaves bare anchors alone", () => {
    expect(withExternalLinkTargets('<A HREF="https://e.com">x</A>')).toContain('target="_blank"');
    expect(withExternalLinkTargets("<a>plain</a>")).toBe("<a>plain</a>");
  });
});
