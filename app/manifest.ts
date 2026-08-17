import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YESJ - Youth Empowering Service Jesuits',
    short_name: 'YESJ',
    description:
      'Official web platform of Youth Empowering Service - Jesuits, empowering youth in Andhra Pradesh and Telangana.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/YESJ_Logo_Black-eaf43d27.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/YESJ_Logo_Black-eaf43d27.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
