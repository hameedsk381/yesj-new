import { Database } from "bun:sqlite";
const db = new Database("data/aicuf_v2.db");
const tables = db.query("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log(JSON.stringify(tables, null, 2));
