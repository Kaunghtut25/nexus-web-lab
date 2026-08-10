"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { Brain, BookOpen, Lightbulb, HelpCircle, ThumbsUp, Trash2, Plus, Check, X, Loader2, Send } from "lucide-react";

interface KbEntry { id: string; question: string; answer: string; lang: string; source: string; usage_count: number; created_at: string; }
interface LearningItem { id: string; visitor_id: string; question: string; bot_reply: string; status: string; source: string; created_at: string; }
interface FeedbackItem { id: string; visitor_id: string; question: string; reply: string; rating: number; created_at: string; }

type Tab = "kb" | "proposed" | "unanswered" | "feedback";

export default function LearningPage() {
  const [tab, setTab] = useState<Tab>("proposed");
  const [kb, setKb] = useState<KbEntry[]>([]);
  const [learning, setLearning] = useState<LearningItem[]>([]);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState("");
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [busyId, setBusyId] = useState("");

  function flashMsg(m: string) { setFlash(m); setTimeout(() => setFlash(""), 4000); }

  function load() {
    setLoading(true);
    Promise.all([
      fetch("/api/admin/kb", { headers: apiHeaders() }).then((r) => r.json()),
      fetch("/api/admin/learning", { headers: apiHeaders() }).then((r) => r.json()),
    ])
      .then(([kbD, lrD]) => {
        setKb(kbD.entries || []);
        setLearning(lrD.learning || []);
        setFeedback(lrD.feedback || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }
  useEffect(() => { load(); }, []);

  const proposed = learning.filter((l) => l.status === "proposed");
  const unanswered = learning.filter((l) => l.status === "unanswered");

  async function addKb() {
    if (!q.trim() || !a.trim()) return;
    const r = await fetch("/api/admin/kb", {
      method: "POST",
      headers: { ...apiHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ question: q.trim(), answer: a.trim() }),
    });
    if (r.ok) { setQ(""); setA(""); flashMsg("✅ Added to knowledge base — the bot will use it from now on."); load(); }
  }

  async function delKb(id: string) {
    await fetch(`/api/admin/kb/${id}`, { method: "DELETE", headers: apiHeaders() });
    flashMsg("🗑️ Deleted from knowledge base.");
    load();
  }

  async function promote(item: LearningItem, answerOverride?: string) {
    setBusyId(item.id);
    const body: any = { learningId: item.id, action: "promote" };
    if (answerOverride) body.answer = answerOverride;
    const r = await fetch("/api/admin/learning/promote", {
      method: "POST",
      headers: { ...apiHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setBusyId("");
    const d = await r.json().catch(() => ({}));
    if (r.ok) flashMsg("🧠 Learned! Saved to the knowledge base.");
    else flashMsg(`⚠️ ${d.error || "failed"}`);
    load();
  }

  async function ignore(item: LearningItem) {
    setBusyId(item.id);
    await fetch("/api/admin/learning/promote", {
      method: "POST",
      headers: { ...apiHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ learningId: item.id, action: "ignore" }),
    });
    setBusyId("");
    flashMsg("Ignored.");
    load();
  }

  const TABS: { key: Tab; label: string; icon: any; badge?: number }[] = [
    { key: "proposed", label: "Proposed (staff)", icon: Lightbulb, badge: proposed.length },
    { key: "unanswered", label: "Unanswered", icon: HelpCircle, badge: unanswered.length },
    { key: "kb", label: "Knowledge Base", icon: BookOpen, badge: kb.length },
    { key: "feedback", label: "Feedback", icon: ThumbsUp },
  ];

  return (
    <AuthGuard>
      <AdminLayout title="Learning — the bot learns from customer experiences">
        <div className="mb-4 bg-gradient-to-r from-blue/10 to-cyan/10 border border-blue/10 rounded-2xl p-4 text-sm text-slate-600">
          💡 <b>How learning works:</b> when a visitor asks something and staff answers (or the bot can&apos;t answer), it lands here. Review → <b>promote</b> → the bot permanently learns that answer.
        </div>

        {flash && <div className="mb-3 px-4 py-2.5 bg-emerald-50 border border-emerald-100 text-sm text-emerald-700 rounded-xl">{flash}</div>}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                tab === t.key ? "bg-blue text-white shadow-lg shadow-blue/20" : "bg-white border border-slate-200 text-slate-600 hover:border-blue/40"
              }`}
            >
              <t.icon size={15} />
              {t.label}
              {t.badge !== undefined && t.badge > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab === t.key ? "bg-white/25" : "bg-amber-100 text-amber-700"}`}>{t.badge}</span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 size={20} className="animate-spin text-blue" /></div>
        ) : (
          <div className="space-y-4">
            {/* PROPOSED (staff Q&A) */}
            {tab === "proposed" && (
              proposed.length === 0 ? <Empty text="Nothing proposed yet. When you reply to a visitor in Chats & Handoffs, their question + your answer appear here." /> :
              proposed.map((item) => (
                <LearningCard key={item.id} item={item} busy={busyId === item.id} onPromote={(ov) => promote(item, ov)} onIgnore={() => ignore(item)} />
              ))
            )}

            {/* UNANSWERED */}
            {tab === "unanswered" && (
              unanswered.length === 0 ? <Empty text="No unanswered questions. The bot handled everything! 🎉" /> :
              unanswered.map((item) => (
                <LearningCard key={item.id} item={item} busy={busyId === item.id} onPromote={(ov) => promote(item, ov)} onIgnore={() => ignore(item)} />
              ))
            )}

            {/* KB */}
            {tab === "kb" && (
              <>
                <div className="bg-white rounded-2xl border border-slate-200 p-4">
                  <h4 className="font-bold text-navy text-sm mb-3 flex items-center gap-2"><Plus size={15} className="text-blue" /> Add knowledge manually</h4>
                  <div className="grid gap-2">
                    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Question (e.g. Do you offer refunds?)" className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue" />
                    <textarea value={a} onChange={(e) => setA(e.target.value)} placeholder="Answer the bot should give" rows={2} className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue" />
                    <button onClick={addKb} disabled={!q.trim() || !a.trim()} className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue text-white text-sm font-semibold disabled:opacity-40 hover:bg-blue/90 transition">
                      <Send size={14} /> Save to Knowledge Base
                    </button>
                  </div>
                </div>
                {kb.length === 0 ? <Empty text="Knowledge base is empty. Promote items from the other tabs or add manually above." /> :
                  kb.map((e) => (
                    <div key={e.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-navy">{e.question}</p>
                        <p className="text-sm text-slate-500 mt-1 whitespace-pre-line">{e.answer}</p>
                        <p className="text-[10px] text-slate-400 mt-1.5">source: {e.source} · used {e.usage_count}x · {e.created_at}</p>
                      </div>
                      <button onClick={() => delKb(e.id)} className="self-start p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition" aria-label="Delete entry"><Trash2 size={15} /></button>
                    </div>
                  ))
                }
              </>
            )}

            {/* FEEDBACK */}
            {tab === "feedback" && (
              feedback.length === 0 ? <Empty text="No feedback yet. Visitors can rate bot answers with 👍/👎 in the chat." /> :
              feedback.map((f) => (
                <div key={f.id} className={`bg-white rounded-2xl border p-4 ${f.rating === -1 ? "border-red-200" : "border-slate-200"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm ${f.rating === 1 ? "text-emerald-600" : "text-red-500"}`}>{f.rating === 1 ? "👍 Helpful" : "👎 Not helpful"}</span>
                    <span className="text-[10px] text-slate-400">{f.created_at}</span>
                  </div>
                  <p className="text-sm font-medium text-navy">{f.question || "—"}</p>
                  <p className="text-xs text-slate-500 mt-1 whitespace-pre-line line-clamp-3">{f.reply || "—"}</p>
                  {f.rating === -1 && (
                    <button onClick={() => { setTab("unanswered"); }} className="mt-2 text-xs font-semibold text-blue hover:underline">Review what the bot said →</button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </AdminLayout>
    </AuthGuard>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-400">{text}</div>;
}

function LearningCard({ item, busy, onPromote, onIgnore }: {
  item: LearningItem; busy: boolean;
  onPromote: (answerOverride?: string) => void; onIgnore: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [ans, setAns] = useState(item.bot_reply || "");
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-blue mb-1">❓ {item.question}</p>
          <p className="text-sm text-slate-600 whitespace-pre-line">{item.bot_reply || <span className="text-slate-400">(no bot answer — type one below)</span>}</p>
          <p className="text-[10px] text-slate-400 mt-1.5">from {item.source} · {item.created_at}</p>
        </div>
        <span className="text-[10px] uppercase px-2 py-1 rounded-full bg-slate-100 text-slate-500 flex-shrink-0">{item.source}</span>
      </div>
      {editing && (
        <textarea value={ans} onChange={(e) => setAns(e.target.value)} rows={2} placeholder="The answer the bot should give"
          className="mt-3 w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue" />
      )}
      <div className="mt-3 flex gap-2">
        <button disabled={busy} onClick={() => { if (editing) onPromote(ans.trim() || undefined); else onPromote(); }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-semibold disabled:opacity-40 hover:bg-emerald-600 transition">
          {busy ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />} Learn it (promote to KB)
        </button>
        <button onClick={() => setEditing(!editing)} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition">
          {editing ? "Done editing" : "✏️ Edit answer"}
        </button>
        <button disabled={busy} onClick={onIgnore} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-500 text-xs font-semibold hover:bg-slate-200 transition disabled:opacity-40">
          <X size={13} /> Ignore
        </button>
      </div>
    </div>
  );
}
