import { describe, expect, it } from "vitest";

import {
  ARTICLE_KEYWORDS_MAX,
  formatDate,
  mergeKeywords,
  normalizeKeywords,
  parseKeywords,
  slugify,
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
