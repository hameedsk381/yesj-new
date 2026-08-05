export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const story = await db.query.stories.findFirst({
      where: eq(stories.id, id),
    });

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error("Story GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    const body = await req.json();
    await db.update(stories).set(body).where(eq(stories.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Story PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    await db.delete(stories).where(eq(stories.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Story DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
