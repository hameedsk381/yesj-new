export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletters } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscribers = await db.query.newsletters.findMany({
      orderBy: [desc(newsletters.createdAt)],
    });
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Newsletters GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

