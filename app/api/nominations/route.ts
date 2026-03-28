import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { nominations } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { minioClient, BUCKET_NAME } from "@/lib/minio";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    const allNominations = await db.query.nominations.findMany({
      limit,
      offset,
      orderBy: [desc(nominations.createdAt)],
    });

    return NextResponse.json(allNominations);
  } catch (error) {
    console.error("Error fetching nominations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const unitName = formData.get("unitName") as string;
    const contestingFor = formData.get("contestingFor") as string;
    const educationQualification = formData.get("educationQualification") as string;
    const nocFile = formData.get("nocFile") as File;

    if (!name || !unitName || !contestingFor || !nocFile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upload to MinIO
    const fileExtension = nocFile.name.split(".").pop();
    const fileName = `nominations/${crypto.randomUUID()}.${fileExtension}`;
    const buffer = Buffer.from(await nocFile.arrayBuffer());

    await (minioClient as any).putObject(BUCKET_NAME, fileName, buffer, buffer.length, {
      "Content-Type": nocFile.type,
    });

    const publicUrl = `${process.env.MINIO_USE_SSL === "true" ? "https" : "http"}://${process.env.MINIO_ENDPOINT}/${BUCKET_NAME}/${fileName}`;

    const newNomination = await db.insert(nominations).values({
      name,
      unitName,
      contestingFor,
      educationQualification,
      nocFilePath: publicUrl,
      status: "pending",
    }).returning();

    return NextResponse.json(newNomination[0]);
  } catch (error) {
    console.error("Error creating nomination:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
