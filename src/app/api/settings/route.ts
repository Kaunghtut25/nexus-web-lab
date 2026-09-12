import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { dbAllRead, dbRun } from '@/lib/db';
import { requireAuth } from '../admin/auth-guard';
import { verifyToken } from '@/lib/jwt';
import { CACHE_HEADERS } from '@/lib/cache';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const rows = await dbAllRead('SELECT * FROM settings');
  const map: Record<string, string> = {};
  for (const s of rows) map[s.key as string] = s.value as string;
  // Contact details are hidden from the PUBLIC settings payload — all leads
  // must flow through the contact form/chatbot. Authenticated admins still
  // receive them so the settings panel can display and edit current values.
  const auth = req.headers.get('authorization') || '';
  const isAdmin = auth.startsWith('Bearer ') && !!verifyToken(auth.slice(7));
  if (!isAdmin) {
    for (const k of ['phone','email','contactPhone','contactPhoneDisplay','contactEmail','address']) {
      delete map[k];
    }
  }
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
  revalidateTag('home-data', 'default');
  return NextResponse.json({ success: true });
}
