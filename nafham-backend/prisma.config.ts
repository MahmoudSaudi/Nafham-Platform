import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts", // لو الـ seed بتاعك في مسار مختلف، عدّل السطر ده
  },
  datasource: {
    url: process.env.DATABASE_URL!, // ✅ الرابط جاي من الـ environment variables
  },
});
