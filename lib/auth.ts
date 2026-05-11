import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ALGORITHM = "HS256";

// Lazily resolve the JWT secret so that build-time module evaluation (Next.js
// "collect page data" phase) doesn't crash when the env var isn't present.
// The check still runs the first time a token is signed or verified at runtime.
let cachedSecret: Uint8Array | null = null;
function getSecret(): Uint8Array {
  if (cachedSecret) return cachedSecret;
  const raw = process.env.JWT_getSecret();
  if (!raw || raw.length < 32) {
    throw new Error(
      "JWT_getSecret() environment variable must be set to a strong value (>=32 chars)."
    );
  }
  cachedSecret = new TextEncoder().encode(raw);
  return cachedSecret;
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  // Check if it's a bcrypt hash (starts with $2a$ or $2b$)
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$")) {
    return await bcrypt.compare(password, hash);
  }
  
  // NOTE: If you have legacy pbkdf2-sha256 hashes from Python/Passlib, 
  // you would need a custom verification function here.
  // For now, we assume the use of bcrypt for Next.js compatibility.
  return false;
}

export interface AccessTokenPayload {
  sub: string;
  role: "admin" | "member";
  email?: string;
}

export async function createAccessToken(payload: AccessTokenPayload) {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("24h") // must match cookie maxAge in login routes
    .sign(getSecret());
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: [ALGORITHM],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession(req?: NextRequest) {
  const token = req
    ? req.cookies.get("token")?.value
    : cookies().get("token")?.value;

  if (!token) return null;
  return await verifyAccessToken(token);
}

/**
 * Guard for admin API routes. Returns a NextResponse to short-circuit, or
 * the verified session payload to continue.
 *
 * Note: middleware.ts already enforces admin auth + CSRF on /api/admin/*.
 * This helper is for routes outside that prefix (or for defense-in-depth).
 */
export async function requireAdmin(
  req?: NextRequest
): Promise<NextResponse | { session: NonNullable<Awaited<ReturnType<typeof getSession>>> }> {
  const session = await getSession(req);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return { session };
}
