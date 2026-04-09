import { NextResponse } from 'next/server';
import { getPrograms, STRAPI_URL } from '@/lib/strapi';
import { programsData } from '@/lib/data/programs';

export async function GET() {
  try {
    if (STRAPI_URL && process.env.STRAPI_API_TOKEN) {
      try {
        const strapiPrograms = await getPrograms();
        if (strapiPrograms && strapiPrograms.length > 0) {
          return NextResponse.json(strapiPrograms);
        }
      } catch (err) {
        console.warn('Strapi fetch failed for programs, falling back to local data');
      }
    }
    return NextResponse.json(programsData);
  } catch (error) {
    console.error('Programs API Error:', error);
    return NextResponse.json(programsData); // Always fallback to local data
  }
}
