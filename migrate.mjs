// @ts-check
import url from "url";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "./src/env.mjs";

await import("./drand.mjs");

const sql = postgres(env.DATABASE_URL, { max: 1 });
const db = drizzle(sql);

await migrate(db, { migrationsFolder: "./drizzle" });
console.log("Migrations complete");

if (url.fileURLToPath(import.meta.url) === process.argv[1]) {
  process.exit(0);
}
