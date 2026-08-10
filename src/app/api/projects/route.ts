import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../admin/auth-guard';
import { CACHE_HEADERS } from '@/lib/cache';

export async function GET(): Promise<NextResponse> {
  const rows = await dbAll('SELECT * FROM projects ORDER BY sort_order');
  return NextResponse.json({ projects: rows.map(r => ({...r, tags: parseJson(r.tags), featured: !!r.featured})) }, { headers: CACHE_HEADERS });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    const body = await req.json();
    if (!body.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    const id = body.id || uuid();
    const tags = Array.isArray(body.tags) ? JSON.stringify(body.tags) : (typeof body.tags === 'string' ? body.tags : '[]');
    const featured = body.featured ? 1 : 0;
    await dbRun('INSERT OR REPLACE INTO projects (id,title,url,client,description,tags,image,featured,sort_order) VALUES (?,?,?,?,?,?,?,?,?)',
      [id, body.title, body.url || '', body.client || '', body.description || '', tags, body.image||'', featured, body.sort_order||0]);
    return NextResponse.json({ success: true, id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const { id } = await req.json();
  await dbRun('DELETE FROM projects WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}

function parseJson(v: any) { try { return JSON.parse(v); } catch { return []; } }
