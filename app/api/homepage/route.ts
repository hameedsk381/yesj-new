import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { siteSettings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { homepageData } from '@/lib/data/site-content';

export async function GET() {
  try {
    const setting = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.key, "homepageData")
    });

    if (setting && setting.value) {
      return NextResponse.json(JSON.parse(setting.value));
    }

    return NextResponse.json(homepageData);
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    return NextResponse.json(homepageData);
  }
}
