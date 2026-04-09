import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { siteSettings } from '@/lib/db/schema';
import { siteConfig } from '@/lib/config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await db.select().from(siteSettings);
    
    // Convert to a more usable object
    const settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    // Merge with siteConfig fallback
    const config = {
      ...siteConfig,
      ...settingsMap
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error("Failed to fetch settings from DB:", error);
    // Fallback to hardcoded config
    return NextResponse.json(siteConfig);
  }
}
