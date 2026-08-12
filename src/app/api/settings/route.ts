import { NextRequest, NextResponse } from 'next/server';
import { dbAllRead, dbRun } from '@/lib/db';
import { requireAuth } from '../admin/auth-guard';
import { CACHE_HEADERS } from '@/lib/cache';

export async function GET(): Promise<NextResponse> {
  const rows = await dbAllRead('SELECT * FROM settings');
  const map: Record<string, string> = {};
  for (const s of rows) map[s.key as string] = s.value as string;
  // Contact details (phone/email) are intentionally excluded from the public
  // settings payload — all leads must flow through the contact form/chatbot.
  delete map['phone'];
  delete map['email'];
  // CDN-cached (300s + SWR): public settings are identical for everyone,
  // so we avoid a Turso round-trip on every single page load.
  return NextResponse.json({ settings: map }, { headers: CACHE_HEADERS });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  for (const [key, value] of Object.entries(body)) {
    await dbRun("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", [key, String(value)]);
  }
  return NextResponse.json({ success: true });
}
