export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { aboutPageData } from '@/lib/data/site-content';

export async function GET() {
  return NextResponse.json(aboutPageData);
}
