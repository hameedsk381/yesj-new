const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../data/aicuf.db");
const db = new Database(dbPath);

console.log("--- Tables in DB ---");
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log("Tables found:", tables.map(t => t.name));

for (const table of tables) {
  console.log(`\nColumns for ${table.name}:`);
  const info = db.prepare(`PRAGMA table_info("${table.name}")`).all();
  console.log(info.map(c => `${c.name} (${c.type})`).join(", "));
}

db.close();
