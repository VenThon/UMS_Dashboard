// import "dotenv/config";
// import { defineConfig } from "drizzle-kit";
// export default defineConfig({
//   schema: "./db/schema/index.ts",
//   out: "./drizzle",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: process.env.DATABASE_URL!,
//   },
// });
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
console.log("DATABASE_URL exists:", Boolean(process.env.DATABASE_URL));
