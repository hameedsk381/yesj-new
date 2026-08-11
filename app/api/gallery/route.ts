export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { galleries } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { uploadFile } from "@/lib/storage";
import { validateAndBuildKey } from "@/lib/upload-validation";

export async function GET(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");
    const category = searchParams.get("category");

    const query = db.query.galleries.findMany({
      limit,
      offset,
      orderBy: [desc(galleries.createdAt)],
      where: category ? eq(galleries.category, category) : undefined,
    });

    const items = await query;
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching gallery:", error);
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
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    if (!title || !category || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate and upload to GCS with a server-controlled key
    const validated = validateAndBuildKey(image, "gallery", "image");
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const publicUrl = await uploadFile(image, validated.storageKey, validated.contentType);

    const result = await db.insert(galleries).values({
      title,
      category,
      description,
      imagePath: publicUrl,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
