import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletters } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

// GET /api/newsletters - Admin only
export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const subscribers = await db.query.newsletters.findMany({
      limit,
      offset,
      orderBy: [desc(newsletters.createdAt)],
    });

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/newsletters - Public
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if already exists
    const existing = await db.query.newsletters.findFirst({
      where: eq(newsletters.email, email),
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const result = await db.insert(newsletters).values({
      email,
      isActive: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
