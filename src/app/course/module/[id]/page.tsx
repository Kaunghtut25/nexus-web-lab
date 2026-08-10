import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { verifyStudentToken } from "@/lib/course-auth";
import { dbAll } from "@/lib/db";
import { getModule, getExtra, COURSE_MODULES, COURSE_EXTRAS } from "@/lib/course-data";
import { COURSE_LESSONS } from "@/lib/course-lessons";
import { getExam } from "@/lib/course-exams";
import { EXAM_PASS_SCORE } from "@/lib/course-lessons";
import { getPrevModuleId, isModuleUnlocked, getStudentProgress } from "@/app/api/course/exam/route";
import LessonDiagram from "./lesson-diagram";

export const metadata = { title: "Module — Nexus AI Freelance Mastery" };

export default async function CourseModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("student_token")?.value;

  let studentEmail = "";
  let authed = false;
  if (token) {
    const payload = verifyStudentToken(token);
    if (payload) {
      const rows = await dbAll("SELECT name, email, status FROM students WHERE email = ?", [payload.email]);
      if (rows.length > 0 && (rows[0] as any).status === "active") {
        authed = true;
        studentEmail = (rows[0] as any).email;
      }
    }
  }
  if (!authed) redirect("/course/login");

  const mod = getModule(id);
  const extra = getExtra(id);
  if (!mod && !extra) notFound();

  const isModule = !!mod;
  const title = mod?.title || extra?.title || "";
  const subtitle = mod?.subtitle || extra?.subtitle || "";
  const pdf = mod?.pdf || extra?.pdf || "";
  const pptx = mod?.pptx || "";
  const contents = mod?.contents || [];
  const lesson = COURSE_LESSONS[id];
  const exam = getExam(id);

  // Progress + unlock state
  const progress = await getStudentProgress(studentEmail);
  const unlocked = progress.unlocks[id] ?? true;
  const prevId = getPrevModuleId(id);
  const examResult = progress.exams[id];
  const prevExamResult = prevId ? progress.exams[prevId] : null;

  // prev / next navigation (locked-aware)
  const all = [...COURSE_MODULES, ...COURSE_EXTRAS];
  const idx = all.findIndex((x) => x.id === id);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <main className="mesh-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
          <Link href="/course" className="hover:text-blue transition">🎓 သင်တန်း</Link>
          <span>/</span>
          <Link href="/course/dashboard" className="hover:text-blue transition">Dashboard</Link>
          <span>/</span>
          <span className="text-navy font-semibold">{isModule ? `Module ${String(mod!.num).padStart(2, "0")}` : title}</span>
        </div>

        {/* Module header */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {isModule && (
            <span className="inline-block text-xs font-black text-[#F5A623] tracking-widest mb-2">
              MODULE {String(mod!.num).padStart(2, "0")} / 13
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-black text-navy leading-snug">{title}</h1>
          <p className="text-slate-500 mt-2">{subtitle}</p>

          {/* Exam status badge */}
          {exam && (
            <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${examResult?.passed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              {examResult?.passed
                ? `✅ Exam အောင်ပြီးပါပြီ (${examResult.best}%)`
                : examResult
                ? `🎮 Exam ဖြေဖူးပါပြီ — အကောင်းဆုံး ${examResult.best}% (အောင်မှတ် ${EXAM_PASS_SCORE}%)`
                : `🎮 Exam မဖြေရသေးပါ — Level Up ဖို့ ဖြေပါ`}
            </div>
          )}
        </div>

        {/* 🔒 LOCKED — must pass previous exam first */}
        {!unlocked && (
          <div className="mt-6 bg-white rounded-3xl border-2 border-dashed border-amber-300 shadow-sm p-8 text-center">
            <div className="text-5xl mb-3">🔒</div>
            <h2 className="text-xl font-black text-navy">ဒီ Module က မဖွင့်ရသေးပါ</h2>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              Module အဆင့်ဆင့် တက်ရပါတယ် — အရင်ဆုံး{" "}
              <b className="text-navy">{prevId ? prevId.replace("module-", "Module ").toUpperCase() : ""}</b> ရဲ့
              သင်ခန်းစာကို လေ့လာပြီး Exam ဖြေအောင်ရပါမယ်။
            </p>
            {prevId && (
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Link href={`/course/exam/${prevId}`} className="gradient-btn px-6 py-3 rounded-xl text-sm font-bold">
                  🎮 {prevId.replace("module-", "Module ").toUpperCase()} Exam ဖြေမယ်
                </Link>
                <Link href={`/course/module/${prevId}`} className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:text-blue transition">
                  📚 {prevId.replace("module-", "Module ").toUpperCase()} သင်ခန်းစာ
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 📖 SELF-EXPLANATORY LESSON */}
        {unlocked && lesson && (
          <div className="mt-6 space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="font-black text-navy text-lg mb-4">🎯 ဒီ Module ကနေ ဘာတွေ ရမလဲ</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {lesson.learn.map((l, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-[#F5A623] font-black shrink-0">★</span>
                    <p className="text-slate-600 text-sm">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps with signal arrows */}
            {lesson.steps.map((step, i) => (
              <div key={i}>
                {/* Signal arrow between steps */}
                {i > 0 && (
                  <div className="flex justify-center py-1" aria-hidden>
                    <div className="text-2xl text-[#F5A623] font-black animate-bounce">↓</div>
                  </div>
                )}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F5A623] text-white font-black flex items-center justify-center shadow-md shrink-0">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-black text-navy">{step.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{step.body}</p>

                  {step.diagram && (
                    <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-3 overflow-x-auto">
                      <LessonDiagram type={step.diagram} />
                    </div>
                  )}

                  {step.example && (
                    <div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                      <div className="text-xs font-black text-emerald-700 mb-1">✅ ဥပမာ</div>
                      <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">{step.example}</pre>
                    </div>
                  )}

                  {step.tip && (
                    <div className="mt-3 rounded-2xl bg-blue-50 border border-blue-100 p-3 text-sm text-slate-600">
                      {step.tip}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/40 shadow-sm p-6 sm:p-8">
              <h3 className="font-black text-navy text-lg mb-3">📌 အဓိက အချက် ၃ ချက်</h3>
              <div className="space-y-2">
                {lesson.summary.map((s, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-emerald-500 font-black shrink-0">✅</span>
                    <p className="text-slate-600 text-sm">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Downloads (PDF / Slides) */}
        {unlocked && (
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <a
              href={`/api/course/file?f=${encodeURIComponent(pdf)}`}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue hover:-translate-y-1 transition-all flex items-center gap-4"
            >
              <span className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl shrink-0">📖</span>
              <div>
                <div className="font-bold text-navy">Lesson Notes (PDF)</div>
                <div className="text-xs text-slate-400">ဖတ်ရန် / Download လုပ်ရန် နှိပ်ပါ</div>
              </div>
            </a>
            {pptx && (
              <a
                href={`/api/course/file?f=${encodeURIComponent(pptx)}`}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-[#F5A623] hover:-translate-y-1 transition-all flex items-center gap-4"
              >
                <span className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl shrink-0">🖥️</span>
                <div>
                  <div className="font-bold text-navy">Slides (PPTX)</div>
                  <div className="text-xs text-slate-400">Presentation ၁၀ ခုခန့် — Download လုပ်ရန်</div>
                </div>
              </a>
            )}
          </div>
        )}

        {/* Contents */}
        {unlocked && contents.length > 0 && (
          <div className="mt-6 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="font-black text-navy text-lg mb-4">📌 ဒီ Module ထဲမှာ ပါဝင်တဲ့အရာ</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {contents.map((c) => (
                <div key={c} className="flex gap-3 items-start">
                  <span className="text-emerald-500 font-black shrink-0">✅</span>
                  <p className="text-slate-600">{c}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🎮 EXAM — level up to next module */}
        {unlocked && exam && (
          <div className="mt-6 bg-white rounded-3xl border-2 border-[#F5A623]/50 shadow-sm p-6 sm:p-8 text-center">
            <div className="text-4xl mb-2">🎮</div>
            <h2 className="text-xl font-black text-navy">Exam Game — Level Up!</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">
              မေးခွန်း {exam.questions.length} ခု ဖြေပြီး အောင်မှတ် {EXAM_PASS_SCORE}% ရရင် နောက် Module ဖွင့်ပါမယ်။
              {examResult?.passed ? " သင်က အောင်ပြီးသားမို့ ပြန်ဖြေပြီး ရမှတ် မြှင့်လို့ရပါတယ်။" : ""}
            </p>
            {prevExamResult && !examResult?.passed && !prevExamResult?.passed && (
              <p className="text-xs text-amber-600 mt-2">⚠️ အရင် Module exam ကို အရင်အောင်မှ ဒီ exam ဖြေလို့ရပါမယ်။</p>
            )}
            <Link href={`/course/exam/${id}`} className="gradient-btn inline-block mt-5 px-8 py-3 rounded-xl text-sm font-bold">
              {examResult?.passed ? "🔄 Exam ပြန်ဖြေမယ်" : "🚀 Exam စဖြေမယ်"}
            </Link>
          </div>
        )}

        {/* Prev / Next */}
        <div className="mt-8 flex flex-wrap justify-between gap-3">
          {prev ? (
            <Link href={`/course/module/${prev.id}`} className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:text-blue hover:border-blue transition">
              ← {prev.title}
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/course/module/${next.id}`} className="px-5 py-3 rounded-xl gradient-btn text-sm font-bold">
              {next.title} →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
