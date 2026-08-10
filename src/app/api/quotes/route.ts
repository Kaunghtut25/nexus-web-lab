import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../admin/auth-guard';
import { notifyLead } from '@/lib/notify';

// POST — public submission from get-quote page
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = uuid();
    await dbRun(
      'INSERT INTO quotes (id, name, email, phone, service, budget, timeline, message) VALUES (?,?,?,?,?,?,?,?)',
      [id, body.name || 'Anonymous', body.email || '', body.phone || '', body.service || '', body.budget || '', body.timeline || '', body.message || '']
    );
    // Notify via Telegram
    notifyLead({
      name: body.name || 'Anonymous',
      email: body.email || '',
      phone: body.phone || '',
      website_type: body.service || '',
      details: `Budget: ${body.budget || 'N/A'} | Timeline: ${body.timeline || 'N/A'} | ${body.message || ''}`.slice(0, 400),
      source: 'quote-form',
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}

// GET — admin list
export async function GET(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const rows = await dbAll('SELECT * FROM quotes ORDER BY created_at DESC');
  return NextResponse.json({ quotes: rows });
}

// DELETE — admin delete
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await dbRun('DELETE FROM quotes WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
