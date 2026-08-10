"use client";
import { useState } from "react";
import Link from "next/link";

export default function CourseRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Password နှစ်ခု တူညီမှု မရှိပါ");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/course/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "စာရင်းသွင်း၍ မရပါ");
      } else {
        setSuccess(data.message || "စာရင်းသွင်းပြီးပါပြီ!");
      }
    } catch {
      setError("Network error — ပြန်ကြိုးစားပါ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mesh-bg min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🎓</div>
            <h1 className="text-2xl font-black text-navy">စာရင်းသွင်းရန်</h1>
            <p className="text-sm text-slate-500 mt-1">
              Email + Password ဖန်တီးပြီး — သင်ခန်းစာများ အခမဲ့ ဝင်ရောက်လေ့လာနိုင်ပါသည်
            </p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 px-4 py-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm leading-relaxed">
              {success}
              <div className="mt-3">
                <Link href="/course/login" className="text-emerald-700 font-bold underline">
                  → အကောင့်ဝင်ရန် သွားမယ်
                </Link>
              </div>
            </div>
          )}

          {!success && (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-navy mb-1.5">နာမည်</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ဥပမာ — Maung Maung"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue focus:ring-2 focus:ring-blue/20 outline-none transition text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue focus:ring-2 focus:ring-blue/20 outline-none transition text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1.5">Password (အနည်းဆုံး ၆ လုံး)</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue focus:ring-2 focus:ring-blue/20 outline-none transition text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-1.5">Password ထပ်ရိုက်ပါ</label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue focus:ring-2 focus:ring-blue/20 outline-none transition text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-btn !py-3.5 !text-base disabled:opacity-60"
              >
                {loading ? "စာရင်းသွင်းနေပါသည်…" : "✅ စာရင်းသွင်းမယ်"}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-slate-500 mt-5">
            အကောင့် ရှိပြီးသားလား?{" "}
            <Link href="/course/login" className="text-blue font-bold hover:underline">
              ဝင်မယ်
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
