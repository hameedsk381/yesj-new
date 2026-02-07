import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://127.0.0.1:8000/api/v1";

export async function proxyToBackend(req: NextRequest, endpoint: string, method: string = "GET") {
    try {
        const token = req.cookies.get("token")?.value;
        const headers: HeadersInit = {};

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const contentType = req.headers.get("content-type");
        let body: any = undefined;

        if (method !== "GET" && method !== "DELETE") {
            if (contentType && contentType.includes("multipart/form-data")) {
                // For file uploads, forward the blob/formData directly
                // We must NOT set Content-Type header manually; let fetch generate boundary
                // BUT current Next.js Request body is a ReadableStream.
                // Fetch accepts Request/Response objects as body sometimes, or Blob/Buffer.
                // Let's try reading as Blob to ensure correct forwarding
                const blob = await req.blob();
                body = blob;
                // Do NOT set Content-Type header here, let browser/fetch handle boundary
            } else {
                headers["Content-Type"] = "application/json";
                if (req.body) {
                    try {
                        const jsonBody = await req.json();
                        body = JSON.stringify(jsonBody);
                    } catch (e) {
                        // Empty body or parsing error
                    }
                }
            }
        }

        const res = await fetch(`${BACKEND_URL}${endpoint}`, {
            method,
            headers,
            body,
        });

        if (!res.ok) {
            // Forward error
            return NextResponse.json(
                { error: "Backend error", details: await res.text() },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`Proxy error for ${endpoint}:`, error);
        return NextResponse.json({ error: "Internal Proxy Error" }, { status: 500 });
    }
}
