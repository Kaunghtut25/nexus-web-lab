"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { MessagesSquare, Users, Mail, LifeBuoy, HelpCircle, ThumbsUp, ThumbsDown, BookOpen, TrendingUp, Loader2 } from "lucide-react";

interface Analytics {
  chats: number; messages: number; leads: number;
  handoffs: { total: number; open: number };
  unanswered: number;
  feedback: { pos: number; neg: number };
  kb: { count: number; usage: number };
  trend: { day: string; chats: number; msgs: number }[];
  topQ: { q: string; c: number }[];
  leadSources: { source: string; c: number }[];
  handoffStatus: { status: string; c: number }[];
  recentFeedback: { visitor_id: string; question: string; rating: number; created_at: string }[];
}

export default function AnalyticsPage() {
  const [d, setD] = useState<Analytics | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/admin/analytics", { headers: apiHeaders() })
      .then((r) => r.json())
      .then((j) => (j.error ? setErr(j.error) : setD(j)))
      .catch(() => setErr("Failed to load analytics"));
  }, []);

  if (err) return <AuthGuard><AdminLayout title="Analytics"><div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4">{err}</div></AdminLayout></AuthGuard>;

  const maxDay = Math.max(1, ...(d?.trend || []).map((t) => Number(t.msgs)));
  const maxQ = Math.max(1, ...(d?.topQ || []).map((t) => Number(t.c)));

  return (
    <AuthGuard>
      <AdminLayout title="Analytics — how your chatbot is performing">
        {!d ? (
          <div className="flex items-center justify-center py-24"><Loader2 size={20} className="animate-spin text-blue" /></div>
        ) : (
          <div className="space-y-6">
            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              <Kpi icon={<MessagesSquare size={17} />} label="Chats (visitors)" value={d.chats} tint="from-blue/10 to-cyan/10 text-blue" />
              <Kpi icon={<Users size={17} />} label="Messages" value={d.messages} tint="from-indigo/10 to-blue/10 text-indigo" />
              <Kpi icon={<Mail size={17} />} label="Leads captured" value={d.leads} tint="from-emerald/10 to-teal/10 text-emerald" />
              <Kpi icon={<LifeBuoy size={17} />} label={`Handoffs (${d.handoffs.open} open)`} value={d.handoffs.total} tint="from-amber/10 to-orange/10 text-amber" />
              <Kpi icon={<HelpCircle size={17} />} label="Unanswered questions" value={d.unanswered} tint="from-rose/10 to-red/10 text-rose" />
              <Kpi icon={<ThumbsUp size={17} />} label="👍 Helpful" value={d.feedback.pos} tint="from-emerald/10 to-green/10 text-emerald" />
              <Kpi icon={<ThumbsDown size={17} />} label="👎 Not helpful" value={d.feedback.neg} tint="from-red/10 to-rose/10 text-red" />
              <Kpi icon={<BookOpen size={17} />} label={`KB entries (${d.kb.usage} uses)`} value={d.kb.count} tint="from-violet/10 to-purple/10 text-violet" />
            </div>

            {/* Daily trend */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-navy text-sm mb-4 flex items-center gap-2"><TrendingUp size={15} className="text-blue" /> Messages last 14 days</h3>
              {d.trend.length === 0 ? (
                <p className="text-sm text-slate-400 py-4">No chat traffic yet.</p>
              ) : (
                <div className="flex items-end gap-1.5 h-36 overflow-x-auto pb-1">
                  {d.trend.map((t) => (
                    <div key={t.day} className="flex-1 min-w-[26px] flex flex-col items-center gap-1">
                      <span className="text-[9px] text-slate-400">{t.msgs}</span>
                      <div
                        className="w-full max-w-[34px] rounded-t-lg bg-gradient-to-t from-blue to-cyan"
                        style={{ height: `${Math.max(4, Math.round((Number(t.msgs) / maxDay) * 90))}px` }}
                        title={`${t.day}: ${t.msgs} msgs / ${t.chats} chats`}
                      />
                      <span className="text-[9px] text-slate-400 truncate w-full text-center">{t.day.slice(5)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              {/* Top questions */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-navy text-sm mb-4">🔝 Most asked questions</h3>
                {d.topQ.length === 0 ? <p className="text-sm text-slate-400">No questions yet.</p> : (
                  <div className="space-y-2.5">
                    {d.topQ.map((q, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-300 w-4">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-600 truncate">{q.q}</p>
                          <div className="mt-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full rounded-full bg-blue/70" style={{ width: `${Math.max(4, (Number(q.c) / maxQ) * 100)}%` }} />
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">{q.c}x</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sources + handoff status */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-bold text-navy text-sm mb-3">📥 Lead sources</h3>
                  {d.leadSources.length === 0 ? <p className="text-sm text-slate-400">No leads yet.</p> : (
                    <div className="flex flex-wrap gap-2">
                      {d.leadSources.map((s) => (
                        <span key={s.source} className="px-3 py-1.5 rounded-full bg-blue/10 text-blue text-xs font-semibold">
                          {s.source} · {s.c}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className="font-bold text-navy text-sm mt-5 mb-3">🛟 Handoff status</h3>
                  {d.handoffStatus.length === 0 ? <p className="text-sm text-slate-400">No handoffs yet.</p> : (
                    <div className="flex flex-wrap gap-2">
                      {d.handoffStatus.map((s) => (
                        <span key={s.status} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${s.status === "open" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                          {s.status} · {s.c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {/* Recent feedback */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-bold text-navy text-sm mb-3">💬 Recent visitor feedback</h3>
                  {d.recentFeedback.length === 0 ? <p className="text-sm text-slate-400">No feedback yet.</p> : (
                    <div className="space-y-2">
                      {d.recentFeedback.slice(0, 6).map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className="text-sm">{f.rating === 1 ? "👍" : "👎"}</span>
                          <div className="min-w-0">
                            <p className="text-slate-600 truncate">{f.question || "—"}</p>
                            <p className="text-[10px] text-slate-400">{f.created_at}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center pb-2">
              💡 Tip: questions under <b>Unanswered</b> → promote them in the <b>Learning</b> tab → the bot gets smarter every day.
            </p>
          </div>
        )}
      </AdminLayout>
    </AuthGuard>
  );
}

function Kpi({ icon, label, value, tint }: { icon: React.ReactNode; label: string; value: number; tint: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tint.split(" ").slice(0, 2).join(" ")} flex items-center justify-center flex-shrink-0 ${tint.split(" ")[2]}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xl font-extrabold text-navy leading-none">{value}</p>
        <p className="text-[10px] text-slate-400 mt-1 truncate">{label}</p>
      </div>
    </div>
  );
}
