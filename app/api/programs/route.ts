import { NextResponse } from "next/server";
import { programsData } from "@/lib/data/programs";
import { getMergedPrograms } from "@/lib/programs-server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const merged = await getMergedPrograms();
    return NextResponse.json(merged);
  } catch (error) {
    console.error("Programs public GET error:", error);
    return NextResponse.json(programsData);
  }
}