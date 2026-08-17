import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { 
  registrations, 
  nominations, 
  contacts, 
  newsletters, 
  events, 
  galleries, 
  teamMembers, 
  stories 
} from "@/lib/db/schema"
import { sql } from "drizzle-orm"
import { requireAdmin, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const [
      registrationsCount,
      nominationsCount,
      contactsCount,
      newslettersCount,
      eventsCount,
      galleryCount,
      teamCount,
      storiesCount
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(registrations).then((r: Array<{ count: number }>) => Number(r[0]?.count || 0)),
      db.select({ count: sql<number>`count(*)` }).from(nominations).then((r: Array<{ count: number }>) => Number(r[0]?.count || 0)),
      db.select({ count: sql<number>`count(*)` }).from(contacts).then((r: Array<{ count: number }>) => Number(r[0]?.count || 0)),
      db.select({ count: sql<number>`count(*)` }).from(newsletters).then((r: Array<{ count: number }>) => Number(r[0]?.count || 0)),
      db.select({ count: sql<number>`count(*)` }).from(events).then((r: Array<{ count: number }>) => Number(r[0]?.count || 0)),
      db.select({ count: sql<number>`count(*)` }).from(galleries).then((r: Array<{ count: number }>) => Number(r[0]?.count || 0)),
      db.select({ count: sql<number>`count(*)` }).from(teamMembers).then((r: Array<{ count: number }>) => Number(r[0]?.count || 0)),
      db.select({ count: sql<number>`count(*)` }).from(stories).then((r: Array<{ count: number }>) => Number(r[0]?.count || 0)),
    ])

    return adminJsonResponse({
      data: {
        registrations: registrationsCount,
        nominations: nominationsCount,
        contacts: contactsCount,
        newsletters: newslettersCount,
        events: eventsCount,
        gallery: galleryCount,
        team: teamCount,
        stories: storiesCount,
      },
      count: registrationsCount,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
