import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./db/schema";

const dbUrl = process.env.DATABASE_URL;

// Global singleton pattern to prevent connection pool leaks across Next.js HMR in development
const globalForDb = globalThis as unknown as {
  mysqlPool?: mysql.Pool;
  drizzleDb?: MySql2Database<typeof schema>;
};

function createPool() {
  if (!dbUrl) return null;

  return mysql.createPool({
    uri: dbUrl,
    waitForConnections: true,
    connectionLimit: process.env.NODE_ENV === "production" ? 10 : 3,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  });
}

const pool = globalForDb.mysqlPool ?? createPool();
if (process.env.NODE_ENV !== "production" && pool) {
  globalForDb.mysqlPool = pool;
}

export const db: MySql2Database<typeof schema> =
  globalForDb.drizzleDb ??
  (pool ? drizzle(pool, { schema, mode: "default" }) : (null as any));

if (process.env.NODE_ENV !== "production" && db) {
  globalForDb.drizzleDb = db;
}
