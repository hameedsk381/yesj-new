import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { galleries } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { minioClient, BUCKET_NAME } from "@/lib/minio";

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

    // Upload to MinIO
    const fileExtension = image.name.split(".").pop();
    const fileName = `gallery/${crypto.randomUUID()}.${fileExtension}`;
    const buffer = Buffer.from(await image.arrayBuffer());

    await (minioClient as any).putObject(BUCKET_NAME, fileName, buffer, buffer.length, {
      "Content-Type": image.type,
    });

    const publicUrl = `${process.env.MINIO_USE_SSL === "true" ? "https" : "http"}://${process.env.MINIO_ENDPOINT}/${BUCKET_NAME}/${fileName}`;

    const newItem = await db.insert(galleries).values({
      title,
      category,
      description,
      imagePath: publicUrl,
    }).returning();

    return NextResponse.json(newItem[0]);
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
