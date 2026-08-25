import { db } from "@/lib/db"
import { programs, siteSettings } from "@/lib/db/schema"
import { programsData } from "@/lib/data/programs"

/**
 * Merges program content from three sources (lowest -> highest priority):
 * 1. Static defaults from lib/data/programs
 * 2. Rich content JSON stored in siteSettings under key `program_content:<slug>`
 * 3. The programs table row (admin edits: title, images, etc.)
 *
 * Admin-uploaded images land in the programs table, so the table row must be
 * read for imagePath/logoPath or uploads never appear on the public site.
 */
export async function getMergedPrograms(): Promise<any[]> {
  let rows: any[] = []
  const settingsMap: Record<string, string> = {}

  try {
    rows = await db.select().from(programs)
  } catch (error) {
    console.error("Failed to load programs table:", error)
  }
  try {
    const allSettings = await db.select().from(siteSettings)
    for (const s of allSettings) {
      settingsMap[s.key] = s.value
    }
  } catch (error) {
    console.error("Failed to load site settings:", error)
  }

  const slugs = new Set<string>([
    ...programsData.map((p) => p.slug),
    ...rows.map((r) => r.slug),
  ])

  const merged: any[] = []

  for (const slug of slugs) {
    const staticProgram: any = programsData.find((p) => p.slug === slug) || null
    const row: any = rows.find((r) => r.slug === slug) || null

    // Programs explicitly deactivated by an admin are hidden from the site
    if (row && row.isActive === false) continue

    let content: any = {}
    const stored = settingsMap[`program_content:${slug}`]
    if (stored) {
      try {
        content = JSON.parse(stored)
      } catch {}
    }

    const rowOverlay: any = {}
    if (row) {
      if (row.title != null && row.title !== "") rowOverlay.title = row.title
      if (row.shortTitle != null && row.shortTitle !== "") rowOverlay.shortTitle = row.shortTitle
      if (row.badge != null && row.badge !== "") rowOverlay.badge = row.badge
      if (row.tagline != null && row.tagline !== "") rowOverlay.tagline = row.tagline
      if (row.icon != null && row.icon !== "") rowOverlay.icon = row.icon
      if (row.overviewDescription != null && row.overviewDescription !== "") rowOverlay.overviewDescription = row.overviewDescription
    }

    merged.push({
      ...(staticProgram || {
        slug,
        image: "/placeholder.jpg",
        logo: "",
        cardBarClassName: "bg-primary",
        categories: ["All Programs"],
        megaMenuGroup: "skill-education",
        heroActions: [],
        bottomActions: [],
        sections: [],
      }),
      ...content,
      ...rowOverlay,
      slug,
      image: row?.imagePath || content.imagePath || staticProgram?.image || "/placeholder.jpg",
      logo: row?.logoPath || content.logoPath || staticProgram?.logo || "",
      // Admin saves never set `order`, so prefer the curated static ordering
      order: staticProgram?.order ?? row?.order ?? 0,
    })
  }

  merged.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  return merged
}
