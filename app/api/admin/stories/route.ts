import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stories } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = await db.insert(stories).values(body);
    return NextResponse.json({ success: true, id: result[0].insertId });
  } catch (error) {
    console.error("Story POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
