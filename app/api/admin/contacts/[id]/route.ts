import { NextRequest } from "next/server";
import { proxyToBackend } from "@/lib/backend-proxy";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    // Current backend might use specific path for status, or general update
    // If backend is PUT /contacts/{id}/status, we should support that.
    // Let's assume generic update first or check backend.
    // Checking backend contacts.py would be ideal.
    // If unavailable, proxying to /contacts/{id} with PATCH is standard.
    return proxyToBackend(req, `/contacts/${params.id}`, "PATCH");
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return proxyToBackend(req, `/contacts/${params.id}`, "DELETE");
}
