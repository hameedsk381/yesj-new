export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { uploadFile } from "@/lib/storage";
import { validateAndBuildKey } from "@/lib/upload-validation";

export async function GET(req: NextRequest) {
  const session = await getSession(req);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allEvents = await db.query.events.findMany({
      orderBy: [desc(events.createdAt)],
    });
    return NextResponse.json(allEvents);
  } catch (error) {
    console.error("Events GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const location = formData.get("location") as string;
    const fee = formData.get("fee") as string;
    const type = formData.get("type") as string;
    const image = formData.get("image") as File | null;

    let imagePath = null;
    if (image && image.size > 0) {
      const validated = validateAndBuildKey(image, "events", "image");
      if (!validated.ok) {
        return NextResponse.json({ error: validated.error }, { status: 400 });
      }
      imagePath = await uploadFile(image, validated.storageKey, validated.contentType);
    }

    const result = await db.insert(events).values({
      title,
      description,
      date: date ? new Date(date) : null,
      location,
      fee,
      type,
      imagePath,
      isActive: true,
    });

    return NextResponse.json({ id: result[0].insertId, title, imagePath });
  } catch (error) {
    console.error("Events POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

