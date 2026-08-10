import { NextRequest, NextResponse } from 'next/server';
import { dbAll } from '@/lib/db';
import { getStudentToken, verifyStudentToken } from '@/lib/course-auth';

export async function GET(req: NextRequest) {
  const token = getStudentToken(req);
  if (!token) return NextResponse.json({ user: null });

  const payload = verifyStudentToken(token);
  if (!payload) return NextResponse.json({ user: null });

  const rows = await dbAll('SELECT id, name, email, status, created_at FROM students WHERE email = ?', [payload.email]);
  if (rows.length === 0 || (rows[0] as any).status !== 'active') {
    return NextResponse.json({ user: null });
  }

  const s = rows[0] as any;
  return NextResponse.json({
    user: { id: s.id, name: s.name, email: s.email, status: s.status, created_at: s.created_at },
  });
}
