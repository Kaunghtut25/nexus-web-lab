import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import crypto from 'crypto';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'နာမည်၊ Email နဲ့ Password အကုန် ဖြည့်ပါ' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Email ပုံစံ မမှန်ပါ — ဥပမာ name@example.com' }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: 'Password က အနည်းဆုံး ၆ လုံး ရှိရပါမယ်' }, { status: 400 });
  }

  const existing = await dbAll('SELECT id FROM students WHERE email = ?', [email.toLowerCase()]);
  if (existing.length > 0) {
    return NextResponse.json({ error: 'ဒီ Email နဲ့ အကောင့် ရှိပြီးသားပါ — Login လုပ်ပါ' }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  await dbRun(
    'INSERT INTO students (id, name, email, password_hash, status) VALUES (?,?,?,?,?)',
    [crypto.randomUUID(), name.trim(), email.toLowerCase(), passwordHash, 'pending']
  );

  return NextResponse.json({
    success: true,
    message: 'စာရင်းသွင်းပြီးပါပြီ! 🎉 ငွေပေးချေပြီးပါက အကောင့်ကို ဖွင့်ပေးပါမည်။ အကောင့်ဖွင့်ပြီးမှသာ သင်တန်းထဲ ဝင်နိုင်ပါမယ်။',
  });
}
