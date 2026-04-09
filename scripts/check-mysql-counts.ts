import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../lib/db/schema.js";
import { sql } from "drizzle-orm";

async function check() {
  const mysqlUrl = process.env.DATABASE_URL;
  if (!mysqlUrl) throw new Error("DATABASE_URL not set");
  
  const connection = await mysql.createConnection(mysqlUrl);
  const db = drizzle(connection, { schema, mode: "default" });

  const tables = [
    { name: "contacts", schema: schema.contacts },
    { name: "events", schema: schema.events },
    { name: "galleries", schema: schema.galleries },
    { name: "newsletters", schema: schema.newsletters },
    { name: "nominations", schema: schema.nominations },
    { name: "registrations", schema: schema.registrations },
    { name: "stories", schema: schema.stories },
    { name: "team_members", schema: schema.teamMembers },
    { name: "site_settings", schema: schema.siteSettings },
  ];

  for (const table of tables) {
    const result = await db.select({ count: sql`count(*)` }).from(table.schema);
    console.log(`${table.name}: ${result[0].count} rows`);
  }
  process.exit(0);
}

check().catch(console.error);
