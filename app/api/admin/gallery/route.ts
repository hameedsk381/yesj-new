import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { galleries } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { uploadFile } from "@/lib/storage";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allGalleryItems = await db.query.galleries.findMany({
      orderBy: [desc(galleries.createdAt)],
    });
    return NextResponse.json(allGalleryItems);
  } catch (error) {
    console.error("Gallery GET error:", error);
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
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    if (!image || image.size === 0) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const fileName = `gallery/${crypto.randomUUID()}-${image.name}`;
    const imagePath = await uploadFile(image, fileName);

    const result = await db.insert(galleries).values({
      title,
      description,
      imagePath,
      category,
    });

    return NextResponse.json({ id: result[0].insertId, title, imagePath });
  } catch (error) {
    console.error("Gallery POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}