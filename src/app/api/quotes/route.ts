import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../admin/auth-guard';
import { notifyLead } from '@/lib/notify';
import { guardForm } from '@/lib/form-guard';

// POST — public submission from get-quote page
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guard = guardForm(req, body, ['name', 'email', 'message']);
    if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });
    const c = guard.body;
    const id = uuid();
    await dbRun(
      'INSERT INTO quotes (id, name, email, phone, service, budget, timeline, message) VALUES (?,?,?,?,?,?,?,?)',
      [id, c.name || 'Anonymous', c.email || '', c.phone || '', c.service || '', c.budget || '', c.timeline || '', c.message || '']
    );
    // Notify via Telegram
    notifyLead({
      name: c.name || 'Anonymous',
      email: c.email || '',
      phone: c.phone || '',
      website_type: c.service || '',
      details: `Budget: ${c.budget || 'N/A'} | Timeline: ${c.timeline || 'N/A'} | ${c.message || ''}`.slice(0, 400),
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
