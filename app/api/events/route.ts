import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { minioClient, BUCKET_NAME } from "@/lib/minio";
import { getEvents, STRAPI_URL } from "@/lib/strapi";

export async function GET(req: NextRequest) {
  try {
    // Try Strapi first if configured
    if (STRAPI_URL && process.env.STRAPI_API_TOKEN) {
      try {
        const strapiEvents = await getEvents();
        if (strapiEvents && strapiEvents.length > 0) {
          return NextResponse.json(strapiEvents);
        }
      } catch (err) {
        console.warn("Strapi fetch failed, falling back to local DB:", err);
      }
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const allEvents = await db.query.events.findMany({
      limit,
      offset,
      orderBy: [desc(events.date)],
      where: eq(events.isActive, true),
    });

    return NextResponse.json(allEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
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
    const description = formData.get("description") as string;
    const dateStr = formData.get("date") as string;
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const fee = formData.get("fee") as string;
    const deadlineStr = formData.get("deadline") as string;
    const image = formData.get("image") as File;

    if (!title || !dateStr || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upload to MinIO
    const fileExtension = image.name.split(".").pop();
    const fileName = `events/${crypto.randomUUID()}.${fileExtension}`;
    const buffer = Buffer.from(await image.arrayBuffer());

    await (minioClient as any).putObject(BUCKET_NAME, fileName, buffer, buffer.length, {
      "Content-Type": image.type,
    });

    const publicUrl = `${process.env.MINIO_USE_SSL === "true" ? "https" : "http"}://${process.env.MINIO_ENDPOINT}/${BUCKET_NAME}/${fileName}`;

    const newEvent = await db.insert(events).values({
      title,
      description,
      date: new Date(dateStr),
      location,
      type,
      fee,
      deadline: deadlineStr ? new Date(deadlineStr) : null,
      imagePath: publicUrl,
    }).returning();

    return NextResponse.json(newEvent[0]);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
