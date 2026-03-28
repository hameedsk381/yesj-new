const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../data/aicuf.db");
const db = new Database(dbPath);

console.log("--- Tables ---");
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
tables.forEach(table => {
  console.log(`\nTable: ${table.name}`);
  const info = db.prepare(`PRAGMA table_info("${table.name}")`).all();
  info.forEach(col => console.log(`  - ${col.name} (${col.type})`));
});

db.close();
