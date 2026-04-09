import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { uploadFile } from "@/lib/storage";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "website";

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const fileName = `${folder}/${crypto.randomUUID()}-${file.name}`;
    const url = await uploadFile(file, fileName);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
