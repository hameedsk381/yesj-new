import { NextRequest } from "next/server";
import { proxyToBackend } from "@/lib/backend-proxy";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return proxyToBackend(req, `/gallery/${params.id}`, "DELETE");
}
