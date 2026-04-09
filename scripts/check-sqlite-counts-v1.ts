import { Database } from "bun:sqlite";
const db = new Database("data/aicuf.db");
const tables = db.query("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log(JSON.stringify(tables, null, 2));
const counts = tables.map(t => ({ name: t.name, count: db.query(`SELECT count(*) as c FROM ${t.name}`).get().c }));
console.log(JSON.stringify(counts, null, 2));
