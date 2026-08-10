import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbGet, dbRun } from '@/lib/db';
import { getStudentToken, verifyStudentToken } from '@/lib/course-auth';
import { getExam } from '@/lib/course-exams';
import { EXAM_PASS_SCORE } from '@/lib/course-lessons';
import { COURSE_MODULES } from '@/lib/course-data';

// GET /api/course/exam?module=module-01 → exam questions for a module
// POST /api/course/exam { module, answers: [idx, idx, ...] } → grade + save + unlock state
export async function GET(req: NextRequest) {
  const token = getStudentToken(req);
  if (!token) return NextResponse.json({ error: 'Login ဝင်ပါ' }, { status: 401 });
  const payload = verifyStudentToken(token);
  if (!payload) return NextResponse.json({ error: 'Session သက်တမ်းကုန်ပါပြီ' }, { status: 401 });

  const rows = await dbAll('SELECT status FROM students WHERE email = ?', [payload.email]);
  if (rows.length === 0 || (rows[0] as any).status !== 'active') {
    return NextResponse.json({ error: 'အကောင့် အသက်မဝင်သေးပါ' }, { status: 403 });
  }

  const moduleId = req.nextUrl.searchParams.get('module') || '';
  const exam = getExam(moduleId);
  if (!exam) return NextResponse.json({ error: 'Exam မတွေ့ပါ' }, { status: 404 });

  // Check the module is unlocked (previous exam passed)
  const unlocked = await isModuleUnlocked(payload.email, moduleId);
  if (!unlocked) {
    const prev = getPrevModuleId(moduleId);
    return NextResponse.json(
      { error: 'ဒီ Module ကို မဖွင့်ရသေးပါ — အရင် Module ရဲ့ Exam ကို အရင်အောင်ပါ', lockedBy: prev },
      { status: 403 }
    );
  }

  const prior = await dbGet('SELECT score, passed, best_score, attempts FROM exam_results WHERE email = ? AND module_id = ?', [payload.email, moduleId]);
  return NextResponse.json({
    success: true,
    exam: {
      moduleId: exam.moduleId,
      title: exam.title,
      passScore: EXAM_PASS_SCORE,
      questions: exam.questions.map((q) => ({ q: q.q, options: q.options })),
    },
    prior: prior || null,
  });
}

export async function POST(req: NextRequest) {
  const token = getStudentToken(req);
  if (!token) return NextResponse.json({ error: 'Login ဝင်ပါ' }, { status: 401 });
  const payload = verifyStudentToken(token);
  if (!payload) return NextResponse.json({ error: 'Session သက်တမ်းကုန်ပါပြီ' }, { status: 401 });

  const rows = await dbAll('SELECT status FROM students WHERE email = ?', [payload.email]);
  if (rows.length === 0 || (rows[0] as any).status !== 'active') {
    return NextResponse.json({ error: 'အကောင့် အသက်မဝင်သေးပါ' }, { status: 403 });
  }

  let body: any = {};
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid body' }, { status: 400 }); }

  const { module, answers } = body;
  const exam = getExam(module);
  if (!exam) return NextResponse.json({ error: 'Exam မတွေ့ပါ' }, { status: 404 });
  if (!Array.isArray(answers) || answers.length !== exam.questions.length) {
    return NextResponse.json({ error: 'အဖြေအားလုံး ဖြေပါ' }, { status: 400 });
  }

  const unlocked = await isModuleUnlocked(payload.email, module);
  if (!unlocked) {
    return NextResponse.json({ error: 'ဒီ Module ကို မဖွင့်ရသေးပါ' }, { status: 403 });
  }

  // Grade
  let correct = 0;
  const results = exam.questions.map((q, i) => {
    const chosen = Number(answers[i]);
    const isCorrect = chosen === q.answer;
    if (isCorrect) correct++;
    return { q: q.q, chosen, correct: isCorrect, explain: q.explain };
  });
  const score = Math.round((correct / exam.questions.length) * 100);
  const passed = score >= EXAM_PASS_SCORE ? 1 : 0;

  // Save (keep best score, count attempts)
  const prior = await dbGet('SELECT best_score, attempts FROM exam_results WHERE email = ? AND module_id = ?', [payload.email, module]);
  const attempts = (prior?.attempts as number || 0) + 1;
  const best = Math.max(prior?.best_score as number || 0, score);
  await dbRun(
    `INSERT INTO exam_results (email, module_id, score, passed, attempts, best_score, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(email, module_id) DO UPDATE SET
       score = excluded.score,
       passed = MAX(exam_results.passed, excluded.passed),
       attempts = excluded.attempts,
       best_score = excluded.best_score,
       updated_at = excluded.updated_at`,
    [payload.email, module, score, passed, attempts, best]
  );

  // After this module, which module becomes newly unlocked?
  const nextModule = getNextModuleId(module);
  let nextUnlocked = false;
  if (nextModule && passed) {
    nextUnlocked = true;
  }

  return NextResponse.json({
    success: true,
    score,
    passed: passed === 1,
    correct,
    total: exam.questions.length,
    passScore: EXAM_PASS_SCORE,
    best,
    attempts,
    results,
    nextModule,
    nextUnlocked,
  });
}

// Helpers — module progression gating
export function getPrevModuleId(moduleId: string): string | null {
  const idx = COURSE_MODULES.findIndex((m) => m.id === moduleId);
  if (idx <= 0) return null; // module-01 + extras have no prerequisite
  return COURSE_MODULES[idx - 1].id;
}

export function getNextModuleId(moduleId: string): string | null {
  const idx = COURSE_MODULES.findIndex((m) => m.id === moduleId);
  if (idx < 0 || idx >= COURSE_MODULES.length - 1) return null;
  return COURSE_MODULES[idx + 1].id;
}

// A module is unlocked when: it's module-01 (or an extra like welcome), OR the
// previous module's exam has been passed.
export async function isModuleUnlocked(email: string, moduleId: string): Promise<boolean> {
  const idx = COURSE_MODULES.findIndex((m) => m.id === moduleId);
  if (idx <= 0) return true; // module-01, welcome, wrapup → always open
  const prevId = COURSE_MODULES[idx - 1].id;
  const row = await dbGet('SELECT passed FROM exam_results WHERE email = ? AND module_id = ?', [email, prevId]);
  return !!row && (row.passed as number) === 1;
}

// Full progress map for dashboard: { moduleId: { score, passed, best, attempts } }
export async function getStudentProgress(email: string) {
  const rows = await dbAll('SELECT module_id, score, passed, best_score, attempts FROM exam_results WHERE email = ?', [email]);
  const map: Record<string, { score: number; passed: number; best: number; attempts: number }> = {};
  for (const r of rows as any[]) {
    map[r.module_id] = { score: r.score, passed: r.passed, best: r.best_score, attempts: r.attempts };
  }
  // Build unlock map for all modules
  const unlocks: Record<string, boolean> = {};
  for (const m of COURSE_MODULES) {
    unlocks[m.id] = await isModuleUnlocked(email, m.id);
  }
  const passedCount = (rows as any[]).filter((r) => r.passed === 1).length;
  return { exams: map, unlocks, passedCount, totalModules: COURSE_MODULES.length };
}
