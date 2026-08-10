import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../admin/auth-guard';
import { CACHE_HEADERS } from '@/lib/cache';

export async function GET(): Promise<NextResponse> {
  const rows = await dbAll('SELECT * FROM testimonials ORDER BY sort_order');
  return NextResponse.json({ testimonials: rows }, { headers: CACHE_HEADERS });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  if (!body.name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  const id = body.id || uuid();
  await dbRun(
    'INSERT OR REPLACE INTO testimonials (id, name, role, company, content, rating, avatar, logo, sort_order) VALUES (?,?,?,?,?,?,?,?,?)',
    [id, body.name, body.role || '', body.company || '', body.content || '', body.rating || 5, body.avatar || '', body.logo || '', body.sort_order || 0]
  );
  return NextResponse.json({ success: true, id });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const { id } = await req.json();
  await dbRun('DELETE FROM testimonials WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
