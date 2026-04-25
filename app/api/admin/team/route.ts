export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { uploadFile } from "@/lib/storage";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allTeam = await db.query.teamMembers.findMany({
      orderBy: [desc(teamMembers.createdAt)],
    });
    return NextResponse.json(allTeam);
  } catch (error) {
    console.error("Team GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const twitterUrl = formData.get("twitterUrl") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const image = formData.get("image") as File;

    let imagePath = null;
    if (image && image.size > 0) {
      const fileName = `team/${crypto.randomUUID()}-${image.name}`;
      imagePath = await uploadFile(image, fileName);
    }

    const result = await db.insert(teamMembers).values({
      name,
      role,
      bio,
      imagePath,
      twitterUrl,
      linkedinUrl,
    });

    return NextResponse.json({ id: result[0].insertId, name, role, imagePath });
  } catch (error) {
    console.error("Team POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
