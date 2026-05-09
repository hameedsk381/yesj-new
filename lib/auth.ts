import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const RAW_SECRET = process.env.JWT_SECRET;
if (!RAW_SECRET || RAW_SECRET.length < 32) {
  throw new Error(
    "JWT_SECRET environment variable must be set to a strong value (>=32 chars)."
  );
}
const SECRET = new TextEncoder().encode(RAW_SECRET);
const ALGORITHM = "HS256";

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
    .sign(SECRET);
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET, {
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
