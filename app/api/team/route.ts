import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { uploadFile } from "@/lib/storage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const team = await db.query.teamMembers.findMany({
      limit,
      offset,
      orderBy: [desc(teamMembers.createdAt)],
    });

    return NextResponse.json(team);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const twitterUrl = formData.get("twitterUrl") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const image = formData.get("image") as File;

    if (!name || !role || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upload to GCS
    const fileExtension = image.name.split(".").pop();
    const fileName = `team/${crypto.randomUUID()}.${fileExtension}`;
    
    const publicUrl = await uploadFile(image, fileName);

    const result = await db.insert(teamMembers).values({
      name,
      role,
      bio,
      twitterUrl,
      linkedinUrl,
      imagePath: publicUrl,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
