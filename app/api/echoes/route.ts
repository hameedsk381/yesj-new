import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { echoes } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const list = await db.query.echoes.findMany({
      orderBy: [desc(echoes.createdAt)],
    });

    return NextResponse.json(list);
  } catch (error) {
    console.error("Failed to fetch echoes:", error);
    return NextResponse.json({ error: "Failed to fetch echoes" }, { status: 500 });
  }
}
