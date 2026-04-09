import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/config';

export async function GET() {
  // Returns local config. In the future, this can be fetched from a 'settings' table in the DB.
  return NextResponse.json(siteConfig);
}
