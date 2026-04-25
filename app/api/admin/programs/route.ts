export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { programs } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allPrograms = await db.query.programs.findMany({
      orderBy: [desc(programs.order), desc(programs.createdAt)],
    });
    return NextResponse.json(allPrograms);
  } catch (error) {
    console.error("Programs GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = await db.insert(programs).values(body);
    return NextResponse.json({ success: true, id: result[0].insertId });
  } catch (error) {
    console.error("Programs POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

