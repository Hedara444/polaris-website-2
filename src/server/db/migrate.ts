import { queryFirst } from "@/server/db";

async function main() {
  // Triggers DB initialization for either provider (local sql.js file or Turso remote)
  await queryFirst("SELECT 1 as ready");
  console.log("Database is ready.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
