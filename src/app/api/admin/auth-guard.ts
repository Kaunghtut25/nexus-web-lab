import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function requireAuth(req: NextRequest): Promise<{ username: string } | NextResponse> {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized — no token provided' }, { status: 401 });
  }
  const token = auth.slice(7);
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized — invalid or expired token' }, { status: 401 });
  }
  return user;
}
