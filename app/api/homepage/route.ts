import { NextResponse } from 'next/server';
import { getHomepage, STRAPI_URL } from '@/lib/strapi';

export async function GET() {
  try {
    if (STRAPI_URL && process.env.STRAPI_API_TOKEN) {
      const homepage = await getHomepage();
      if (homepage) {
        return NextResponse.json(homepage);
      }
    }
    return NextResponse.json({ error: 'No homepage data' }, { status: 404 });
  } catch (error) {
    console.error('Homepage API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch homepage' }, { status: 500 });
  }
}
