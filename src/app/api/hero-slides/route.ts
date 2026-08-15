import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../admin/auth-guard';
import { CACHE_HEADERS } from '@/lib/cache';

export async function GET(): Promise<NextResponse> {
  const rows = await dbAll('SELECT * FROM hero_slides ORDER BY sort_order');
  return NextResponse.json({ slides: rows }, { headers: CACHE_HEADERS });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  if (!body.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  const id = body.id || uuid();
  // Preserve existing image/subtitle/sort_order when omitted (partial updates),
  // instead of INSERT OR REPLACE wiping them with empty strings.
  await dbRun(
    `INSERT INTO hero_slides (id,title,subtitle,image,sort_order) VALUES (?,?,?,?,?)
     ON CONFLICT(id) DO UPDATE SET
       title=excluded.title,
       subtitle=COALESCE(excluded.subtitle, hero_slides.subtitle),
       image=COALESCE(excluded.image, hero_slides.image),
       sort_order=COALESCE(excluded.sort_order, hero_slides.sort_order)`,
    [id, body.title, body.subtitle ?? null, body.image ?? null, body.sort_order ?? null]);
  return NextResponse.json({ success: true, id });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const { id } = await req.json();
  await dbRun('DELETE FROM hero_slides WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
