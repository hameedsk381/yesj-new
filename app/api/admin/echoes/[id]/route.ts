import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { echoes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

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
    if (body.releaseDate) body.releaseDate = new Date(body.releaseDate);
    // Remove ID and other non-updatable fields if they exist
    const { id: _, createdAt, ...updateData } = body;
    
    await db.update(echoes).set(updateData).where(eq(echoes.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Echoes PATCH error:", error);
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
    await db.delete(echoes).where(eq(echoes.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Echoes DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
