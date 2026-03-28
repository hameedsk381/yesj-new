import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletters } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

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
    await db.delete(newsletters).where(eq(newsletters.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
