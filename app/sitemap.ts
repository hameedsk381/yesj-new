import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { getMergedPrograms } from '@/lib/programs-server'
import { db } from '@/lib/db'
import { courses, stories } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '',
    '/about',
    '/about/team',
    '/mission',
    '/get-involved',
    '/volunteer',
    '/programs',
    '/impact',
    '/stories',
    '/media',
    '/partners',
    '/donate',
    '/contact',
    '/centre-for-excellence',
    '/gallery',
    '/events',
    '/echoes',
    '/courses',
    '/privacy-policy',
    '/terms',
    '/refund-policy',
    '/shipping-policy',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  let programRoutes: MetadataRoute.Sitemap = []
  try {
    const mergedPrograms = await getMergedPrograms()
    programRoutes = mergedPrograms.map((program: { slug: string }) => ({
      url: `${siteConfig.url}/programs/${program.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {}

  let courseRoutes: MetadataRoute.Sitemap = []
  try {
    const activeCourses = await db.select({ slug: courses.slug }).from(courses).where(eq(courses.isActive, true))
    courseRoutes = activeCourses.map((course: { slug: string }) => ({
      url: `${siteConfig.url}/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {}

  let storyRoutes: MetadataRoute.Sitemap = []
  try {
    const allStories = await db.select({ slug: stories.slug }).from(stories)
    storyRoutes = allStories.map((story: { slug: string }) => ({
      url: `${siteConfig.url}/stories/${story.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {}

  return [...routes, ...programRoutes, ...courseRoutes, ...storyRoutes]
}
