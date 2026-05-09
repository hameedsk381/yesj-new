export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createAccessToken } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

function getClientId(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const limit = checkRateLimit(`login:${getClientId(req)}`, {
    interval: 60_000,
    maxRequests: 10,
  });
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    if (email.length > 254 || password.length > 256) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (!user || !(await verifyPassword(password, user.hashedPassword))) {
      return NextResponse.json({ error: "Incorrect email or password" }, { status: 400 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Inactive user" }, { status: 400 });
    }

    const role = user.isSuperuser ? "admin" : "member";
    const token = await createAccessToken({ sub: user.id.toString(), role });

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, fullName: user.fullName, role },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24h — must match JWT setExpirationTime in lib/auth.ts
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
