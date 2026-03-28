const Database = require("better-sqlite3");
const path = require("path");

async function verify() {
  const dbPath = path.join(__dirname, "../data/aicuf.db");
  const db = new Database(dbPath);

  console.log("Checking registrations table...");
  const columns = db.prepare("PRAGMA table_info(registrations)").all();
  console.log("Columns:", columns.map(c => c.name).join(", "));

  const hasAicufVision = columns.some(c => c.name === "aicuf_vision");
  const hasYesjVision = columns.some(c => c.name === "yesj_vision");

  console.log("Has aicuf_vision:", hasAicufVision);
  console.log("Has yesj_vision:", hasYesjVision);

  if (hasAicufVision && !hasYesjVision) {
    console.log("SUCCESS: Schema synchronized correctly (aicuf_vision present, yesj_vision absent).");
  } else {
    console.log("FAILURE: Schema mismatch.");
  }

  db.close();
}

verify();
