import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { programs } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { programsData } from "@/lib/data/programs";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allPrograms = await db.query.programs.findMany({
      where: eq(programs.isActive, true),
      orderBy: [asc(programs.order)],
    });
    
    // Map database fields to the structure expected by the frontend
    // And merge with static data for missing fields like 'sections', 'heroActions', etc.
    const mappedPrograms = allPrograms.map(dbProgram => {
      const staticProgram = programsData.find(p => p.slug === dbProgram.slug);
      
      return {
        ...staticProgram, // Start with static data if available
        ...dbProgram,    // Override with DB data
        // Ensure field names match what the frontend expects
        image: dbProgram.imagePath || staticProgram?.image || "/placeholder.jpg",
        logo: dbProgram.logoPath || staticProgram?.logo,
        categories: staticProgram?.categories || ["All Programs"], // DB doesn't have categories yet
      };
    });
    
    // If DB is empty, fallback to programsData
    if (mappedPrograms.length === 0) {
      return NextResponse.json(programsData);
    }
    
    return NextResponse.json(mappedPrograms);
  } catch (error) {
    console.error("Programs public GET error:", error);
    // On error, we still want the page to work, so fallback to static data
    return NextResponse.json(programsData);
  }
}
