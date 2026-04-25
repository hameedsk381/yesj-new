import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./db/schema";

const dbUrl = process.env.DATABASE_URL;

// During build time (next build), environment variables like DATABASE_URL might be missing.
// We only initialize the pool if the URL is present to avoid crashing the build.
export const db = dbUrl 
  ? drizzle(mysql.createPool(dbUrl), { schema, mode: "default" })
  : null as any;
