import { db } from "../lib/db";
import { programs } from "../lib/db/schema";
import { programsData } from "../lib/data/programs";

async function seedPrograms() {
  console.log("Seeding programs...");
  for (const p of programsData) {
    try {
      await db.insert(programs).values({
        slug: p.slug,
        title: p.title,
        shortTitle: p.shortTitle,
        badge: p.badge,
        tagline: p.tagline,
        imagePath: p.image,
        logoPath: p.logo,
        icon: p.icon,
        overviewDescription: p.overviewDescription,
        isActive: true,
      }).onDuplicateKeyUpdate({
        set: {
          title: p.title,
          imagePath: p.image,
          tagline: p.tagline,
          overviewDescription: p.overviewDescription
        }
      });
      console.log(`- Seeded ${p.slug}`);
    } catch (e) {
      console.error(`Failed to seed ${p.slug}:`, e);
    }
  }
  console.log("Done.");
  process.exit(0);
}

seedPrograms();
