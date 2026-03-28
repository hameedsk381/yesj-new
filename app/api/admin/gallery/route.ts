import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { galleries } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { minioClient, BUCKET_NAME } from "@/lib/minio";

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

    const fileName = `${crypto.randomUUID()}-${image.name}`;
    const buffer = Buffer.from(await image.arrayBuffer());
    await minioClient.putObject(BUCKET_NAME, fileName, buffer, image.size, {
      "content-type": image.type,
    });

    const newItem = await db.insert(galleries).values({
      title,
      description,
      imagePath: fileName,
      category,
    }).returning();

    return NextResponse.json(newItem[0]);
  } catch (error) {
    console.error("Gallery POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}