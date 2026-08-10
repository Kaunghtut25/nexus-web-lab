"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Shield } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("nwl_token", data.token);
        localStorage.setItem("nwl_user", JSON.stringify(data.user));
        router.push("/admin");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Connection error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy-light to-navy p-4">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-8">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Nexus Web Lab" width={512} height={512} className="h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-extrabold text-navy">Admin Login</h1>
            <p className="text-slate-400 text-sm mt-1">Nexus Web Lab Dashboard</p>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition" />
            </div>
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue to-cyan text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue/25 transition-all disabled:opacity-70">
              {loading ? "Signing in..." : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400"><Shield size={14} /> Secured admin access</div>
          </div>
        </div>
        <div className="text-center mt-6"><a href="/" className="text-sm text-slate-400 hover:text-white transition">← Back to Website</a></div>
      </div>
    </div>
  );
}
