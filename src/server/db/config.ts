/**
 * DB provider config.
 * Local SQLite (sql.js file) is the default for development and keeps existing behavior.
 * When Turso env vars are set, the connector module (`turso.ts`) is used instead.
 */

function getTursoUrl(): string | undefined {
  return (
    process.env.TURSO_DATABASE_URL ??
    process.env.DATABASE_URL ??
    process.env.TURSO_DB_URL ??
    undefined
  )?.trim() || undefined;
}

function getTursoAuthToken(): string | undefined {
  return (
    process.env.TURSO_AUTH_TOKEN ??
    process.env.TURSO_DB_TOKEN ??
    process.env.DATABASE_AUTH_TOKEN ??
    undefined
  )?.trim() || undefined;
}

function getProviderFlag(): "turso" | "local" {
  const explicit = process.env.DB_PROVIDER?.trim().toLowerCase();
  if (explicit === "turso" || explicit === "remote" || explicit === "libsql") return "turso";
  if (explicit === "local" || explicit === "sqlite" || explicit === "sqljs") return "local";
  // Auto-detect: if Turso URL is present, use Turso
  if (getTursoUrl()) return "turso";
  return "local";
}

export const dbConfig = {
  get provider() {
    return getProviderFlag();
  },
  get tursoUrl() {
    return getTursoUrl();
  },
  get tursoAuthToken() {
    return getTursoAuthToken();
  },
} as const;

export const isTursoEnabled =
  dbConfig.provider === "turso" && !!dbConfig.tursoUrl;

export function assertTursoConfig() {
  if (!dbConfig.tursoUrl) {
    throw new Error(
      "Turso is enabled but TURSO_DATABASE_URL (or DATABASE_URL) is not set. " +
        "Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN, or set DB_PROVIDER=local to use the local SQLite file.",
    );
  }
}
