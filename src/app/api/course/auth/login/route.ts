import { NextRequest, NextResponse } from 'next/server';
import { dbAll } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';
import { createStudentToken, COOKIE_NAME } from '@/lib/course-auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email နဲ့ Password ဖြည့်ပါ' }, { status: 400 });
  }

  const rows = await dbAll('SELECT * FROM students WHERE email = ?', [email.toLowerCase()]);
  if (rows.length === 0) {
    return NextResponse.json({ error: 'အကောင့် မရှိပါ — အရင်စာရင်းသွင်းပါ' }, { status: 401 });
  }

  const student = rows[0] as any;

  if (student.status === 'pending') {
    return NextResponse.json({ error: 'အကောင့်ကို မဖွင့်ရသေးပါ — ငွေပေးချေပြီးပါက ဆရာက အကောင့်ဖွင့်ပေးပါမည်' }, { status: 403 });
  }
  if (student.status === 'blocked') {
    return NextResponse.json({ error: 'အကောင့် ပိတ်ထားပါသည် — ဆက်သွယ်ပါ' }, { status: 403 });
  }

  const valid = await verifyPassword(password, student.password_hash);
  if (!valid) {
    return NextResponse.json({ error: 'Password မမှန်ပါ' }, { status: 401 });
  }

  const token = createStudentToken(student.email);
  const res = NextResponse.json({
    success: true,
    user: { name: student.name, email: student.email },
  });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 604800, // 7 days
  });
  return res;
}
