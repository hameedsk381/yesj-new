import { NextRequest } from "next/server";
import { proxyToBackend } from "@/lib/backend-proxy";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return proxyToBackend(req, `/nominations/${params.id}`);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return proxyToBackend(req, `/nominations/${params.id}`, "DELETE");
}
