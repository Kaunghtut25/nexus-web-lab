import { NextRequest, NextResponse } from 'next/server';
import { dbAll } from '@/lib/db';
import { getStudentToken, verifyStudentToken } from '@/lib/course-auth';
import { COURSE_FILE_MAP } from '@/lib/course-data';
import path from 'path';
import fs from 'fs';

// Authenticated file streaming — only paid & active students can download
export async function GET(req: NextRequest) {
  // 1) Auth check (cookie)
  const token = getStudentToken(req);
  if (!token) {
    return NextResponse.json({ error: 'Login ဝင်ပါ' }, { status: 401 });
  }
  const payload = verifyStudentToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Session သက်တမ်းကုန်ပါပြီ — ပြန် Login လုပ်ပါ' }, { status: 401 });
  }
  const rows = await dbAll('SELECT status FROM students WHERE email = ?', [payload.email]);
  if (rows.length === 0 || (rows[0] as any).status !== 'active') {
    return NextResponse.json({ error: 'အကောင့် အသက်မဝင်သေးပါ' }, { status: 403 });
  }

  // 2) Whitelist check — only known course files
  const name = req.nextUrl.searchParams.get('f');
  if (!name || !COURSE_FILE_MAP[name]) {
    return NextResponse.json({ error: 'File မတွေ့ပါ' }, { status: 404 });
  }
  const rel = COURSE_FILE_MAP[name];
  const filePath = path.join(process.cwd(), rel);

  try {
    const buf = fs.readFileSync(filePath);
    const isPdf = name.endsWith('.pdf');
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        'Content-Type': isPdf
          ? 'application/pdf'
          : 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': isPdf
          ? `inline; filename="${name}"`
          : `attachment; filename="${name}"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'File ဖတ်လို့မရပါ' }, { status: 404 });
  }
}
