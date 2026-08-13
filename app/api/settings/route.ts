import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { siteSettings } from '@/lib/db/schema';
import { siteConfig } from '@/lib/config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await db.select().from(siteSettings);
    
    // Convert to a more usable object
    const settingsMap = settings.reduce(
      (acc: Record<string, string>, curr: { key: string; value: string }) => {
        acc[curr.key] = curr.value;
        return acc;
      },
      {} as Record<string, string>
    );

    // Merge with siteConfig fallback
    const config: any = {
      ...siteConfig,
      ...settingsMap
    };

    // Nested settings (contact/social) are stored as JSON blobs; parse them back
    // and merge over the defaults so `config.contact.email` etc. resolve correctly.
    for (const section of ["contact", "social"] as const) {
      if (typeof config[section] === "string") {
        try {
          config[section] = { ...(siteConfig as any)[section], ...JSON.parse(config[section]) };
        } catch {
          delete config[section];
        }
      }
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("Failed to fetch settings from DB:", error);
    // Fallback to hardcoded config
    return NextResponse.json(siteConfig);
  }
}
