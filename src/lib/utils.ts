import type { DirectionMode } from "@/lib/types";

export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function parseKeywords(input: string[] | string) {
  const source = Array.isArray(input) ? input.join(",") : input;

  return source
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export function mergeKeywords(base: readonly string[], extra?: readonly string[]) {
  return [...new Set([...base, ...(extra ?? [])])];
}

function readPositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/** Max keywords an article may hold (admin). Baseline is 25. */
export const ARTICLE_KEYWORDS_MAX = readPositiveInt(
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_ARTICLE_KEYWORDS_MAX : undefined,
  25,
);

/** Max keywords rendered on the public article page. Baseline is 5. */
export const ARTICLE_KEYWORDS_PUBLIC_MAX = readPositiveInt(
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_ARTICLE_KEYWORDS_PUBLIC_MAX
    : undefined,
  5,
);

/**
 * Canonical keyword list: parsed, trimmed, de-duplicated (first occurrence
 * wins, case-insensitive), capped at `max` in original order.
 *
 * Overflow strategy: de-duplicate the whole input first, then keep the
 * first `max` survivors — so e.g. 40 pasted keywords with 10 duplicates
 * yield the first 25 unique ones, back-filling from the remainder.
 */
export function normalizeKeywords(input: string[] | string, max = ARTICLE_KEYWORDS_MAX) {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const keyword of parseKeywords(input)) {
    const key = keyword.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(keyword);
    if (result.length >= max) {
      break;
    }
  }
  return result;
}

export function resolveDirection(direction: DirectionMode) {
  return direction === "auto" ? undefined : direction;
}

export function formatDate(input: string | null) {
  if (!input) return "Draft";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(input));
}

export function escapeLike(input: string) {
  return input.replace(/[%_]/g, (match) => `\\${match}`);
}
