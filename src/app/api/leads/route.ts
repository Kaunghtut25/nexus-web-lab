import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../admin/auth-guard';

// GET — list all leads (admin only)
export async function GET(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const rows = await dbAll('SELECT * FROM leads ORDER BY created_at DESC');
  return NextResponse.json({ leads: rows });
}

// DELETE — delete a lead (admin only)
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await dbRun('DELETE FROM leads WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
