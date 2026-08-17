import { unstable_cache } from "next/cache"
import { db } from "@/lib/db"
import { courses, stories, siteSettings } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

/**
 * Cached fetch for active courses with Next.js Data Cache tags
 */
export const getCachedActiveCourses = unstable_cache(
  async () => {
    try {
      return await db.query.courses.findMany({
        where: eq(courses.isActive, true),
        orderBy: [desc(courses.createdAt)],
      })
    } catch (error) {
      console.error("Error in getCachedActiveCourses:", error)
      return []
    }
  },
  ["active-courses"],
  {
    revalidate: 3600, // 1 hour stale-while-revalidate
    tags: ["courses"],
  }
)

/**
 * Cached fetch for published stories with Next.js Data Cache tags
 */
export const getCachedStories = unstable_cache(
  async (limit: number = 10) => {
    try {
      return await db.query.stories.findMany({
        limit,
        orderBy: [desc(stories.createdAt)],
      })
    } catch (error) {
      console.error("Error in getCachedStories:", error)
      return []
    }
  },
  ["recent-stories"],
  {
    revalidate: 1800, // 30 minutes
    tags: ["stories"],
  }
)

/**
 * Cached fetch for site settings with Next.js Data Cache tags
 */
export const getCachedSiteSettings = unstable_cache(
  async () => {
    try {
      return await db.query.siteSettings.findMany()
    } catch (error) {
      console.error("Error in getCachedSiteSettings:", error)
      return []
    }
  },
  ["site-settings"],
  {
    revalidate: 86400, // 24 hours
    tags: ["settings"],
  }
)
