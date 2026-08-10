"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CourseLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/course/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login မအောင်မြင်ပါ");
      } else {
        router.push("/course/dashboard");
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
            <div className="text-4xl mb-2">🔑</div>
            <h1 className="text-2xl font-black text-navy">အကောင့်ဝင်ရန်</h1>
            <p className="text-sm text-slate-500 mt-1">သင်တန်းသားများအတွက် Member Login</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
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
              <label className="block text-sm font-bold text-navy mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 focus:border-blue focus:ring-2 focus:ring-blue/20 outline-none transition text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue transition text-lg"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? "🙈" : "👁️"}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">Password မမှန်လို့ မရလျှင် — ဆရာကို ဆက်သွယ်၍ Password အသစ် ပြန်ထားပေးနိုင်ပါသည်</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-btn !py-3.5 !text-base disabled:opacity-60"
            >
              {loading ? "ဝင်နေပါသည်…" : "🚀 ဝင်မယ်"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            အကောင့် မရှိသေးဘူးလား?{" "}
            <Link href="/course/register" className="text-blue font-bold hover:underline">
              စာရင်းသွင်းပါ
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
