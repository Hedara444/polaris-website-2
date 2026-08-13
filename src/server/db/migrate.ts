import { getDatabaseState } from "@/server/db/sqlite";

async function main() {
  await getDatabaseState();
  console.log("Database is ready.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
