import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./db/schema";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const poolConnection = mysql.createPool(dbUrl);

export const db = drizzle(poolConnection, { schema, mode: "default" });
