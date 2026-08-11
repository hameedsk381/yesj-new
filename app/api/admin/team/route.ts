export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { uploadFile } from "@/lib/storage";
import { validateAndBuildKey } from "@/lib/upload-validation";

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
    const contentType = req.headers.get("content-type") || "";
    let name, role, bio, twitterUrl, linkedinUrl;
    let imagePath: string | null = null;

    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = body.name;
      role = body.role;
      bio = body.bio || "";
      twitterUrl = body.twitterUrl || "";
      linkedinUrl = body.linkedinUrl || "";
      imagePath = body.imagePath || null;
    } else {
      const formData = await req.formData();
      name = formData.get("name") as string;
      role = formData.get("role") as string;
      bio = formData.get("bio") as string;
      twitterUrl = formData.get("twitterUrl") as string;
      linkedinUrl = formData.get("linkedinUrl") as string;
      const image = formData.get("image") as File;

      if (image && image.size > 0) {
        const validated = validateAndBuildKey(image, "team", "image");
        if (!validated.ok) {
          return NextResponse.json({ error: validated.error }, { status: 400 });
        }
        imagePath = await uploadFile(image, validated.storageKey, validated.contentType);
      }
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
