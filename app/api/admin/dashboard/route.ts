import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { 
  registrations, 
  nominations, 
  contacts, 
  newsletters, 
  events, 
  galleries, 
  teamMembers, 
  stories 
} from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { sql } from "drizzle-orm";

// This endpoint relies on cookies/session (via `getSession(req)`), so it must be dynamic.
export const dynamic = "force-dynamic";

// GET /api/admin/dashboard - Admin only
export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Run counts in parallel
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
      db.select({ count: sql<number>`count(*)` }).from(registrations).then(r => Number(r[0].count)),
      db.select({ count: sql<number>`count(*)` }).from(nominations).then(r => Number(r[0].count)),
      db.select({ count: sql<number>`count(*)` }).from(contacts).then(r => Number(r[0].count)),
      db.select({ count: sql<number>`count(*)` }).from(newsletters).then(r => Number(r[0].count)),
      db.select({ count: sql<number>`count(*)` }).from(events).then(r => Number(r[0].count)),
      db.select({ count: sql<number>`count(*)` }).from(galleries).then(r => Number(r[0].count)),
      db.select({ count: sql<number>`count(*)` }).from(teamMembers).then(r => Number(r[0].count)),
      db.select({ count: sql<number>`count(*)` }).from(stories).then(r => Number(r[0].count)),
    ]);

    return NextResponse.json({
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
      count: registrationsCount, // legacy/compat
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
