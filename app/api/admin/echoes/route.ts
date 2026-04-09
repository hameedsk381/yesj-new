import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { echoes } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { uploadFile } from "@/lib/storage";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allEchoes = await db.query.echoes.findMany({
      orderBy: [desc(echoes.releaseDate)],
    });
    return NextResponse.json(allEchoes);
  } catch (error) {
    console.error("Echoes GET error:", error);
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
    const edition = formData.get("edition") as string;
    const description = formData.get("description") as string;
    const releaseDate = formData.get("releaseDate") as string;
    const file = formData.get("file") as File;
    const thumbnail = formData.get("thumbnail") as File;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "PDF file is required" }, { status: 400 });
    }

    // Upload PDF
    const pdfName = `echoes/${crypto.randomUUID()}-${file.name}`;
    const filePath = await uploadFile(file, pdfName);

    // Upload Thumbnail if exists
    let thumbnailPath = null;
    if (thumbnail && thumbnail.size > 0) {
      const thumbName = `echoes/thumbs/${crypto.randomUUID()}-${thumbnail.name}`;
      thumbnailPath = await uploadFile(thumbnail, thumbName);
    }

    const result = await db.insert(echoes).values({
      title,
      edition,
      description,
      releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
      filePath,
      thumbnailPath
    });

    return NextResponse.json({ id: result[0].insertId, title, filePath });
  } catch (error) {
    console.error("Echoes POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
