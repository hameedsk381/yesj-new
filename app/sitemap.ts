import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { programsData } from '@/lib/data/programs'
import { db } from '@/lib/db'
import { courses } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

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

  const programRoutes = programsData.map((program) => ({
    url: `${siteConfig.url}/programs/${program.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  let courseRoutes: MetadataRoute.Sitemap = []
  try {
    const activeCourses = await db.select({ slug: courses.slug }).from(courses).where(eq(courses.isActive, true))
    courseRoutes = activeCourses.map((course) => ({
      url: `${siteConfig.url}/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {}

  return [...routes, ...programRoutes, ...courseRoutes]
}
