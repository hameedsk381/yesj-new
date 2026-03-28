import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { nominations } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allNominations = await db.query.nominations.findMany({
      orderBy: [desc(nominations.createdAt)],
    });
    return NextResponse.json(allNominations);
  } catch (error) {
    console.error("Nominations GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
