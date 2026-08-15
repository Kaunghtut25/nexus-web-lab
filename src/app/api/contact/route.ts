import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../admin/auth-guard';
import { notifyLead } from '@/lib/notify';
import { guardForm } from '@/lib/form-guard';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const guard = guardForm(req, body, ['name', 'email', 'message']);
    if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });
    const c = guard.body;
    await dbRun(
      'INSERT INTO contacts (id, name, email, phone, service, message) VALUES (?,?,?,?,?,?)',
      [uuid(), c.name || 'Anonymous', c.email || '', c.phone || '', c.service || '', c.message || '']
    );
    // Deliver direct contact-form submissions to the owner on Telegram.
    notifyLead({
      name: c.name || 'Anonymous',
      email: c.email || '',
      phone: c.phone || '',
      website_type: c.service || '',
      details: (c.message || '').slice(0, 400),
      source: 'contact-form',
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const rows = await dbAll('SELECT * FROM contacts ORDER BY created_at DESC');
  return NextResponse.json({ contacts: rows });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await dbRun('DELETE FROM contacts WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
