import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { verifyPassword, hashPassword } from '@/lib/auth';
import { createToken } from '@/lib/jwt';
import crypto from 'crypto';

// Brute-force protection: in-memory sliding window per IP (per process).
// Good enough for a serverless function and far better than nothing.
const AUTH_WINDOW_MS = 10 * 60 * 1000;
const AUTH_MAX_ATTEMPTS = 10;
const authHits = new Map<string, { count: number; resetAt: number }>();
function authRateLimited(req: NextRequest): boolean {
  const fwd = req.headers.get('x-forwarded-for');
  const ip = (fwd ? fwd.split(',')[0].trim() : req.headers.get('x-real-ip')) || 'unknown';
  const now = Date.now();
  const e = authHits.get(ip);
  if (!e || e.resetAt < now) {
    authHits.set(ip, { count: 1, resetAt: now + AUTH_WINDOW_MS });
    return false;
  }
  e.count += 1;
  return e.count > AUTH_MAX_ATTEMPTS;
}

function sha256(pw: string): string {
  return crypto.createHash('sha256').update(pw).digest('hex');
}

export async function POST(req: NextRequest) {
  if (authRateLimited(req)) {
    return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
  }
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
  }
  const rows = await dbAll('SELECT * FROM admins WHERE username = ?', [username]);
  if (rows.length === 0) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const admin = rows[0] as any;
  const hash = admin.password_hash as string;

  // Try scrypt first (new), then SHA256 (legacy), then plaintext (migrate)
  let valid = false;
  if (hash.includes(':')) {
    valid = await verifyPassword(password, hash);
  } else if (hash.length === 64) {
    valid = sha256(password) === hash;
  } else {
    valid = (password === hash);
  }

  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Migrate legacy hash to scrypt
  if (!hash.includes(':')) {
    const newHash = await hashPassword(password);
    await dbRun('UPDATE admins SET password_hash = ? WHERE id = ?', [newHash, admin.id]);
  }

  const token = createToken(username, 86400);
  return NextResponse.json({ token, user: { username, role: 'admin' } });
}
