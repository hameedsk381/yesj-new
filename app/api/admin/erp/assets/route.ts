import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { assets } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")?.trim()
    const status = searchParams.get("status")?.trim()

    const conditions = []
    if (category) {
      conditions.push(eq(assets.category, category))
    }
    if (status) {
      conditions.push(eq(assets.status, status))
    }
    if (search) {
      conditions.push(
        or(
          like(assets.name, `%${search}%`),
          like(assets.serialNumber, `%${search}%`),
          like(assets.assignedTo, `%${search}%`),
          like(assets.location, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(assets)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    const sumRes = whereClause
      ? await db
          .select({ sum: sql<string>`coalesce(sum(${assets.purchaseCost}),0)` })
          .from(assets)
          .where(whereClause)
      : await db
          .select({ sum: sql<string>`coalesce(sum(${assets.purchaseCost}),0)` })
          .from(assets)
    const totalValue = Number(sumRes[0]?.sum || 0)

    let query = db
      .select()
      .from(assets)
      .orderBy(desc(assets.createdAt))
      .limit(limit)
      .offset(offset)

    if (whereClause) {
      query = query.where(whereClause) as any
    }

    const items = await query

    return adminJsonResponse({
      data: items,
      totalValue,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    })
  } catch (error) {
    console.error("Assets GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const body = await req.json()
    const name = (body.name || "").trim()
    if (!name) {
      return adminJsonResponse({ error: "Asset name is required" }, { status: 400 })
    }

    const result = await db.insert(assets).values({
      name,
      category: body.category || null,
      description: body.description || null,
      serialNumber: body.serialNumber || null,
      condition: body.condition || "good",
      status: body.status || "in-use",
      location: body.location || null,
      assignedTo: body.assignedTo || null,
      purchaseDate: body.purchaseDate || null,
      purchaseCost: body.purchaseCost ? parseFloat(body.purchaseCost).toFixed(2) : null,
      notes: body.notes || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Assets POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}