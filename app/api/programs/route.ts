import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { programsData } from "@/lib/data/programs";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allSettings = await db.select().from(siteSettings);
    const settingsMap = allSettings.reduce(
      (acc: Record<string, string>, curr: { key: string; value: string }) => {
        acc[curr.key] = curr.value;
        return acc;
      },
      {} as Record<string, string>
    );

    const merged = programsData.map(staticProgram => {
      const stored = settingsMap[`program_content:${staticProgram.slug}`];
      let content: any = {};
      if (stored) {
        try { content = JSON.parse(stored); } catch {}
      }

      return {
        ...staticProgram,
        ...content,
        slug: staticProgram.slug,
        image: content.imagePath || staticProgram.image || "/placeholder.jpg",
        logo: content.logoPath || staticProgram.logo,
        cardBarClassName: content.cardBarClassName || staticProgram.cardBarClassName || "bg-primary",
        categories: content.categories || staticProgram.categories || ["All Programs"],
        megaMenuGroup: content.megaMenuGroup || staticProgram.megaMenuGroup || "skill-education",
        heroActions: content.heroActions || staticProgram.heroActions || [],
        sections: content.sections || staticProgram.sections || [],
        bottomActions: content.bottomActions !== undefined ? content.bottomActions : staticProgram.bottomActions,
        icon: content.icon || staticProgram.icon || "sparkles",
        shortTitle: content.shortTitle || staticProgram.shortTitle || staticProgram.title,
        subheading: content.subheading || staticProgram.subheading,
        megaMenuDescription: content.megaMenuDescription || staticProgram.megaMenuDescription || "",
        overviewDescription: content.overviewDescription || staticProgram.overviewDescription || "",
        badge: content.badge || staticProgram.badge || "",
        tagline: content.tagline || staticProgram.tagline || "",
        title: content.title || staticProgram.title,
      };
    });

    return NextResponse.json(merged);
  } catch (error) {
    console.error("Programs public GET error:", error);
    return NextResponse.json(programsData);
  }
}
