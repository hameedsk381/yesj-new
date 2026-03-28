import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allContacts = await db.query.contacts.findMany({
      orderBy: [desc(contacts.createdAt)],
    });
    return NextResponse.json(allContacts);
  } catch (error) {
    console.error("Contacts GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
