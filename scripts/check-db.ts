import { db } from "../lib/db";
import { events, siteSettings, galleries, teamMembers } from "../lib/db/schema";

async function run() {
  const ev = await db.select().from(events);
  const se = await db.select().from(siteSettings);
  const ga = await db.select().from(galleries);
  const tm = await db.select().from(teamMembers);
  
  console.log("Events count:", ev.length);
  console.log("Settings count:", se.length);
  console.log("Gallery count:", ga.length);
  console.log("Team count:", tm.length);

  if (ev.length > 0) console.log("First event path:", ev[0].imagePath);
}
run().catch(console.error).then(() => process.exit(0));
