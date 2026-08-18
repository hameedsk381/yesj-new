import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { inventoryItems } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and, lt } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")?.trim()
    const lowStock = searchParams.get("lowStock") === "true"

    const conditions = []
    if (category) {
      conditions.push(eq(inventoryItems.category, category))
    }
    if (lowStock) {
      conditions.push(lt(inventoryItems.quantity, inventoryItems.minQuantity))
    }
    if (search) {
      conditions.push(
        or(
          like(inventoryItems.name, `%${search}%`),
          like(inventoryItems.supplier, `%${search}%`),
          like(inventoryItems.location, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(inventoryItems)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    const valueRes = await db
      .select({ sum: sql<string>`coalesce(sum(${inventoryItems.quantity} * ${inventoryItems.unitCost}),0)` })
      .from(inventoryItems)
      .where(whereClause || sql`1=1`)
    const totalValue = Number(valueRes[0]?.sum || 0)

    // Count of low stock items (across whole inventory, not just page)
    const lowStockRes = await db
      .select({ count: sql<number>`count(*)` })
      .from(inventoryItems)
      .where(lt(inventoryItems.quantity, inventoryItems.minQuantity))
    const lowStockCount = Number(lowStockRes[0]?.count || 0)

    let query = db
      .select()
      .from(inventoryItems)
      .orderBy(desc(inventoryItems.updatedAt))
      .limit(limit)
      .offset(offset)

    if (whereClause) {
      query = query.where(whereClause) as any
    }

    const items = await query

    return adminJsonResponse({
      data: items,
      totalValue,
      lowStockCount,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    })
  } catch (error) {
    console.error("Inventory GET error:", error)
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
      return adminJsonResponse({ error: "Item name is required" }, { status: 400 })
    }

    const result = await db.insert(inventoryItems).values({
      name,
      category: body.category || null,
      quantity: body.quantity ? parseFloat(body.quantity).toFixed(2) : "0",
      unit: body.unit || "pieces",
      minQuantity: body.minQuantity ? parseFloat(body.minQuantity).toFixed(2) : "0",
      unitCost: body.unitCost ? parseFloat(body.unitCost).toFixed(2) : null,
      supplier: body.supplier || null,
      location: body.location || null,
      notes: body.notes || null,
    })

    return adminJsonResponse({ id: result[0].insertId }, { status: 201 })
  } catch (error) {
    console.error("Inventory POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}