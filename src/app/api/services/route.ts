import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../admin/auth-guard';
import { CACHE_HEADERS } from '@/lib/cache';

export async function GET(): Promise<NextResponse> {
  const rows = await dbAll('SELECT * FROM services ORDER BY sort_order');
  return NextResponse.json({ services: rows.map(r => ({...r, features: parseJson(r.features)})) }, { headers: CACHE_HEADERS });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  if (!body.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  const id = body.id || uuid();
  await dbRun('INSERT OR REPLACE INTO services (id,title,price,description,features,icon,image,sort_order) VALUES (?,?,?,?,?,?,?,?)',
    [id, body.title, body.price || '', body.description || '', JSON.stringify(body.features||[]), body.icon||'🌐', body.image||'', body.sort_order||0]);
  return NextResponse.json({ success: true, id });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const { id } = await req.json();
  await dbRun('DELETE FROM services WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}

function parseJson(v: any) { try { return JSON.parse(v); } catch { return []; } }
