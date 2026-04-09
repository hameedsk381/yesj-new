import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { programs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const program = await db.query.programs.findFirst({
      where: eq(programs.slug, params.slug),
    });
    
    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }
    
    return NextResponse.json(program);
  } catch (error) {
    console.error("Program GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    await db.update(programs)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(programs.slug, params.slug));
      
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Program PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.delete(programs).where(eq(programs.slug, params.slug));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Program DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
