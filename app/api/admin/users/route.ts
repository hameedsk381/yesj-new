import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { hashPassword } from "@/lib/auth"
import { eq, desc } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const all = await db.select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      isActive: users.isActive,
      isSuperuser: users.isSuperuser,
    }).from(users).orderBy(desc(users.id))
    return NextResponse.json(all)
  } catch (error) {
    console.error("Users GET error:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password, isSuperuser } = await req.json()

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    const existing = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1)
    if (existing.length > 0) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)

    const [inserted] = await db.insert(users).values({
      fullName,
      email: email.toLowerCase(),
      hashedPassword,
      isActive: true,
      isSuperuser: isSuperuser === true,
    })

    const [user] = await db.select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      isActive: users.isActive,
      isSuperuser: users.isSuperuser,
    }).from(users).where(eq(users.id, inserted.insertId)).limit(1)

    if (!user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error("Users POST error:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
