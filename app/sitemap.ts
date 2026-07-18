import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { programsData } from '@/lib/data/programs'

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [...routes, ...programRoutes]
}
