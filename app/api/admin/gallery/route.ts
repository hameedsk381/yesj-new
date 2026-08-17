import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { galleries } from "@/lib/db/schema"
import { desc, sql, like, or, eq, and } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"
import { uploadFile } from "@/lib/storage"
import { validateAndBuildKey } from "@/lib/upload-validation"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 24)
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")?.trim()

    const conditions = []
    if (category && category !== "All") {
      conditions.push(eq(galleries.category, category))
    }
    if (search) {
      conditions.push(
        or(
          like(galleries.title, `%${search}%`),
          like(galleries.description, `%${search}%`)
        )
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(galleries)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select()
      .from(galleries)
      .orderBy(desc(galleries.createdAt))
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
    console.error("Gallery GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const contentType = req.headers.get("content-type") || ""
    let title: string, description: string, category: string, imagePath: string

    if (contentType.includes("application/json")) {
      const body = await req.json()
      title = body.title
      description = body.description
      category = body.category
      imagePath = body.imagePath
      if (!imagePath) {
        return adminJsonResponse({ error: "Image is required" }, { status: 400 })
      }
    } else {
      const formData = await req.formData()
      title = formData.get("title") as string
      description = formData.get("description") as string
      category = formData.get("category") as string
      const image = formData.get("image") as File

      if (!image || image.size === 0) {
        return adminJsonResponse({ error: "Image is required" }, { status: 400 })
      }

      const validated = validateAndBuildKey(image, "gallery", "image")
      if (!validated.ok) {
        return adminJsonResponse({ error: validated.error }, { status: 400 })
      }
      imagePath = await uploadFile(image, validated.storageKey, validated.contentType)
    }

    const result = await db.insert(galleries).values({
      title,
      description,
      imagePath,
      category,
    })

    return adminJsonResponse({ id: result[0].insertId, title, imagePath }, { status: 201 })
  } catch (error) {
    console.error("Gallery POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
