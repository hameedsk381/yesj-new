import { NextResponse } from 'next/server';
import { getAboutPage, STRAPI_URL } from '@/lib/strapi';

export async function GET() {
  try {
    if (STRAPI_URL && process.env.STRAPI_API_TOKEN) {
      const about = await getAboutPage();
      if (about) {
        return NextResponse.json(about);
      }
    }
    return NextResponse.json({ error: 'No about page data' }, { status: 404 });
  } catch (error) {
    console.error('About Page API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch about page' }, { status: 500 });
  }
}
