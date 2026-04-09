import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { programs } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allPrograms = await db.query.programs.findMany({
      where: eq(programs.isActive, true),
      orderBy: [asc(programs.order)],
    });
    
    // Fallback logic could go here if DB is empty, but we seeded it.
    
    return NextResponse.json(allPrograms);
  } catch (error) {
    console.error("Programs public GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
