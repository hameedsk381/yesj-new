import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc } from "drizzle-orm";

// GET /api/contacts - Admin only
export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const allContacts = await db.query.contacts.findMany({
      limit,
      offset,
      orderBy: [desc(contacts.createdAt)],
    });

    return NextResponse.json(allContacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/contacts - Public
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await db.insert(contacts).values({
      name,
      email,
      subject,
      message,
      status: "unread",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
