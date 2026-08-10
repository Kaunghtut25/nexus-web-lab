import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'nexus-web-lab-secret-key-changeme';
const COOKIE_NAME = 'student_token';

function base64UrlEncode(str: string): string {
  return Buffer.from(str).toString('base64url');
}

function base64UrlDecode(str: string): string {
  return Buffer.from(str, 'base64url').toString();
}

function hmacSha256(data: string, key: string): string {
  const crypto = require('crypto');
  return crypto.createHmac('sha256', key).update(data).digest('base64url');
}

export function createStudentToken(email: string, expiresInSeconds = 604800): string {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const payload = base64UrlEncode(JSON.stringify({
    email,
    role: 'student',
    iat: now,
    exp: now + expiresInSeconds,
  }));
  const signature = hmacSha256(`${header}.${payload}`, JWT_SECRET);
  return `${header}.${payload}.${signature}`;
}

export function verifyStudentToken(token: string): { email: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const expectedSig = hmacSha256(`${parts[0]}.${parts[1]}`, JWT_SECRET);
    if (expectedSig !== parts[2]) return null;
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    if (payload.role !== 'student') return null;
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

export function getStudentToken(req: NextRequest): string | null {
  return req.cookies.get(COOKIE_NAME)?.value || null;
}

export { COOKIE_NAME };
