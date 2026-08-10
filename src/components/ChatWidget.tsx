"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Sparkles, User } from "lucide-react";

// Offline fallback (used only if /api/chat is unreachable)
const DEMO_REPLIES: Record<string, string> = {
  hello: "Hi there! 👋 I'm Nexus AI — how can I help you today?",
  hi: "Hello! 👋 Welcome to Nexus Web Lab. Ask me about our services, pricing, or the AI Freelancing course!",
  price: "Our international pricing (USD):\n• Web Development — from $500\n• E-Commerce — from $800\n• UI/UX Design — from $300\n• SEO — from $200\n• Hosting — from $50/mo\n• Maintenance — from $30/mo\n\nMMK accepted too (1 USD ≈ 4,500 MMK). Want a custom quote?",
  website: "Absolutely! We build custom websites with Next.js, React, and TypeScript — from $500. Full admin panel, SEO, mobile responsive, 1 month free support!",
  ecommerce: "We build online stores from $800 — product management, cart, payment integration, order tracking. Includes full admin panel!",
  seo: "Our SEO package starts at $200 — audit, meta tags, schema markup, speed optimization, and monthly reports.",
  chatbot: "Yes! AI chatbots are our specialty — from FAQ bots to full AI agents with RAG and multi-language. From $600, demo available!",
  contact: "Reach us at info@nexusweblab.com or 09945598825. We reply within 24 hours!",
  international: "Yes! We work with clients worldwide via Fiverr, Upwork, and direct contracts. English communication supported.",
  timeline: "Landing pages: 1-2 weeks. Business sites: 2-4 weeks. E-commerce: 3-6 weeks. Rush delivery available!",
  support: "1 month free support included with every project. Ongoing maintenance plans from $30/mo.",
  help: "I'm here to help! Ask me about:\n• Services & International Pricing\n• The AI Freelancing Course ($49 launch)\n• E-Commerce, SEO & AI Chatbots\n• Timeline & Support\n• Contact Info",
  default: "Great question! We specialize in web dev, e-commerce, AI chatbots, and more — with international pricing from $200. Ask about pricing, timeline, or portfolio! 😊",
};

// Course-aware offline fallback (mirrors the server's courseFallbackReply)
const COURSE_DEMO_REPLIES: Record<string, string> = {
  fee: "Nexus AI Freelance Mastery သင်တန်းကြေး 💰\n\n• Regular / Actual fee — $199 (≈ 895,000 MMK)\n• Promo fee (Launch Offer — ၇၅% off) — $49 (≈ 220,000 MMK)\n\n✅ One-time payment · Lifetime access\n🛡️ ၇ ရက် Money-Back Guarantee\n💳 KBZPay · AYA Pay · Wave Pay · ဘဏ်ငွေလွှဲ",
  join: "တက်ရောက်ရန် အဆင့် ၄ ဆင့် 🚀\n\n1️⃣ [ဒီမှာ စာရင်းသွင်းပါ](https://nexusweblab.com/course/register)\n2️⃣ သင်တန်းကြေး ပေးချေပါ — KBZPay / AYA Pay / Wave Pay\n3️⃣ ဆရာက အကောင့် ဖွင့်ပေးပါမယ်\n4️⃣ [Login ဝင်ပြီး စတင်ပါ](https://nexusweblab.com/course/login) 🎓",
  module: "📚 သင်ရိုး — Module ၁၃ ခု\n\n01. AI Freelancing အခြေခံ\n02. Prompt Engineering (RACE)\n03. Web Development အခြေခံ\n04. AI ဖြင့် Website ဆောက်ခြင်း\n05. Hosting & Deploy\n06. AI Agents + Next.js\n07. Chatbot အခြေခံ\n08. AI Chatbot (Botpress)\n09. v0.dev Prototyping\n10. Fiverr\n11. Upwork\n12. Client Communication & Interviews\n13. Capstone + Growth",
  bonus: "🎁 ပါဝင်တဲ့အရာတွေ\n\nModule တိုင်းမှာ — 🎬 Video Script · 📖 PDF · 🖥️ Slides · ✍️ Assignment · 💻 Code\n\nBonus ၅ ခု:\n• Botpress PDF Guide\n• v0.dev Guide\n• Fiverr/Upwork Templates\n• Interview ၁၂ ခု အဖြေနဲ့\n• Private Community",
};

