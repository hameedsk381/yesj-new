import { Database } from "bun:sqlite";
import fs from "node:fs";

for (const file of ["data/aicuf.db", "data/aicuf_v2.db"]) {
    if (!fs.existsSync(file)) continue;
    console.log(`--- ${file} ---`);
    const db = new Database(file);
    try {
        const tables = db.query("SELECT name FROM sqlite_master WHERE type='table'").all() as any[];
        for (const t of tables) {
            const count = db.query(`SELECT count(*) as c FROM ${t.name}`).get() as any;
            console.log(`${t.name}: ${count.c} rows`);
        }
    } catch (e) {
        console.log(`Error reading ${file}: ${e instanceof Error ? e.message : String(e)}`);
    }
}
