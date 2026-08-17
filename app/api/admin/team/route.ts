import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { teamMembers } from "@/lib/db/schema"
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
        like(teamMembers.name, `%${search}%`),
        like(teamMembers.role, `%${search}%`),
        like(teamMembers.bio, `%${search}%`)
      )
    }

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(teamMembers)
    const totalRes = whereClause ? await countQuery.where(whereClause) : await countQuery
    const total = Number(totalRes[0]?.count || 0)

    let query = db
      .select()
      .from(teamMembers)
      .orderBy(desc(teamMembers.createdAt))
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
    console.error("Team GET error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const contentType = req.headers.get("content-type") || ""
    let name: string, role: string, bio: string, twitterUrl: string, linkedinUrl: string
    let imagePath: string | null = null

    if (contentType.includes("application/json")) {
      const body = await req.json()
      name = body.name
      role = body.role
      bio = body.bio || ""
      twitterUrl = body.twitterUrl || ""
      linkedinUrl = body.linkedinUrl || ""
      imagePath = body.imagePath || null
    } else {
      const formData = await req.formData()
      name = formData.get("name") as string
      role = formData.get("role") as string
      bio = formData.get("bio") as string
      twitterUrl = formData.get("twitterUrl") as string
      linkedinUrl = formData.get("linkedinUrl") as string
      const image = formData.get("image") as File

      if (image && image.size > 0) {
        const validated = validateAndBuildKey(image, "team", "image")
        if (!validated.ok) {
          return adminJsonResponse({ error: validated.error }, { status: 400 })
        }
        imagePath = await uploadFile(image, validated.storageKey, validated.contentType)
      }
    }

    const result = await db.insert(teamMembers).values({
      name,
      role,
      bio,
      imagePath,
      twitterUrl,
      linkedinUrl,
    })

    return adminJsonResponse({ id: result[0].insertId, name, role, imagePath }, { status: 201 })
  } catch (error) {
    console.error("Team POST error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}
