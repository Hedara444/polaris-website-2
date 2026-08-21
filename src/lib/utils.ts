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
