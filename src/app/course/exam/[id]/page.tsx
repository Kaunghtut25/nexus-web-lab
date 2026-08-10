"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Question {
  q: string;
  options: string[];
}

interface ExamData {
  moduleId: string;
  title: string;
  passScore: number;
  questions: Question[];
}

export default function CourseExamPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const moduleId = params.id || "";

  const [exam, setExam] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lockedBy, setLockedBy] = useState("");

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [result, setResult] = useState<null | {
    score: number;
    passed: boolean;
    correct: number;
    total: number;
    passScore: number;
    best: number;
    attempts: number;
    results: { q: string; correct: boolean; explain: string }[];
    nextModule: string | null;
  }>(null);
  const [showReview, setShowReview] = useState(false);

  const loadExam = useCallback(async () => {
    try {
      const res = await fetch(`/api/course/exam?module=${moduleId}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Exam ဖွင့်လို့မရပါ");
        if (data.lockedBy) setLockedBy(data.lockedBy);
        return;
      }
      setExam(data.exam);
      if (data.prior?.passed) {
        // already passed — allow retry for better score
      }
    } catch {
      setError("Network error — ပြန်ကြိုးစားပါ");
    } finally {
      setLoading(false);
    }
  }, [moduleId]);

  useEffect(() => {
    loadExam();
  }, [loadExam]);

  const submit = async () => {
    if (!exam || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/course/exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module: moduleId, answers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "တင်သွင်း၍မရပါ");
        setSubmitting(false);
        return;
      }
      setResult(data);
    } catch {
      setError("Network error — ပြန်ကြိုးစားပါ");
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setResult(null);
    setShowReview(false);
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
  };

  // ---- Loading / Error states ----
  if (loading) {
    return (
      <main className="mesh-bg min-h-screen flex items-center justify-center">
        <div className="text-navy font-bold text-lg">Exam ဖွင့်နေပါသည်…</div>
      </main>
    );
  }

  if (error || !exam) {
    return (
      <main className="mesh-bg min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-3">{lockedBy ? "🔒" : "⚠️"}</div>
          <h1 className="text-xl font-black text-navy">{lockedBy ? "Module မဖွင့်ရသေးပါ" : "Exam မတွေ့ပါ"}</h1>
          <p className="text-sm text-slate-500 mt-2">{error}</p>
          {lockedBy && (
            <p className="text-sm text-slate-500 mt-1">
              အရင်ဆုံး {lockedBy.replace("module-", "Module ").toUpperCase()} ရဲ့ Exam ကို အောင်ပြီးမှ ဒီ Module ကို ဖွင့်နိုင်ပါမယ်။
            </p>
          )}
          <div className="flex gap-3 justify-center mt-6">
            {lockedBy && (
              <Link href={`/course/exam/${lockedBy}`} className="gradient-btn px-5 py-2.5 rounded-xl text-sm font-bold">
                🎮 ရှေ့ Exam ဖြေမယ်
              </Link>
            )}
            <Link href="/course/dashboard" className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:text-blue transition">
              ← Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ---- Result screen ----
  if (result) {
    return (
      <main className="mesh-bg min-h-screen py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-3xl shadow-lg p-8 text-center text-white ${result.passed ? "bg-gradient-to-br from-emerald-500 to-green-600" : "bg-gradient-to-br from-rose-500 to-red-600"}`}>
            <div className="text-6xl mb-2">{result.passed ? "🎉" : "😅"}</div>
            <h1 className="text-2xl font-black">
              {result.passed ? "Level Up! အောင်မြင်ပါပြီ!" : "ကံမကောင်းပါ — ထပ်ကြိုးစားပါ"}
            </h1>
            <p className="mt-2 opacity-90">သင့်ရမှတ် — {result.score}% ({result.correct}/{result.total})</p>
            <p className="text-sm mt-1 opacity-80">အောင်မှတ် — {result.passScore}% | အကောင်းဆုံး — {result.best}% | အကြိမ် — {result.attempts}</p>
          </div>

          {/* Level-up unlock message */}
          {result.passed && result.nextModule && (
            <div className="mt-4 bg-white rounded-2xl border-2 border-dashed border-emerald-300 p-5 text-center">
              <div className="text-2xl mb-1">🔓</div>
              <p className="font-bold text-navy">နောက် Module အသစ် ဖွင့်လိုက်ပါပြီ!</p>
              <p className="text-sm text-slate-500 mt-1">{result.nextModule.replace("module-", "Module ").toUpperCase()} ကို အခု သွားလို့ရပါပြီ</p>
              <Link href={`/course/module/${result.nextModule}`} className="gradient-btn inline-block mt-4 px-6 py-2.5 rounded-xl text-sm font-bold">
                {result.nextModule.replace("module-", "Module ").toUpperCase()} သွားမယ် →
              </Link>
            </div>
          )}

          {/* Review answers */}
          <button
            onClick={() => setShowReview(!showReview)}
            className="mt-4 w-full px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-navy hover:border-blue transition"
          >
            {showReview ? "အဖြေမှန်များ ဝှက်မယ်" : "📝 အဖြေမှန်များ ကြည့်မယ်"}
          </button>
          {showReview && (
            <div className="mt-3 space-y-3">
              {result.results.map((r, i) => (
                <div key={i} className={`bg-white rounded-2xl border p-4 ${r.correct ? "border-emerald-200" : "border-rose-200"}`}>
                  <p className="font-bold text-navy text-sm">
                    {i + 1}. {r.q}
                  </p>
                  <p className={`text-sm mt-1 ${r.correct ? "text-emerald-600" : "text-rose-500"}`}>
                    {r.correct ? "✅ မှန်ပါတယ်" : "❌ မှားပါတယ်"}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">💡 {r.explain}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 justify-center mt-6">
            <button onClick={restart} className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:text-blue transition">
              🔄 ပြန်ဖြေမယ်
            </button>
            <Link href="/course/dashboard" className="px-5 py-2.5 rounded-xl gradient-btn text-sm font-bold">
              Dashboard →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ---- Quiz screen ----
  const q = exam.questions[current];
  return (
    <main className="mesh-bg min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between text-sm font-bold text-navy mb-2">
          <span>🎮 {exam.title} — Exam Game</span>
          <span>{current + 1} / {exam.questions.length}</span>
        </div>
        <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F5A623] transition-all"
            style={{ width: `${((current + (selected !== null ? 1 : 0)) / exam.questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="text-xs font-black text-[#F5A623] tracking-widest mb-2">မေးခွန်း {current + 1}</div>
          <h1 className="text-lg sm:text-xl font-black text-navy">{q.q}</h1>

          <div className="mt-5 space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all text-sm sm:text-base font-semibold ${
                  selected === i
                    ? "border-[#F5A623] bg-amber-50 text-navy shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue/50"
                }`}
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-xs font-black text-navy mr-2">
                  {["A", "B", "C", "D"][i]}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {current > 0 && (
            <button
              onClick={() => { setCurrent(current - 1); setSelected(answers[current - 1] ?? null); }}
              className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:text-blue transition"
            >
              ← နောက်မေးခွန်း
            </button>
          )}
          {current < exam.questions.length - 1 ? (
            <button
              disabled={selected === null}
              onClick={() => { const next = [...answers]; next[current] = selected!; setAnswers(next); setCurrent(current + 1); setSelected(null); }}
              className="flex-1 gradient-btn py-3 rounded-xl text-sm font-bold disabled:opacity-40"
            >
              နောက်မေးခွန်း →
            </button>
          ) : (
            <button
              disabled={selected === null || submitting}
              onClick={() => { const next = [...answers]; next[current] = selected!; setAnswers(next); submit(); }}
              className="flex-1 gradient-btn py-3 rounded-xl text-sm font-bold disabled:opacity-40"
            >
              {submitting ? "စစ်ဆေးနေပါသည်…" : "✅ အဖြေစစ်မယ်"}
            </button>
          )}
        </div>
        {error && <p className="text-sm text-rose-500 mt-4 text-center">{error}</p>}
      </div>
    </main>
  );
}
