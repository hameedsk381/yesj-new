import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const setting = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.key, "nav")
    });

    if (setting && setting.value) {
      return NextResponse.json(JSON.parse(setting.value));
    }

    return NextResponse.json(null);
  } catch (error) {
    console.error("Nav GET error:", error);
    return NextResponse.json(null);
  }
}
