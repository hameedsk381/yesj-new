import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { nominations } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id);
    const body = await req.json();
    const { status } = body;

    const updated = await db
      .update(nominations)
      .set({ status })
      .where(eq(nominations.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Nomination not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating nomination:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id);
    const deleted = await db
      .delete(nominations)
      .where(eq(nominations.id, id))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Nomination not found" }, { status: 404 });
    }

    return NextResponse.json(deleted[0]);
  } catch (error) {
    console.error("Error deleting nomination:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
