export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { checkRateLimit } from "@/lib/rate-limit";
import { RATE_LIMIT } from "@/lib/constants";

// GET /api/contacts - Admin only
export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "100"), 500);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0"), 0);

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

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(5000),
});

function getClientId(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// POST /api/contacts - Public
export async function POST(req: NextRequest) {
  const limit = checkRateLimit(`contact:${getClientId(req)}`, RATE_LIMIT.CONTACT);
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const parsed = contactSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { name, email, subject, message } = parsed.data;

    await db.insert(contacts).values({
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
