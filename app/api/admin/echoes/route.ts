import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { echoes } from "@/lib/db/schema"
import { desc, sql, like, or } from "drizzle-orm"
import { requireAdmin, parsePaginationParams, adminJsonResponse } from "@/lib/admin-api-helpers"
import { uploadFile } from "@/lib/storage"
import { validateAndBuildKey } from "@/lib/upload-validation"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const { page, limit, offset, search } = parsePaginationParams(req, 25)

    let whereClause = undefined
    if (search) {
      whereClause = or(
        like(echoes.title, `%${search}%`),
        like(echoes.edition, `%${search}%`),
        like(echoes.description, `%${search}%`)
      )
    }

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(echoes)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select()
      .from(echoes)
      .orderBy(desc(echoes.releaseDate))
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
    console.error("Echoes GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const formData = await req.formData()
    const title = formData.get("title") as string
    const edition = formData.get("edition") as string
    const description = formData.get("description") as string
    const releaseDate = formData.get("releaseDate") as string
    const file = formData.get("file") as File
    const thumbnail = formData.get("thumbnail") as File
    const thumbnailPathInput = formData.get("thumbnailPath") as string

    if (!file || file.size === 0) {
      return adminJsonResponse({ error: "PDF file is required" }, { status: 400 })
    }

    const pdfValidated = validateAndBuildKey(file, "echoes", "document")
    if (!pdfValidated.ok) {
      return adminJsonResponse({ error: pdfValidated.error }, { status: 400 })
    }
    const filePath = await uploadFile(file, pdfValidated.storageKey, pdfValidated.contentType)

    let thumbnailPath = null
    if (thumbnail && thumbnail.size > 0) {
      const thumbValidated = validateAndBuildKey(thumbnail, "echoes/thumbs", "image")
      if (!thumbValidated.ok) {
        return adminJsonResponse({ error: thumbValidated.error }, { status: 400 })
      }
      thumbnailPath = await uploadFile(thumbnail, thumbValidated.storageKey, thumbValidated.contentType)
    } else if (thumbnailPathInput) {
      thumbnailPath = thumbnailPathInput
    }

    const result = await db.insert(echoes).values({
      title,
      edition,
      description,
      releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
      filePath,
      thumbnailPath,
    })

    return adminJsonResponse({ id: result[0].insertId, title, filePath }, { status: 201 })
  } catch (error) {
    console.error("Echoes POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
