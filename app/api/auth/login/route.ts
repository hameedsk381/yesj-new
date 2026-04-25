export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createAccessToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // native database verification
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user || !(await verifyPassword(password, user.hashedPassword))) {
      return NextResponse.json({ error: "Incorrect email or password" }, { status: 400 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Inactive user" }, { status: 400 });
    }

    const role = user.isSuperuser ? "admin" : "member";
    const token = await createAccessToken({ sub: user.id.toString(), role });

    // Create response with cookie
    const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, fullName: user.fullName, role } });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
