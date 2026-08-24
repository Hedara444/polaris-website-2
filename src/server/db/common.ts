import { createHash, randomUUID } from "node:crypto";

export function hashPassword(password: string, salt: string) {
  return createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

export function nowIso() {
  return new Date().toISOString();
}

export async function createSessionId() {
  return randomUUID();
}
