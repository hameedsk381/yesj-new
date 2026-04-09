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

    await db
      .update(nominations)
      .set({ status })
      .where(eq(nominations.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating nomination:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/nominations/[id] - Admin only
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

    await db
      .delete(nominations)
      .where(eq(nominations.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting nomination:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
