import { describe, expect, it } from "vitest";

import { formatDate, mergeKeywords, parseKeywords, slugify } from "@/lib/utils";

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

describe("formatDate", () => {
  it("returns Draft for missing dates", () => {
    expect(formatDate(null)).toBe("Draft");
  });
});
