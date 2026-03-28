import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./db/schema";
import * as fs from "node:fs";
import * as path from "node:path";

function getDb() {
    console.log("Using SQLite for local development...");
    const dataDir = path.join(process.cwd(), "data");
    const dbPath = path.join(dataDir, "aicuf_v2.db");
    
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    const sqlite = new Database(dbPath);
    return drizzle(sqlite, { schema });
}

export const db = getDb();
