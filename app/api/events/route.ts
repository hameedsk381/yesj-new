export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { uploadFile } from "@/lib/storage";
import { validateAndBuildKey } from "@/lib/upload-validation";

export async function GET(req: NextRequest) {
  try {

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

    // Validate and upload to GCS with a server-controlled key
    const validated = validateAndBuildKey(image, "events", "image");
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const publicUrl = await uploadFile(image, validated.storageKey, validated.contentType);

    await db.insert(events).values({
      title,
      description,
      date: new Date(dateStr),
      location,
      type,
      fee,
      deadline: deadlineStr ? new Date(deadlineStr) : null,
      imagePath: publicUrl,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
