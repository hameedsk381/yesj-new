import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { contacts } from "@/lib/db/schema"
import { desc, sql, like, or } from "drizzle-orm"
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
        like(contacts.name, `%${search}%`),
        like(contacts.email, `%${search}%`),
        like(contacts.subject, `%${search}%`)
      )
    }

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(contacts)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt))
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
    console.error("Contacts GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
