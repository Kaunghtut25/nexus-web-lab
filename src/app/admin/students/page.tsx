"use client";
import { useState, useEffect, useCallback } from "react";
import { AdminLayout, AuthGuard, useAuth, apiHeaders } from "../shared";

interface Student {
  id: string;
  name: string;
  email: string;
  status: "pending" | "active" | "blocked";
  created_at: string;
}

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  active: "bg-emerald-100 text-emerald-700",
  blocked: "bg-red-100 text-red-700",
};
const STATUS_LABEL: Record<string, string> = {
  pending: "Pending (ငွေစောင့်)",
  active: "Active",
  blocked: "Blocked",
};

export default function AdminStudentsPage() {
  const { isLoggedIn } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/students", { headers: apiHeaders() });
    const data = await res.json();
    setStudents(data.students || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) load();
  }, [isLoggedIn, load]);

  const setStatus = async (s: Student, status: Student["status"]) => {
    const res = await fetch("/api/admin/students", {
      method: "PATCH",
      headers: apiHeaders(),
      body: JSON.stringify({ id: s.id, status }),
    });
    const data = await res.json();
    if (data.success) {
      setMsg(`✅ ${s.name} → ${STATUS_LABEL[status]}`);
      setTimeout(() => setMsg(""), 3000);
      load();
    }
  };

  const resetPassword = async (s: Student) => {
    const pw = window.prompt(`🔑 ${s.name} (${s.email}) အတွက် Password အသစ် (အနည်းဆုံး ၆ လုံး):`);
    if (!pw) return;
    if (pw.length < 6) {
      alert("Password က အနည်းဆုံး ၆ လုံး ရှိရပါမယ်");
      return;
    }
    const res = await fetch("/api/admin/students", {
      method: "PATCH",
      headers: apiHeaders(),
      body: JSON.stringify({ id: s.id, password: pw }),
    });
    const data = await res.json();
    if (data.success) {
      setMsg(`✅ ${s.name} ရဲ့ Password အသစ် ပြောင်းပြီးပါပြီ`);
      setTimeout(() => setMsg(""), 3000);
    } else {
      alert(data.error || "မအောင်မြင်ပါ");
    }
  };

  return (
    <AuthGuard>
      <AdminLayout title="Students — သင်တန်းသားများ">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-navy">Course Students</h2>
            <p className="text-sm text-slate-500 mt-1">
              ငွေပေးချေပြီးသား သင်တန်းသားရဲ့ အကောင့်ကို "Activate" နှိပ်ပြီး ဖွင့်ပေးပါ။
            </p>
          </div>
          <div className="text-sm text-slate-500">စုစုပေါင်း: {students.length} ယောက်</div>
        </div>

        {msg && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
            {msg}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-400">Loading…</div>
          ) : students.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              သင်တန်းသား မရှိသေးပါ — /course/register ကနေ စာရင်းသွင်းလာတဲ့သူတွေ ဒီမှာ ပေါ်ပါမယ်။
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-slate-500">
                    <th className="px-4 py-3 font-semibold">နာမည်</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">အခြေအနေ</th>
                    <th className="px-4 py-3 font-semibold">စာရင်းသွင်းရက်</th>
                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-navy">{s.name}</td>
                      <td className="px-4 py-3 text-slate-600">{s.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_STYLE[s.status]}`}>
                          {STATUS_LABEL[s.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{s.created_at}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {s.status !== "active" && (
                          <button
                            onClick={() => setStatus(s, "active")}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition mr-2"
                          >
                            ✅ Activate
                          </button>
                        )}
                        {s.status !== "blocked" && (
                          <button
                            onClick={() => setStatus(s, "blocked")}
                            className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition mr-2"
                          >
                            ⛔ Block
                          </button>
                        )}
                        <button
                          onClick={() => resetPassword(s)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition"
                        >
                          🔑 Reset Password
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
