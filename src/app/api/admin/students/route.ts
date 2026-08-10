import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { requireAuth } from '@/app/api/admin/auth-guard';

// Admin only — manage students (list / activate / block / reset password)
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const rows = await dbAll('SELECT id, name, email, status, created_at FROM students ORDER BY created_at DESC');
  return NextResponse.json({ students: rows });
}

export async function PATCH(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { id, status, password } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  if (status) {
    if (!['active', 'blocked', 'pending'].includes(status)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    await dbRun('UPDATE students SET status = ? WHERE id = ?', [status, id]);
  }
  if (password !== undefined) {
    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password က အနည်းဆုံး ၆ လုံး ရှိရပါမယ်' }, { status: 400 });
    }
    const passwordHash = await hashPassword(password);
    await dbRun('UPDATE students SET password_hash = ? WHERE id = ?', [passwordHash, id]);
  }
  return NextResponse.json({ success: true, id, status });
}
