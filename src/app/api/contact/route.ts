import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../admin/auth-guard';
import { notifyLead } from '@/lib/notify';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await dbRun(
      'INSERT INTO contacts (id, name, email, phone, service, message) VALUES (?,?,?,?,?,?)',
      [uuid(), body.name || 'Anonymous', body.email || '', body.phone || '', body.service || '', body.message || '']
    );
    // Deliver direct contact-form submissions to the owner on Telegram.
    notifyLead({
      name: body.name || 'Anonymous',
      email: body.email || '',
      phone: body.phone || '',
      website_type: body.service || '',
      details: (body.message || '').slice(0, 400),
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
