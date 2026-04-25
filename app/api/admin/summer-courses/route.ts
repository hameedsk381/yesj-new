export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { summerCourseRegistrations } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allRegistrations = await db.select()
      .from(summerCourseRegistrations)
      .orderBy(desc(summerCourseRegistrations.createdAt));

    return NextResponse.json(allRegistrations);
  } catch (error) {
    console.error("Error fetching summer registrations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
