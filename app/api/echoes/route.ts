import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { echoes } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(echoes).orderBy(desc(echoes.createdAt));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
