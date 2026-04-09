import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { minioClient, BUCKET_NAME } from "@/lib/minio";
import { getTeamMembers, STRAPI_URL } from "@/lib/strapi";

export async function GET(req: NextRequest) {
  try {
    // Try Strapi first if configured
    if (STRAPI_URL && process.env.STRAPI_API_TOKEN) {
      try {
        const strapiTeam = await getTeamMembers();
        if (strapiTeam && strapiTeam.length > 0) {
          return NextResponse.json(strapiTeam);
        }
      } catch (err) {
        console.warn("Strapi fetch failed, falling back to local DB:", err);
      }
    }

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

    // Upload to MinIO
    const fileExtension = image.name.split(".").pop();
    const fileName = `team/${crypto.randomUUID()}.${fileExtension}`;
    const buffer = Buffer.from(await image.arrayBuffer());

    await (minioClient as any).putObject(BUCKET_NAME, fileName, buffer, buffer.length, {
      "Content-Type": image.type,
    });

    const publicUrl = `${process.env.MINIO_USE_SSL === "true" ? "https" : "http"}://${process.env.MINIO_ENDPOINT}/${BUCKET_NAME}/${fileName}`;

    const newMember = await db.insert(teamMembers).values({
      name,
      role,
      bio,
      twitterUrl,
      linkedinUrl,
      imagePath: publicUrl,
    }).returning();

    return NextResponse.json(newMember[0]);
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
