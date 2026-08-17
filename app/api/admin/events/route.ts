import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { events } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"
import { uploadFile } from "@/lib/storage"
import { validateAndBuildKey } from "@/lib/upload-validation"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)
    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type")?.trim()

    const conditions = []
    if (type) {
      conditions.push(eq(events.type, type))
    }
    if (search) {
      conditions.push(
        or(
          like(events.title, `%${search}%`),
          like(events.description, `%${search}%`),
          like(events.location, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(events)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select()
      .from(events)
      .orderBy(desc(events.createdAt))
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
    console.error("Events GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const contentType = req.headers.get("content-type") || ""
    let title: string, description: string, location: string, fee: string, type: string, deadline: string | null = null
    let date: string | null = null
    let imagePath: string | null = null

    if (contentType.includes("application/json")) {
      const body = await req.json()
      title = body.title
      description = body.description
      date = body.date || null
      location = body.location
      fee = body.fee || ""
      type = body.type
      deadline = body.deadline || null
      imagePath = body.imagePath || null
    } else {
      const formData = await req.formData()
      title = formData.get("title") as string
      description = formData.get("description") as string
      date = formData.get("date") as string
      location = formData.get("location") as string
      fee = formData.get("fee") as string
      type = formData.get("type") as string
      deadline = formData.get("deadline") as string
      const image = formData.get("image") as File | null

      if (image && image.size > 0) {
        const validated = validateAndBuildKey(image, "events", "image")
        if (!validated.ok) {
          return adminJsonResponse({ error: validated.error }, { status: 400 })
        }
        imagePath = await uploadFile(image, validated.storageKey, validated.contentType)
      }
    }

    const result = await db.insert(events).values({
      title,
      description,
      date: date ? new Date(date) : null,
      location,
      fee,
      type,
      deadline: deadline ? new Date(deadline) : null,
      imagePath,
      isActive: true,
    })

    return adminJsonResponse({ id: result[0].insertId, title, imagePath }, { status: 201 })
  } catch (error) {
    console.error("Events POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
