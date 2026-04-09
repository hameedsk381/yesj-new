import { db } from "../lib/db";
import { events, galleries, teamMembers, stories, echoes, siteSettings } from "../lib/db/schema";
import { uploadFile } from "../lib/storage";
import { eq, like } from "drizzle-orm";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

async function uploadLocalFile(localPath: string) {
  if (!localPath || !localPath.startsWith("/") || localPath.startsWith("http")) return null;
  
  const absolutePath = path.join(PUBLIC_DIR, localPath);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`File not found: ${absolutePath}`);
    return null;
  }

  const buffer = fs.readFileSync(absolutePath);
  const fileName = path.basename(localPath);
  const folder = path.dirname(localPath).replace(/^\//, "");
  const destination = folder ? `${folder}/${fileName}` : fileName;

  console.log(`Uploading ${localPath} to GCS...`);
  try {
    const url = await uploadFile(buffer, destination);
    console.log(`Uploaded! ${url}`);
    return url;
  } catch (err) {
    console.error(`Failed to upload ${localPath}:`, err);
    return null;
  }
}

async function migrate() {
  console.log("Starting migration to GCS...");

  // 1. Events
  console.log("\n--- Migrating Events ---");
  const evs = await db.select().from(events).where(like(events.imagePath, "/%"));
  for (const ev of evs) {
    const newUrl = await uploadLocalFile(ev.imagePath!);
    if (newUrl) {
      await db.update(events).set({ imagePath: newUrl }).where(eq(events.id, ev.id));
    }
  }

  // 2. Gallery
  console.log("\n--- Migrating Gallery ---");
  const gas = await db.select().from(galleries).where(like(galleries.imagePath, "/%"));
  for (const ga of gas) {
    const newUrl = await uploadLocalFile(ga.imagePath);
    if (newUrl) {
      await db.update(galleries).set({ imagePath: newUrl }).where(eq(galleries.id, ga.id));
    }
  }

  // 3. Team
  console.log("\n--- Migrating Team Members ---");
  const teams = await db.select().from(teamMembers).where(like(teamMembers.imagePath, "/%"));
  for (const t of teams) {
    const newUrl = await uploadLocalFile(t.imagePath!);
    if (newUrl) {
      await db.update(teamMembers).set({ imagePath: newUrl }).where(eq(teamMembers.id, t.id));
    }
  }

  // 4. Stories
  console.log("\n--- Migrating Stories ---");
  const sts = await db.select().from(stories).where(like(stories.imagePath, "/%"));
  for (const st of sts) {
    const newUrl = await uploadLocalFile(st.imagePath!);
    if (newUrl) {
      await db.update(stories).set({ imagePath: newUrl }).where(eq(stories.id, st.id));
    }
  }

  // 5. Echoes
  console.log("\n--- Migrating Echoes ---");
  const ecs = await db.select().from(echoes);
  for (const ec of ecs) {
    const updates: any = {};
    if (ec.filePath?.startsWith("/")) {
        const newUrl = await uploadLocalFile(ec.filePath);
        if (newUrl) updates.filePath = newUrl;
    }
    if (ec.thumbnailPath?.startsWith("/")) {
        const newUrl = await uploadLocalFile(ec.thumbnailPath);
        if (newUrl) updates.thumbnailPath = newUrl;
    }
    if (Object.keys(updates).length > 0) {
        await db.update(echoes).set(updates).where(eq(echoes.id, ec.id));
    }
  }

  // 6. Site Settings (JSON blocks)
  console.log("\n--- Migrating Site Settings ---");
  const settings = await db.select().from(siteSettings);
  for (const set of settings) {
    if (set.key === "homepage_hero" || set.key === "welcome_section" || set.key.includes("section")) {
        try {
            let data = JSON.parse(set.value);
            let changed = false;

            // Highly recursive helper to find and replace paths
            const walk = async (obj: any) => {
                if (typeof obj !== 'object' || obj === null) return;
                for (const k in obj) {
                    if (typeof obj[k] === 'string' && obj[k].startsWith("/") && !obj[k].startsWith("//")) {
                        const newUrl = await uploadLocalFile(obj[k]);
                        if (newUrl) {
                            obj[k] = newUrl;
                            changed = true;
                        }
                    } else if (typeof obj[k] === 'object') {
                        await walk(obj[k]);
                    }
                }
            };

            await walk(data);
            if (changed) {
                await db.update(siteSettings).set({ value: JSON.stringify(data) }).where(eq(siteSettings.key, set.key));
                console.log(`Updated site setting: ${set.key}`);
            }
        } catch (e) {
            // Not JSON or other error
        }
    } else if (set.value.startsWith("/")) {
        const newUrl = await uploadLocalFile(set.value);
        if (newUrl) {
            await db.update(siteSettings).set({ value: newUrl }).where(eq(siteSettings.key, set.key));
        }
    }
  }

  console.log("\nMigration complete!");
  process.exit(0);
}

migrate();
