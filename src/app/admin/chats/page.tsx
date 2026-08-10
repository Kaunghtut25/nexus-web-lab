"use client";
import { AuthGuard, AdminLayout, apiHeaders } from "../shared";
import { useState, useEffect } from "react";
import { MessagesSquare, ChevronDown, Send, XCircle, Bot, User, Loader2 } from "lucide-react";

interface ChatRow {
  visitor_id: string;
  context: string;
  cnt: number;
  last_ts: string;
  last_msg: string;
  handoff: boolean;
}
interface MsgRow {
  role: string;
  content: string;
  created_at: string;
}

export default function ChatsPage() {
  const [chats, setChats] = useState<ChatRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<MsgRow[]>([]);
  const [txLoading, setTxLoading] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [flash, setFlash] = useState("");

  function load() {
    setLoading(true);
    fetch("/api/chats", { headers: apiHeaders() })
      .then((r) => r.json())
      .then((d) => { setChats(d.chats || []); setLoading(false); })
      .catch(() => setLoading(false));
  }
  useEffect(() => { load(); }, []);

  async function toggleChat(c: ChatRow) {
    const key = `${c.visitor_id}|${c.context}`;
    if (openId === key) { setOpenId(null); return; }
    setOpenId(key);
    setTxLoading(true);
    setTranscript([]);
    setReplyText("");
    try {
      const r = await fetch(`/api/chats?visitor=${encodeURIComponent(c.visitor_id)}&context=${encodeURIComponent(c.context)}`, { headers: apiHeaders() });
      const d = await r.json();
      setTranscript(d.messages || []);
    } catch {}
    setTxLoading(false);
  }

  function activeChat(): ChatRow | null {
    if (!openId) return null;
    return chats.find((c) => `${c.visitor_id}|${c.context}` === openId) || null;
  }

  async function sendReply() {
    const c = activeChat();
    if (!c || !replyText.trim() || sending) return;
    setSending(true);
    try {
      const r = await fetch("/api/handoffs/reply", {
        method: "POST",
        headers: { ...apiHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: c.visitor_id, context: c.context, text: replyText.trim() }),
      });
      if (r.ok) {
        setTranscript((t) => [...t, { role: "assistant", content: `[STAFF] ${replyText.trim()}`, created_at: new Date().toISOString() }]);
        setReplyText("");
        setFlash("✅ Reply sent — the visitor sees it in the chat within seconds.");
        setTimeout(() => setFlash(""), 5000);
        load();
      }
    } catch {}
    setSending(false);
  }

  async function closeHandoff() {
    const c = activeChat();
    if (!c) return;
    try {
      await fetch("/api/handoffs/close", {
        method: "POST",
        headers: { ...apiHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: c.visitor_id, context: c.context }),
      });
      setFlash("✅ Handoff closed.");
      setTimeout(() => setFlash(""), 4000);
      load();
    } catch {}
  }

  if (loading) {
    return (
      <AuthGuard><AdminLayout title="Chats & Handoffs">
        <div className="flex items-center justify-center py-20"><div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-blue animate-pulse" /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: "0.2s" }} /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: "0.4s" }} /></div></div>
      </AdminLayout></AuthGuard>
    );
  }

  const openCount = chats.filter((c) => c.handoff).length;

  return (
    <AuthGuard>
      <AdminLayout title="Chats & Handoffs">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-navy flex items-center gap-2">
              <MessagesSquare size={18} className="text-blue" /> Conversations ({chats.length})
            </h3>
            {openCount > 0 && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                🔴 {openCount} handoff{openCount > 1 ? "s" : ""} waiting
              </span>
            )}
          </div>

          {flash && <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-100 text-sm text-emerald-700">{flash}</div>}

          {chats.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">No conversations yet. Visitor chats will appear here.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {chats.map((c) => {
                const key = `${c.visitor_id}|${c.context}`;
                const open = openId === key;
                return (
                  <div key={key}>
                    <button onClick={() => toggleChat(c)} className="w-full p-4 flex items-center gap-3 hover:bg-slate-50 transition text-left">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${c.handoff ? "bg-amber-100 text-amber-600" : "bg-blue/10 text-blue"}`}>
                        <User size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-navy truncate">{c.visitor_id.slice(0, 14)}…</span>
                          <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{c.context}</span>
                          {c.handoff && <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">handoff</span>}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{c.last_msg || "—"} · {c.cnt} msgs · {c.last_ts || ""}</p>
                      </div>
                      <ChevronDown size={16} className={`text-slate-300 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>

                    {open && (
                      <div className="px-4 pb-4">
                        <div className="rounded-xl border border-slate-100 bg-slate-50 max-h-72 overflow-y-auto p-3 space-y-2">
                          {txLoading ? (
                            <div className="flex items-center justify-center py-8 text-slate-400 text-sm"><Loader2 size={16} className="animate-spin mr-2" /> Loading transcript…</div>
                          ) : transcript.length === 0 ? (
                            <div className="py-8 text-center text-slate-400 text-sm">No messages in this conversation.</div>
                          ) : (
                            transcript.map((m, i) => (
                              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
                                  m.role === "user"
                                    ? "bg-blue text-white rounded-br-sm"
                                    : m.content.startsWith("[STAFF]")
                                      ? "bg-emerald-100 text-emerald-900 rounded-bl-sm"
                                      : "bg-white border border-slate-200 text-slate-600 rounded-bl-sm"
                                }`}>
                                  {m.content.startsWith("[STAFF]") && <div className="text-[9px] font-bold uppercase text-emerald-600 mb-0.5">👤 Team</div>}
                                  {m.role === "user" ? <Bot size={11} className="inline mr-1 opacity-60" /> : null}
                                  {m.content.replace(/^\[STAFF\]\s*/, "")}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                        <div className="mt-3 flex gap-2">
                          <input
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") sendReply(); }}
                            placeholder="Reply as the team… (visitor sees it in chat)"
                            className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10"
                            aria-label="Team reply"
                          />
                          <button onClick={sendReply} disabled={!replyText.trim() || sending} className="px-4 py-2.5 rounded-xl bg-blue text-white text-sm font-semibold disabled:opacity-40 hover:bg-blue/90 transition" aria-label="Send team reply">
                            {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                          </button>
                          {c.handoff && (
                            <button onClick={closeHandoff} className="px-3 py-2.5 rounded-xl bg-slate-100 text-slate-500 text-sm hover:bg-slate-200 transition" title="Close handoff" aria-label="Close handoff">
                              <XCircle size={15} />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
