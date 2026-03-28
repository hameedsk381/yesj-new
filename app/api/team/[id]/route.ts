import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

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
      .delete(teamMembers)
      .where(eq(teamMembers.id, id))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json(deleted[0]);
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
