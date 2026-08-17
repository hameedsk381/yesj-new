import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { nominations } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")?.trim()

    const conditions = []
    if (status) {
      conditions.push(eq(nominations.status, status))
    }
    if (search) {
      conditions.push(
        or(
          like(nominations.name, `%${search}%`),
          like(nominations.unitName, `%${search}%`),
          like(nominations.contestingFor, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(nominations)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select()
      .from(nominations)
      .orderBy(desc(nominations.createdAt))
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
    console.error("Nominations GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
