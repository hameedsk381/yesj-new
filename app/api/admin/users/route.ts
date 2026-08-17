import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { hashPassword } from "@/lib/auth"
import { eq, desc, sql, like, or } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)

    let whereClause = undefined
    if (search) {
      whereClause = or(
        like(users.fullName, `%${search}%`),
        like(users.email, `%${search}%`)
      )
    }

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(users)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        isActive: users.isActive,
        isSuperuser: users.isSuperuser,
      })
      .from(users)
      .orderBy(desc(users.id))
      .limit(limit)
      .offset(offset)

    if (whereClause) {
      query = query.where(whereClause) as any
    }

    const items = await query

    return adminJsonResponse({
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    }, {
      headers: {
        "X-Total-Count": total.toString(),
      },
    })
  } catch (error) {
    console.error("Users GET error:", error)
    return adminJsonResponse({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { fullName, email, password, isSuperuser } = await req.json()

    if (!fullName || !email || !password) {
      return adminJsonResponse({ error: "Name, email, and password are required" }, { status: 400 })
    }

    const existing = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1)
    if (existing.length > 0) {
      return adminJsonResponse({ error: "A user with this email already exists" }, { status: 409 })
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
      return adminJsonResponse({ error: "Failed to create user" }, { status: 500 })
    }

    return adminJsonResponse(user, { status: 201 })
  } catch (error) {
    console.error("Users POST error:", error)
    return adminJsonResponse({ error: "Failed to create user" }, { status: 500 })
  }
}
