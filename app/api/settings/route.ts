import { NextResponse } from 'next/server';
import { getSiteSettings, STRAPI_URL } from '@/lib/strapi';
import { siteConfig } from '@/lib/config';

export async function GET() {
  try {
    if (STRAPI_URL && process.env.STRAPI_API_TOKEN) {
      const settings = await getSiteSettings();
      if (settings) {
        // Merge with local config
        return NextResponse.json({
          ...siteConfig,
          name: settings.siteName || siteConfig.name,
          description: settings.siteDescription || siteConfig.description,
          social: {
             ...siteConfig.social,
             instagram: settings.instagram || siteConfig.social.instagram,
             facebook: settings.facebook || siteConfig.social.facebook,
             twitter: settings.twitter || siteConfig.social.twitter,
             youtube: settings.youtube || siteConfig.social.youtube,
             linkedin: settings.linkedin || siteConfig.social.linkedin,
          },
          contact: {
            ...siteConfig.contact,
            email: settings.email || siteConfig.contact.email,
            phone: settings.phone || siteConfig.contact.phone,
            whatsapp: settings.whatsapp || siteConfig.contact.whatsapp,
          }
        });
      }
    }
    return NextResponse.json(siteConfig);
  } catch (error) {
    console.error('Site Settings API Error:', error);
    return NextResponse.json(siteConfig);
  }
}
