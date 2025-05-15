import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "./.env" });

if (!process.env.DATABASE_URL_POSTGRES) {
  throw new Error("Missing DATABASE_URL_POSTGRES environment variable");
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL_POSTGRES,
  },
});
