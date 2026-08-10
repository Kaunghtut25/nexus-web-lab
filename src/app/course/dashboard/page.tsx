import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyStudentToken } from "@/lib/course-auth";
import { dbAll } from "@/lib/db";
import { COURSE_MODULES, COURSE_EXTRAS } from "@/lib/course-data";
import { getStudentProgress } from "@/app/api/course/exam/route";
import LogoutButton from "../logout-button";

export const metadata = { title: "Dashboard — Nexus AI Freelance Mastery" };

export default async function CourseDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("student_token")?.value;

  let student: any = null;
  if (token) {
    const payload = verifyStudentToken(token);
    if (payload) {
      const rows = await dbAll("SELECT name, email, status FROM students WHERE email = ?", [payload.email]);
      if (rows.length > 0 && (rows[0] as any).status === "active") {
        student = rows[0];
      }
    }
  }
  if (!student) redirect("/course/login");

  // Exam progress + unlocks
  const progress = await getStudentProgress(student.email);
  const level = progress.passedCount + 1; // Level = passed exams + 1
  const done = COURSE_MODULES.length + COURSE_EXTRAS.length;

  return (
    <main className="mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Welcome bar */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-[#F5A623]">🎓 Nexus AI Freelance Mastery</div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy mt-1">
              မင်္ဂလာပါ, {student.name}! 👋
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Module ၁၃ ခု — သင်ခန်းစာလေ့လာပြီး Exam ဖြေကာ Level Up လုပ်ပါ။ Exam အောင်မှ နောက် Module ဖွင့်ပါတယ်။
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
              ✅ Active Member
            </span>
            <LogoutButton />
          </div>
        </div>

        {/* Level bar */}
        <div className="mt-6 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F5A623] text-white font-black text-2xl flex items-center justify-center shadow-lg">
              {level}
            </div>
            <div>
              <div className="font-black text-navy text-lg">Level {level}</div>
              <div className="text-xs text-slate-500">Exam {progress.passedCount} ခု အောင်ပြီး</div>
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
              <span>တိုးတက်မှု</span>
              <span>{Math.round((progress.passedCount / progress.totalModules) * 100)}%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F5A623] transition-all"
                style={{ width: `${Math.round((progress.passedCount / progress.totalModules) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Module တစ်ခုစီရဲ့ Exam အောင်တိုင်း Level တက်ပါတယ် 🎮</p>
          </div>
        </div>

        {/* Extras */}
        <h2 className="text-lg font-black text-navy mt-10 mb-4">🎁 အထူး သင်ခန်းစာများ</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {COURSE_EXTRAS.map((e) => {
            const unlocked = progress.unlocks[e.id] ?? true;
            return (
              <Link
                key={e.id}
                href={`/course/module/${e.id}`}
                className="bg-white rounded-2xl border border-dashed border-[#D4AF37] p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-navy text-lg group-hover:text-blue transition">{e.title}</div>
                  <span className="text-xl">{unlocked ? "🔓" : "🔒"}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{e.subtitle}</p>
              </Link>
            );
          })}
        </div>

        {/* Modules */}
        <h2 className="text-lg font-black text-navy mt-8 mb-4">📚 သင်ခန်းစာ Module ၁၃ ခု</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSE_MODULES.map((m) => {
            const unlocked = progress.unlocks[m.id] ?? true;
            const examRes = progress.exams[m.id];
            return (
              <div
                key={m.id}
                className={`rounded-2xl border p-5 shadow-sm transition-all group ${unlocked
                  ? "bg-white border-slate-200 hover:border-[#D4AF37] hover:-translate-y-1 hover:shadow-md"
                  : "bg-slate-50 border-slate-200 opacity-80"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#F5A623] tracking-widest">
                    MODULE {String(m.num).padStart(2, "0")}
                  </span>
                  <span className="text-lg">
                    {!unlocked ? "🔒" : examRes?.passed ? "🏆" : "🎮"}
                  </span>
                </div>
                <h3 className="font-bold text-navy text-lg mt-1.5">{m.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{m.subtitle}</p>

                {/* Exam status */}
                {examRes && (
                  <div className={`mt-3 text-xs font-bold ${examRes.passed ? "text-emerald-600" : "text-amber-600"}`}>
                    {examRes.passed ? `✅ Exam အောင်ပြီး (${examRes.best}%)` : `🎮 Exam: အကောင်းဆုံး ${examRes.best}%`}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue/10 text-blue">📖 PDF</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue/10 text-blue">🖥️ Slides</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">🎮 Exam</span>
                </div>

                {unlocked ? (
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/course/module/${m.id}`}
                      className="flex-1 text-center px-3 py-2 rounded-xl bg-navy text-white text-xs font-bold hover:opacity-90 transition"
                    >
                      📚 သင်ခန်းစာ
                    </Link>
                    <Link
                      href={`/course/exam/${m.id}`}
                      className="flex-1 text-center px-3 py-2 rounded-xl gradient-btn text-xs font-bold"
                    >
                      🎮 Exam
                    </Link>
                  </div>
                ) : (
                  <div className="mt-4 px-3 py-2 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold text-center">
                    🔒 ရှေ့ Module Exam အောင်မှ ဖွင့်ပါမယ်
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support note */}
        <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-6 text-center">
          <p className="text-sm text-slate-500">
            ❓ မေးခွန်းရှိရင် —{" "}
            <a href="mailto:info@nexusweblab.com" className="text-blue font-bold hover:underline">
              info@nexusweblab.com
            </a>{" "}
            (သို့) Viber{" "}
            <a href="viber://chat?number=%2B959945598825" target="_blank" rel="noopener noreferrer" className="text-blue font-bold hover:underline">
              09945598825
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
