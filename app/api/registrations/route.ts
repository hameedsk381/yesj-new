export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { getSession, hashPassword } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

// GET /api/registrations - Admin only
export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const allRegistrations = await db.query.registrations.findMany({
      limit,
      offset,
      orderBy: [desc(registrations.createdAt)],
    });

    return NextResponse.json(allRegistrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/registrations - Public
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { emailId, password, ...rest } = body;

    if (!emailId || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Check if already exists
    const existing = await db.query.registrations.findFirst({
      where: eq(registrations.emailId, emailId),
    });

    if (existing) {
      return NextResponse.json({ error: "Registration with this email already exists" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.insert(registrations).values({
      ...rest,
      emailId,
      hashedPassword,
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating registration:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
