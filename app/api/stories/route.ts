import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stories } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { minioClient, BUCKET_NAME } from "@/lib/minio";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")     // Replace spaces with -
    .replace(/[^\w-]+/g, "")   // Remove all non-word chars
    .replace(/--+/g, "-");     // Replace multiple - with single -
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const allStories = await db.query.stories.findMany({
      limit,
      offset,
      orderBy: [desc(stories.createdAt)],
    });

    return NextResponse.json(allStories);
  } catch (error) {
    console.error("Error fetching stories:", error);
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
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const category = formData.get("category") as string || "General";
    const featured = formData.get("featured") === "true";
    const image = formData.get("image") as File;

    if (!title || !excerpt || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let slug = slugify(title);
    
    // Check for duplicate slugs
    const existing = await db.query.stories.findFirst({
      where: eq(stories.slug, slug),
    });

    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    let imagePath = null;
    if (image && image.size > 0) {
      const fileExtension = image.name.split(".").pop();
      const fileName = `stories/${crypto.randomUUID()}.${fileExtension}`;
      const buffer = Buffer.from(await image.arrayBuffer());

      await (minioClient as any).putObject(BUCKET_NAME, fileName, buffer, buffer.length, {
        "Content-Type": image.type,
      });

      imagePath = `${process.env.MINIO_USE_SSL === "true" ? "https" : "http"}://${process.env.MINIO_ENDPOINT}/${BUCKET_NAME}/${fileName}`;
    }

    const newStory = await db.insert(stories).values({
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      featured,
      imagePath,
    }).returning();

    return NextResponse.json(newStory[0]);
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
