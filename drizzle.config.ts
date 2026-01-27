import type { Config } from "drizzle-kit";

export default {
  schema: "./db/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://postgres:1234@localhost:5432/ums_dashboard",
  },
} satisfies Config;
