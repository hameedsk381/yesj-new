import { NextResponse } from 'next/server';
import { homepageData } from '@/lib/data/site-content';

export async function GET() {
  return NextResponse.json(homepageData);
}