function getReply(input: string): string {
  const msg = input.toLowerCase().trim();
  // Course intents first
  if (/(course fee|class fee|actual fee|promo|သင်တန်းကြေး|ကျောင်းလခ|ဈေး|စျေး|ဘယ်လောက်|how much.*course|course.*price|course.*cost)/.test(msg)) return COURSE_DEMO_REPLIES.fee;
  if (/(how to join|register|sign up|စာရင်းသွင်း|ဘယ်လိုတက်|ဘယ်လိုစ)/.test(msg)) return COURSE_DEMO_REPLIES.join;
  if (/(module|curriculum|syllabus|lesson|သင်ခန်းစာ|သင်ရိုး|what will i learn|ဘာတွေသင်လဲ)/.test(msg)) return COURSE_DEMO_REPLIES.module;
  if (/(bonus|what do i get|what's included|ဘာတွေပါ|ဘာတွေရ)/.test(msg)) return COURSE_DEMO_REPLIES.bonus;
  for (const [key, reply] of Object.entries(DEMO_REPLIES)) {
    if (msg.includes(key)) return reply;
  }
  return DEMO_REPLIES.default;
}

// Build a compact "what did the customer ask about" string from the chat,
// passed to the contact form so the team can follow up on the request.
function buildChatContext(messages: { role: "user" | "bot"; text: string }[]): string {
  const recent = messages.slice(-8);
  if (recent.length === 0) return "";
  return recent
    .map((m) => `${m.role === "user" ? "Customer" : "Nexus AI"}: ${m.text.replace(/\s+/g, " ").trim()}`)
    .join("\n");
}

// Render bot message text: convert markdown links [text](url) and bare URLs
// into clickable button-style links instead of showing raw URL text.
// Internal links (contact/portfolio) get the chat context appended so the
// contact form arrives pre-filled with what the customer asked about.
function BotText({ text, chatContext }: { text: string; chatContext?: string }) {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s<>"']+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  const openLink = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    let url = href;
    try {
      const u = new URL(href);
      // Internal Nexus pages → carry the chat conversation over
      if (u.hostname.includes("nexus-web-lab") || u.pathname.startsWith("/contact") || u.pathname.startsWith("/portfolio")) {
        if (chatContext) {
          if (u.pathname === "/") u.pathname = "/contact";
          u.searchParams.set("chat", chatContext);
        }
        url = u.toString();
      }
    } catch {}
    window.open(url, "_blank", "noopener,noreferrer");
  };
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      // Markdown link [label](url) → button
      parts.push(
        <a
          key={key++}
          href={match[2]}
          onClick={openLink(match[2])}
          className="inline-flex items-center gap-1 mx-1 my-0.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue to-cyan text-white text-xs font-semibold hover:shadow-md hover:shadow-blue/30 transition-all"
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      // Bare URL → button showing the hostname
      let label = match[3];
      try {
        label = new URL(match[3]).hostname;
      } catch {
        label = "Open link";
      }
      parts.push(
        <a
          key={key++}
          href={match[3]}
          onClick={openLink(match[3])}
          className="inline-flex items-center gap-1 mx-1 my-0.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue to-cyan text-white text-xs font-semibold hover:shadow-md hover:shadow-blue/30 transition-all"
        >
          {label} ↗
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return <>{parts}</>;
}

export default function ChatWidget() {
  const pathname = usePathname();
  // PUBLIC vs PRIVATE: chat shows on public pages only.
  // Private = logged-in course area (dashboard, module pages).
  // Public = main site + course landing/login/register pages.
  const isPrivateCourse = pathname.startsWith("/course/dashboard") || pathname.startsWith("/course/module") || pathname.startsWith("/course/exam");
  const ctx: "website" | "course" = pathname.startsWith("/course") ? "course" : "website";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const finalizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leadSent = useRef(false);
  // Human handoff: staff replies from /admin/chats + active state
  const [handoffActive, setHandoffActive] = useState(false);
  const [staffMsgs, setStaffMsgs] = useState<{ id: string; text: string }[]>([]);
  const seenStaffRef = useRef<Set<string>>(new Set());

  // Stable visitor id in localStorage → server stores chat memory per visitor,
  // so the bot remembers this student's previous questions on every visit.
  // NOTE: this ref must stay ABOVE the early return — hooks must always run in
  // the same order on every render or React crashes (#300) on navigation.
  const visitorIdRef = useRef<string>("");
  if (!visitorIdRef.current) {
    try {
      let vid = localStorage.getItem("nwl_visitor_id");
      if (!vid) {
        vid = crypto.randomUUID();
        localStorage.setItem("nwl_visitor_id", vid);
      }
      visitorIdRef.current = vid;
    } catch {
      visitorIdRef.current = "";
    }
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // HUMAN HANDOFF: while the chat is open, poll for staff replies written in
  // /admin/chats. When staff messages arrive, they render as team bubbles and
  // the handoff banner shows. afterId = last seen staff message id.
  useEffect(() => {
    if (!open) return;
    let stopped = false;
    const tick = async () => {
      if (stopped || !visitorIdRef.current) return;
      try {
        const afterId = Array.from(seenStaffRef.current).pop() || "";
        const r = await fetch(`/api/handoffs/poll?visitorId=${encodeURIComponent(visitorIdRef.current)}&context=${ctx}&afterId=${encodeURIComponent(afterId)}`);
        const d = await r.json();
        const fresh = (d?.messages || []).filter((m: any) => !seenStaffRef.current.has(m.id));
        fresh.forEach((m: any) => seenStaffRef.current.add(m.id));
        if (fresh.length) {
          setStaffMsgs((s) => [...s, ...fresh.map((m: any) => ({ id: m.id, text: m.content }))]);
          setHandoffActive(true);
        }
      } catch {}
    };
    tick();
    const t = setInterval(tick, 10000);
    return () => { stopped = true; clearInterval(t); };
  }, [open, ctx]);

  // Once per conversation: after the client stops typing for ~8s, send the FULL
  // transcript to /api/lead so the owner gets ONE consolidated Telegram message
  // (name + email + phone + service + transcript) instead of one per message.
  useEffect(() => {
    if (messages.length === 0 || leadSent.current) return;
    if (finalizeTimer.current) clearTimeout(finalizeTimer.current);
    finalizeTimer.current = setTimeout(() => {
      const history = messages
        .slice(-12)
        .map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.text,
        }));
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (d?.success) leadSent.current = true; // sent once, never again
        })
        .catch(() => {});
    }, 8000);
    return () => {
      if (finalizeTimer.current) clearTimeout(finalizeTimer.current);
    };
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg = { role: "user" as const, text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Try the real AI backend first (server-side DeepSeek + knowledge guideline)
      // Send OpenAI-style messages ({role, content}) — DeepSeek rejects {text}.
      // Send FULL history (user + bot) so the model knows it already greeted
      // and never repeats the greeting on follow-up messages.
      // Map bot → assistant: DeepSeek/OpenAI only accept system/user/assistant.
      const history = [...messages, userMsg]
        .slice(-12)
        .map((m) => ({
          role: m.role === "bot" ? "assistant" : m.role,
          content: m.text,
        }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, visitorId: visitorIdRef.current, context: ctx }),
      });
      const data = await res.json();
      const reply = (data?.reply || "").trim();
      if (data?.handoff) setHandoffActive(true);
      setMessages((prev) => [...prev, { role: "bot", text: reply || getReply(text) }]);
    } catch {
      // Offline fallback — keyword replies with updated info
      setMessages((prev) => [...prev, { role: "bot", text: getReply(text) }]);
    } finally {
      setLoading(false);
    }
  }

  // Don't render anything in the PRIVATE course area (students study there, no chat needed).
  // IMPORTANT: this must come AFTER every hook — all hooks above run unconditionally on
  // every render so React never sees a changing hook count (which crashes with #300).
  if (isPrivateCourse) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 right-5 z-[9999] w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          open
            ? "bg-white text-slate-600 rotate-90 scale-90 hover:scale-95"
            : "bg-gradient-to-br from-blue to-cyan text-white hover:scale-110 hover:shadow-blue/30"
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-[4.5rem] right-4 z-[9999] w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Nexus AI chat"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue to-cyan px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Nexus AI Assistant</h3>
            <p className="text-white/70 text-xs">Ask me anything!</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span className="text-white/80 text-xs">Online</span>
          </div>
        </div>

        {/* Handoff banner — a team member will join */}
        {handoffActive && (
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 text-xs text-amber-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Our team has been notified — they&apos;ll reply here shortly. 👤
          </div>
        )}

        {/* Messages */}
        <div className="h-[350px] overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Sparkles size={40} className="text-blue/30 mx-auto mb-3" />
              {ctx === "course" ? (
                <>
                  <p className="text-sm text-slate-500 mb-4">မင်္ဂလာပါ! 🎓<br />Nexus AI Freelance Mastery သင်တန်းအကြောင်း မေးမြန်းနိုင်ပါတယ်</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["သင်တန်းကြေး? 💰", "Module ၁၃ ခု? 📚", "ဘယ်လိုစာရင်းသွင်းရမလဲ? 🚀", "ငွေပေးချေနည်း 💳"].map((q) => (
                      <button
                        key={q}
                        onClick={() => { setInput(q); }}
                        className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue hover:text-blue transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-slate-500 mb-4">Hi! I&apos;m Nexus AI 🤖<br />Ask me about our services, pricing, or anything else!</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["Services 💼", "Pricing 💰", "Timeline ⏱️", "Contact 📞"].map((q) => (
                      <button
                        key={q}
                        onClick={() => { setInput(q); }}
                        className="text-xs px-3 py-3 min-h-[48px] rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue hover:text-blue transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "bot" && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue to-cyan flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles size={13} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${m.role === "user"
                    ? "bg-gradient-to-r from-blue to-cyan text-white rounded-br-md"
                    : "bg-white border border-slate-200 text-slate-700 rounded-bl-md shadow-sm"
                }`}
              >
                {m.role === "user" ? m.text : <BotText text={m.text} chatContext={buildChatContext(messages)} />}
              </div>
              {m.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={13} className="text-slate-500" />
                </div>
              )}
            </div>
          ))}
          {/* Staff (team) messages from /admin/chats */}
          {staffMsgs.map((m) => (
            <div key={m.id} className="flex gap-2 justify-start">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                <User size={13} className="text-white" />
              </div>
              <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-md text-sm leading-relaxed whitespace-pre-line bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 mb-1">👤 Team</div>
                <BotText text={m.text} chatContext={buildChatContext(messages)} />
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue to-cyan flex items-center justify-center">
                <Sparkles size={13} className="text-white" />
              </div>
              <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="p-3 border-t border-slate-100 bg-white flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10"
            aria-label="Chat message"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2.5 min-h-[48px] rounded-xl bg-gradient-to-r from-blue to-cyan text-white disabled:opacity-40 transition-all hover:shadow-lg hover:shadow-blue/20"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Powered by <span className="font-semibold text-blue">Nexus Web Lab</span>
          </p>
        </div>
      </div>
    </>
  );
}
