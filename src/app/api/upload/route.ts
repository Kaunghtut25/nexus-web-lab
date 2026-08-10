import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbGet, dbRun } from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../admin/auth-guard';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const id = uuid();
  const mime = file.type || 'image/jpeg';
  const dataUri = `data:${mime};base64,${buffer.toString('base64')}`;
  await dbRun('INSERT INTO uploads (id, data, mime, name) VALUES (?,?,?,?)', [id, dataUri, mime, file.name]);
  return NextResponse.json({ url: `/api/upload?id=${id}`, id });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  // No id → list all uploads (admin only)
  if (!id) {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    const rows = await dbAll('SELECT id, name, mime, created_at FROM uploads ORDER BY created_at DESC');
    return NextResponse.json({ uploads: rows });
  }
  const upload = await dbGet('SELECT * FROM uploads WHERE id = ?', [id]);
  if (!upload) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return new NextResponse(upload.data as string, {
    headers: { 'Content-Type': upload.mime as string || 'image/jpeg', 'Cache-Control': 'public, max-age=31536000' },
  });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await dbRun('DELETE FROM uploads WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
