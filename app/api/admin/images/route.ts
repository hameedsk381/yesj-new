export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { listFiles } from "@/lib/storage";
import { getSession } from "@/lib/auth";

// GET /api/admin/images?prefix=events&q=... — list existing uploaded images so
// admin editors can pick from previously uploaded files instead of re-uploading.
export async function GET(req: NextRequest) {
  const session = await getSession(req);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const prefix = searchParams.get("prefix") || "";
    const pageToken = searchParams.get("pageToken") || undefined;
    const q = (searchParams.get("q") || "").toLowerCase();

    let folder = "";
    if (prefix && /^[A-Za-z0-9_-]+$/.test(prefix)) folder = prefix + "/";

    const { files, nextPageToken } = await listFiles({
      prefix: folder,
      pageSize: 200,
      pageToken,
      kind: "images",
    });

    // Client-side filter by name query.
    const filtered = q ? files.filter((f) => f.name.toLowerCase().includes(q)) : files;

    return NextResponse.json({ files: filtered, nextPageToken });
  } catch (error) {
    console.error("Images list error:", error);
    return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
  }
}