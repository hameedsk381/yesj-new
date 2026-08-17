import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { registrations } from "@/lib/db/schema"
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
    const applicationType = searchParams.get("applicationType")?.trim()

    const conditions = []

    if (status) {
      conditions.push(eq(registrations.status, status))
    }
    if (applicationType) {
      conditions.push(eq(registrations.applicationType, applicationType))
    }
    if (search) {
      conditions.push(
        or(
          like(registrations.name, `%${search}%`),
          like(registrations.emailId, `%${search}%`),
          like(registrations.mobileNo, `%${search}%`),
          like(registrations.registrationNo, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(registrations)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select()
      .from(registrations)
      .orderBy(desc(registrations.createdAt))
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
    console.error("Registrations GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
