import { Database } from "bun:sqlite";
import { drizzle as drizzleMysql } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../lib/db/schema.js";
import path from "node:path";
import fs from "node:fs";

async function migrate() {
  const mysqlUrl = process.env.DATABASE_URL;
  if (!mysqlUrl) {
    throw new Error("DATABASE_URL not set");
  }
  
  const connection = await mysql.createConnection(mysqlUrl);
  const db = drizzleMysql(connection, { schema, mode: "default" });

  const sqliteFiles = ["data/aicuf.db", "data/aicuf_v2.db"];

  const tableConfigs = [
    { name: "users", schema: schema.users },
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

  console.log("Starting deep migration...");

  for (const sqliteFile of sqliteFiles) {
    if (!fs.existsSync(sqliteFile)) continue;
    
    console.log(`Processing SQLite file: ${sqliteFile}`);
    const sqlite = new Database(sqliteFile);

    for (const config of tableConfigs) {
      try {
        const rows = sqlite.query(`SELECT * FROM ${config.name}`).all() as any[];
        if (rows.length === 0) continue;

        console.log(`  Table ${config.name}: Found ${rows.length} rows.`);

        const transformedRows = rows.map(row => {
          const transformed: any = {};
          for (const [key, value] of Object.entries(row)) {
            let camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            
            // Fixes for specific camelCase mappings that aren't pure snake_to_camel
            if (key === 'email_id') camelKey = 'emailId';
            if (key === 'whatsapp_no') camelKey = 'whatsappNo';
            if (key === 'mobile_no') camelKey = 'mobileNo';
            if (key === 'instagram_id') camelKey = 'instagramId';
            if (key === 'registration_id') camelKey = 'registrationId';
            if (key === 'registration_no') camelKey = 'registrationNo';
            if (key === 'application_type') camelKey = 'applicationType';
            if (key === 'unit_name') camelKey = 'unitName';
            if (key === 'contesting_for') camelKey = 'contestingFor';
            if (key === 'education_qualification') camelKey = 'educationQualification';
            if (key === 'noc_file_path') camelKey = 'nocFilePath';
            if (key === 'image_path') camelKey = 'imagePath';
            if (key === 'created_at') camelKey = 'createdAt';
            if (key === 'updated_at') camelKey = 'updatedAt';
            if (key === 'is_active') camelKey = 'isActive';
            if (key === 'is_superuser') camelKey = 'isSuperuser';
            if (key === 'twitter_url') camelKey = 'twitterUrl';
            if (key === 'linkedin_url') camelKey = 'linkedinUrl';

            if (key === 'skills' && typeof value === 'string') {
                try { transformed[camelKey] = JSON.parse(value); } catch { transformed[camelKey] = value; }
            } else if (['isActive', 'isSuperuser', 'declaration', 'featured'].includes(camelKey)) {
                transformed[camelKey] = value === 1;
            } else if (['createdAt', 'updatedAt', 'date', 'deadline'].includes(camelKey)) {
                if (typeof value === 'number') transformed[camelKey] = new Date(value * 1000);
                else if (typeof value === 'string') transformed[camelKey] = new Date(value);
                else transformed[camelKey] = value;
            } else {
                transformed[camelKey] = value;
            }
          }
          // Remove ID to let MySQL generate new ones or use existing ones if we want to preserve keys
          // I'll keep ID to preserve relationships if any, but need to make sure they don't conflict
          return transformed;
        });

        for (const row of transformedRows) {
            try {
                await db.insert(config.schema).values(row).onDuplicateKeyUpdate({ set: row });
            } catch (err) {
                console.warn(`    Error inserting row in ${config.name}:`, err.message);
            }
        }
        console.log(`  Finished ${config.name}.`);
      } catch (e) {
        // Skip if table doesn't exist
      }
    }
    sqlite.close();
  }

  console.log("Migration finished.");
  process.exit(0);
}

migrate().catch(console.error);
