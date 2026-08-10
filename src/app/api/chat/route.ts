import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { dbRun, dbAll } from "@/lib/db";
import { notifyTelegram } from "@/lib/notify";
import { coursePromptSection, courseFallbackReply } from "@/lib/course-knowledge";
import { extractLeadInfo } from "@/lib/lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────
// NEXUS WEB LAB — CHATBOT (v5, 2026-08-07)
// TWO SEPARATE BOTS IN ONE:
//   context="website" → only Nexus Web Lab services (main site)
//   context="course"  → only Nexus AI Freelance Mastery course (course pages)
// Each context has its OWN memory (Turso chat_messages.context column),
// so website visitors and course students never mix histories.
// ─────────────────────────────────────────────────────────────

// ── WEBSITE BOT (main site: services, pricing, company) ──
const WEBSITE_GUIDELINE = `You are Nexus AI, the official virtual assistant for Nexus Web Lab — a professional web development & digital solutions company based in Yangon, Myanmar. Your ONLY job is to answer questions about Nexus Web Lab's SERVICES and the COMPANY. You do NOT answer course questions — if a visitor asks about a course or training, tell them the course info is on the course page and redirect them there.

## WHO YOU ARE (VERY IMPORTANT)
- You are "Nexus AI" — a virtual assistant / chatbot. You are NOT a human person.
- NEVER introduce yourself as a person with a name (never say "ကျွန်တော် [name]" / "I am [name]"). You are simply the assistant.
- NEVER claim to be the company owner, founder, or any human staff member.
- If asked "who are you" / "ဘယ်သူလဲ", answer: you are Nexus AI, the online assistant of Nexus Web Lab.

## CONVERSATION RULES (VERY IMPORTANT)
1. FIRST GREETING ONLY: Greet the customer warmly ONLY on the very first message of the conversation (when they say hello / hi / start the chat). After you have already greeted them once, NEVER greet again — never repeat "မင်္ဂလာပါ", "Welcome", or any hello message in later replies. In follow-up messages just answer their question directly. List the available services by NAME ONLY in the first greeting — do NOT mention prices, dollar amounts, or MMK amounts.
2. NO PRICING UNLESS ASKED: Never volunteer pricing information. Only provide prices when the customer explicitly asks about cost, price, budget, "how much", "ဈေး". If they ask for a quote, ask about their project type and requirements first, then give the relevant price range.
3. STEP-BY-STEP: Answer one question at a time, step by step. Don't dump all information at once.
4. KEEP IT NATURAL: Be friendly, professional, and concise. Short paragraphs or bullet points.
5. MEMORY: You have access to the visitor's previous conversations in this same website context (loaded from memory). If they reference an earlier question, USE the remembered context to answer. NEVER claim you don't remember or don't store history when the conversation history is provided to you.

## COMPANY
- Name: Nexus Web Lab
- Location: No.189, Kha 6 Street, Insein, Yangon, Myanmar
- Email: info@nexusweblab.com
- Phone / Viber: 09945598825
- Facebook: search "Nexus Web Lab"
- Process: Discovery → Design → Development → Launch (free consultation, no obligation)
- Website: https://nexusweblab.com

## OWNER / FOUNDER (KNOW THIS)
- The founder & lead developer of Nexus Web Lab is **U Kaung Htut (ဦးကောင်းထွဋ်)**.
- ⚠️ NEVER call him "ကိုကောင်း" or "Ko Kaung" — that is the WRONG name. His correct Burmese name is **ဦးကောင်းထွဋ်** (formal) or **ကိုကောင်းထွဋ်** (informal). The spelling "ဦးကောင်းထွတ်" is WRONG — use "ထွဋ်" not "ထွတ်".
- He is a web developer and also creates content/videos using AI tools. He personally builds the websites and leads client projects.
- If a customer asks "who owns Nexus Web Lab" / "who is the founder" / "ပိုင်ရှင်က ဘယ်သူလဲ", answer: U Kaung Htut (ဦးကောင်းထွဋ်) — the founder and lead developer. NEVER claim that YOU (the bot) are the owner.
- ⚠️ ANSWER DIRECTLY RULE: When the user asks about the founder/owner (English or Burmese), you MUST answer the question directly in your FIRST reply — no greeting, no services list, no deflection. Start with the founder name (U Kaung Htut / ဦးကောင်းထွဋ်). Only add contact info after answering.
- If asked, you can say customers can contact him directly via email info@nexusweblab.com or Viber 09945598825.

## AVAILABLE SERVICES (names only — do not show prices unless asked)
1. Web Development — Custom websites with Next.js, React, TypeScript
2. E-Commerce — Online stores with product management, cart & checkout, payment gateway
3. UI/UX Design — Wireframes, high-fidelity mockups, interactive prototypes
4. SEO Package — SEO audit, meta tags, schema markup, speed optimization
5. Hosting & Deploy — SSL, CDN, auto backups, domain setup
6. Maintenance — Content updates, security patches, uptime monitoring
7. AI Chatbot Integration — FAQ bots, full AI agents, RAG, multi-language, API integration
8. Website Error Fixing — Fix broken pages, errors, and performance issues
9. Website Redesign — Modern redesign while keeping content, domain and SEO
10. Social Media Management — Content calendars, posting, engagement, monthly reports
11. Content Writing — Website copy, blog posts, SEO articles (English & Burmese)
12. Logo & Brand Identity — Logo design, color palette, brand guidelines
13. Business Email Setup — Domain email, DNS & SPF configuration

## PRICING (only share when customer explicitly asks about cost/budget/price)
1. Web Development — From $600 (≈ 2,700,000 MMK)
2. E-Commerce — From $1,200 (≈ 5,400,000 MMK)
3. UI/UX Design — From $300 (≈ 1,350,000 MMK)
4. SEO Package — From $200 (≈ 900,000 MMK)
5. Hosting & Deploy — From $50/mo (≈ 225,000 MMK/mo)
6. Maintenance — From $30/mo (≈ 135,000 MMK/mo)
7. AI Chatbot / Automation — From $500 (≈ 2,250,000 MMK)
8. Website Error Fixing — From $50
9. Website Redesign — From $250
10. Social Media Management — From $150/mo
11. Content Writing & Copywriting — From $100
12. Logo & Brand Identity — From $150
13. Business Email Setup — From $30
- Currency: USD default, MMK accepted (1 USD ≈ 4,500 MMK)
- Payment: bank transfer / payment apps (KBZ, AYA, CB) — details shared after project confirmation

## TIMELINE (share only when asked)
- Landing page: 1–2 weeks. Business website: 2–4 weeks. E-commerce: 3–6 weeks. Custom AI chatbot: 2–4 weeks. Rush delivery available.

## FAQ
- International clients: Yes — Fiverr, Upwork, direct contracts. Communication in English.
- Support after launch: 1 month free, then maintenance plans from $30/mo.
- Portfolio: Available at /portfolio
- Domain & hosting: Full setup included in Hosting & Deploy plan.

## LANGUAGE
- Detect the language the customer writes in and reply in the same language (Burmese ↔ English).

## CONTACT
- Invite customers to the contact form or email info@nexusweblab.com when they're ready to proceed.
- **LEAD COLLECTION**: When the customer shows real interest (asks about starting, pricing, or wants to hire us), politely ask for their name, email, and phone number — one at a time — so our team can contact them.
- **LINK FORMAT**: Use clickable markdown links — [ဒီလင့်ခ်ကိုနှိပ်ပါ](https://nexusweblab.com/contact) or [View our portfolio](https://nexusweblab.com/portfolio). Never show raw URLs.
- If asked something outside this info, say you'll have the team follow up via email within 24 hours.`;

// ── COURSE BOT (course pages: fees, modules, enrollment) ──
const COURSE_GUIDELINE = `You are Nexus AI, the official virtual assistant for the "Nexus AI Freelance Mastery" online course by Nexus Web Lab. Your ONLY job is to answer questions about THIS COURSE — fees, modules, enrollment, payments, bonuses, support. You do NOT answer general web-development service questions (pricing of websites, e-commerce projects, etc.) — if a visitor asks about building a website for their business, politely say that's handled by Nexus Web Lab's main site and redirect them there.

## WHO YOU ARE (VERY IMPORTANT)
- You are "Nexus AI" — a virtual assistant / chatbot. You are NOT a human person and you are NOT the teacher.
- NEVER introduce yourself as a person with a name (never say "ကျွန်တော် [name]" / "I am [name]").
- NEVER claim to be the teacher (ဆရာ) or the course owner. If a student asks who the teacher is, give the teacher's name from the COURSE KNOWLEDGE section below (U Kaung Htut / ဆရာ ဦးကောင်းထွဋ်) — never invent a different name.

## ABOUT THE TEACHER (KNOW THIS)
- The course teacher is **U Kaung Htut (ဆရာ ဦးကောင်းထွဋ်)** — the founder of Nexus Web Lab.
- ⚠️ NEVER call him "ကိုကောင်း" or "Ko Kaung" — that is the WRONG name. His correct Burmese name is **ဦးကောင်းထွဋ်** (formal) or **ကိုကောင်းထွဋ်** (informal). The spelling "ဦးကောင်းထွတ်" is WRONG — use "ထွဋ်" not "ထွတ်".
- He is a web developer who works with AI tools (Next.js, React, AI agents, chatbots) and teaches freelancing skills.
- If a student asks "who teaches the course" / "ဆရာက ဘယ်သူလဲ", answer: U Kaung Htut (ဆရာ ဦးကောင်းထွဋ်). NEVER claim that YOU are the teacher.
- ⚠️ ANSWER DIRECTLY RULE: When the user asks about the teacher/founder (English or Burmese), you MUST answer the question directly in your FIRST reply — no greeting, no services list, no deflection. Start with the teacher name (U Kaung Htut / ဆရာ ဦးကောင်းထွဋ်).

## CONVERSATION RULES (VERY IMPORTANT)
1. FIRST GREETING ONLY: Greet ONLY on the very first message. Never repeat greetings in follow-up replies.
2. NO PRICING UNLESS ASKED: Never volunteer the course fee. Only share fees when the student explicitly asks about price / cost / "ဈေး" / "သင်တန်းကြေး".
3. STEP-BY-STEP: Answer one question at a time.
4. LANGUAGE: Reply in the same language the student writes in — Burmese students get Burmese answers, English gets English. Keep brand/tool names in English (Fiverr, Upwork, Botpress, v0.dev, Vercel, KBZPay).
5. MEMORY: You have access to the student's previous conversations in this same course context (loaded from memory). If they say "I asked before" or reference an earlier question, USE the remembered context to answer. NEVER claim you don't remember or don't store history when the conversation history is provided to you.

## COURSE KNOWLEDGE
${coursePromptSection()}

## LINK FORMAT
- Always use clickable markdown links — [ဒီမှာ စာရင်းသွင်းပါ](https://nexusweblab.com/course/register), [Login ဝင်ရန်](https://nexusweblab.com/course/login), [သင်တန်းအကြောင်း](https://nexusweblab.com/course). Never show raw URLs.
- If a student is having account/login problems, tell them to contact the teacher at info@nexusweblab.com or Viber 09945598825.`;

const API_URL = "https://api.deepseek.com/v1";
const API_KEY = process.env.DEEPSEEK_API_KEY || "";
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

const MAX_MEMORY = 60; // keep at most 60 stored messages per visitor per context

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

// ── HUMAN HANDOFF (v1, 2026-08-10) ──
// Visitor asks to talk to a real person → open a handoff request, notify the
// owner on Telegram, and surface staff replies (from /admin/chats) back to the
// visitor through the widget poll endpoint.
const HANDOFF_RE =
  /(talk|speak|chat|connect|contact|need|want|request).{0,24}(human|real person|staff|representative|agent|support team|customer support|customer service)|talk to human|real person|human agent|human support|လူနဲ့|လူ တစ်ယောက်|လူတစ်ယောက်|ဆရာနဲ့|staff နဲ့|human နဲ့|customer service/i;

async function ensureHandoff(visitorId: string, context: "website" | "course"): Promise<boolean> {
  try {
    const rows = await dbAll(
      "SELECT id FROM chat_handoffs WHERE visitor_id = ? AND context = ? AND status = 'open' LIMIT 1",
      [visitorId, context]
    );
    if (rows.length) return true; // already open — keep it
    await dbRun("INSERT INTO chat_handoffs (id, visitor_id, context, status) VALUES (?, ?, ?, 'open')", [
      randomUUID(),
      visitorId,
      context,
    ]);
    return true;
  } catch (e) {
    console.error("[chat] handoff create failed:", String(e).slice(0, 200));
    return false;
  }
}

async function loadStaffMessages(visitorId: string, context: string) {
  try {
    return await dbAll(
      "SELECT id, content FROM chat_staff_messages WHERE visitor_id = ? AND context = ? ORDER BY created_at ASC, rowid ASC",
      [visitorId, context]
    );
  } catch (e) {
    console.error("[chat] staff load failed:", String(e).slice(0, 200));
    return [];
  }
}

// ── AUTOMATION HELPERS (v1, 2026-08-10) ──
// 1) Language detection — returned to the widget so quick-replies + banners
//    localize to the visitor's language (Burmese ↔ English).
function detectLang(text: string): "mm" | "en" {
  return /[\u1000-\u109F]/.test(text) ? "mm" : "en";
}

// 2) Quote intent — "hire us / start a project / get a quote" → auto-create a
//    quote draft in /admin/quotes + Telegram alert (deduped 10 min per visitor).
const QUOTE_RE =
  /(get|need|want|request|ask for|have|like).{0,18}(quote|quotation|estimate)|hire (you|your team|nexus)|start (a|my|our) project|build (me|us|a) (website|web\s?sit|ecommerce|e-commerce|store|shop)|i want to order|order a website|start working with|quote လိုချင်|ဘတ်ဂျက် ရှိ|ဈေးနှုန်း လိုချင်|project စချင်|website ဆောက်ချင်/i;
const quoteAlerted = new Map<string, number>();

async function handleQuoteIntent(
  visitorId: string,
  context: "website" | "course",
  info: { name?: string; email?: string; phone?: string; service?: string } | null,
  lastMsg: string
) {
  try {
    const now = Date.now();
    if ((quoteAlerted.get(visitorId) || 0) > now - 10 * 60 * 1000) return; // dedupe 10 min
    quoteAlerted.set(visitorId, now);
    await dbRun("INSERT INTO quotes (id, name, email, phone, service, budget, timeline, message) VALUES (?,?,?,?,?,?,?,?)", [
      randomUUID(), info?.name || "", info?.email || "", info?.phone || "", info?.service || "Not specified", "", "", String(lastMsg).slice(0, 500),
    ]);
    void notifyTelegram(
      `📋 *NEW QUOTE REQUEST* (${context})\n\nVisitor: \`${visitorId.slice(0, 12)}…\`${info?.name ? `\n👤 Name: ${info.name}` : ""}${info?.email ? `\n📧 Email: ${info.email}` : ""}${info?.phone ? `\n📱 Phone: ${info.phone}` : ""}\n🌐 Service: ${info?.service || "?"}\n\n“${String(lastMsg).slice(0, 200)}”\n\n➡️ https://nexusweblab.com/admin/quotes`
    );
  } catch (e) {
    console.error("[chat] quote intent failed:", String(e).slice(0, 200));
  }
}

// 3) Handoff alert throttle — 1 alert per 10 min per visitor. A second ping while
//    waiting escalates to "STILL WAITING" instead of spamming.
const handoffAlerted = new Map<string, number>();

// 4) LEARNING SYSTEM — the bot improves from real customer experiences:
//    - loadKnowledge(): pull top-matching Q&A from the admin-approved KB and
//      inject it into the prompt so past answers become future answers.
//    - logUnanswered(): when the bot can't answer (fallback path), record the
//      question so the owner can teach the bot in /admin/learning.
const KB_STOP = new Set(["the","and","for","with","your","our","you","are","can","how","what","when","where","who","why","that","this","have","has","from","about","want","need","please","tell","know","မင်္ဂလာပါ","ပါ","ရဲ့","တယ်","လား"]);

async function loadKnowledge(text: string): Promise<string> {
  try {
    const rows = await dbAll("SELECT question, answer FROM kb_entries ORDER BY usage_count DESC, created_at DESC LIMIT 200");
    if (!rows.length) return "";
    const tokens = new Set(
      (text.toLowerCase().match(/[a-z0-9\u1000-\u109F]{3,}/g) || []).filter((t) => !KB_STOP.has(t))
    );
    const scored = rows
      .map((r: any) => {
        const qset = new Set(String(r.question).toLowerCase().match(/[a-z0-9\u1000-\u109F]{3,}/g) || []);
        let score = 0;
        tokens.forEach((t) => { if (qset.has(t)) score++; });
        return { q: String(r.question), a: String(r.answer), score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    if (!scored.length) return "";
    return (
      "\n\n## KNOWLEDGE BASE (learned from past customer experiences)\n" +
      "Use these Q&A when the customer's question matches. They are verified answers from the team.\n" +
      scored.map((x) => `Q: ${x.q}\nA: ${x.a}`).join("\n\n")
    );
  } catch (e) {
    console.error("[chat] KB load failed:", String(e).slice(0, 200));
    return "";
  }
}

async function logUnanswered(visitorId: string, question: string, reply: string) {
  try {
    const q = String(question).trim();
    if (!q) return;
    const existing = await dbAll("SELECT id FROM chat_learning WHERE question = ? LIMIT 1", [q.slice(0, 500)]);
    if (existing.length) return; // already in the learning pool
    await dbRun("INSERT INTO chat_learning (id, visitor_id, question, bot_reply, status, source) VALUES (?,?,?,?,'unanswered','fallback')", [
      randomUUID(), visitorId, q.slice(0, 500), String(reply).slice(0, 1000),
    ]);
  } catch (e) {
    console.error("[chat] learning log failed:", String(e).slice(0, 200));
  }
}

function websiteFallbackReply(text: string, isFirst: boolean): string {
  if (text.includes("price") || text.includes("cost") || text.includes("how much") || text.includes("budget") || text.includes("ဈေး")) {
    return "Our international pricing (USD):\n• Web Development — from $500\n• E-Commerce — from $800\n• UI/UX Design — from $300\n• SEO — from $200\n• Hosting — from $50/mo\n• Maintenance — from $30/mo\n\nWe also accept MMK (1 USD ≈ 4,500 MMK). Want a custom quote? Visit our contact page or email info@nexusweblab.com 😊";
  }
  if (text.includes("contact") || text.includes("email") || text.includes("phone") || text.includes("viber")) {
    return "You can reach us at:\n📧 info@nexusweblab.com\n📞 09945598825 (phone / Viber)\n📍 No.189, Kha 6 Street, Insein, Yangon\n\n[ဒီလင့်ခ်ကိုနှိပ်ပါ](https://nexusweblab.com/contact) — or we reply within 24 hours!";
  }
  if (isFirst) {
    return "Hello! 👋 Welcome to Nexus Web Lab! We offer the following services:\n\n1. Web Development\n2. E-Commerce\n3. UI/UX Design\n4. SEO\n5. Hosting & Deploy\n6. Maintenance\n7. AI Chatbot Integration\n\nHow can I help you today?";
  }
  return "Sure — how can I help you today? I can answer questions about our services, pricing, timeline, or contact details.";
}

export async function POST(req: NextRequest) {
  try {
    const { messages = [], visitorId = "", context = "website" } = await req.json();
    const ctx: "website" | "course" = context === "course" ? "course" : "website";
    const guideline = ctx === "course" ? COURSE_GUIDELINE : WEBSITE_GUIDELINE;

    // Normalize widget messages: ChatWidget sends {role, text} but DeepSeek
    // requires {role, content}. Accept both so the API never 400s.
    const normalized = (messages as any[]).map((m) => ({
      role: m?.role === "bot" ? "assistant" : (m?.role === "system" ? "system" : m?.role === "assistant" ? "assistant" : "user"),
      content: m?.content ?? m?.text ?? "",
    })).filter((m) => typeof m.content === "string" && m.content.trim().length > 0);

    // ── MEMORY: load THIS context's past conversations from Turso ──
    let memory: { role: string; content: string }[] = [];
    if (visitorId) {
      try {
        const rows = await dbAll(
          "SELECT role, content FROM chat_messages WHERE visitor_id = ? AND context = ? ORDER BY created_at DESC, rowid DESC LIMIT 16",
          [visitorId, ctx]
        );
        memory = rows
          .reverse()
          .map((r: any) => ({ role: r.role, content: String(r.content).slice(0, 2000) }));
      } catch (e) {
        console.error("[chat] memory load failed:", String(e).slice(0, 200));
      }
    }

    const lastUserContent = [...normalized].reverse().find((m) => m.role === "user")?.content || "";
    const text = String(lastUserContent).toLowerCase();

    // Learning: inject matching KB answers (learned from past experiences) into the prompt
    const knowledge = await loadKnowledge(text);

    // ── AUTOMATION (v1): language detect + nurture capture + quote intent ──
    const lang = detectLang(lastUserContent);
    const leadInfo = extractLeadInfo(normalized);
    if (leadInfo?.email && visitorId) {
      try {
        const existing = await dbAll("SELECT id FROM lead_nurture WHERE visitor_id = ? AND email = ? LIMIT 1", [
          visitorId,
          leadInfo.email,
        ]);
        if (!existing.length) {
          await dbRun("INSERT INTO lead_nurture (id, visitor_id, email, phone, name) VALUES (?, ?, ?, ?, ?)", [
            randomUUID(), visitorId, leadInfo.email, leadInfo.phone || "", leadInfo.name || "",
          ]);
        }
      } catch (e) {
        console.error("[chat] nurture capture failed:", String(e).slice(0, 200));
      }
    }
    if (visitorId && QUOTE_RE.test(text)) {
      await handleQuoteIntent(visitorId, ctx, leadInfo, lastUserContent);
    }

    // ── HUMAN HANDOFF: detect request, open handoff, inject staff replies ──
    const wantsHandoff = HANDOFF_RE.test(text);
    const staffMsgs = visitorId ? await loadStaffMessages(visitorId, ctx) : [];
    const lastStaff = staffMsgs.length ? String(staffMsgs[staffMsgs.length - 1].content) : null;
    const handoffWasOpen = visitorId
      ? !!((await dbAll("SELECT id FROM chat_handoffs WHERE visitor_id = ? AND context = ? AND status = 'open' LIMIT 1", [visitorId, ctx]).catch(() => [])) as any[]).length
      : false;
    let handoffActive = false;
    if (wantsHandoff && visitorId) {
      handoffActive = await ensureHandoff(visitorId, ctx);
      if (handoffActive) {
        // Let the LLM know staff already replied (if any) so it never contradicts them
        if (staffMsgs.length) {
          memory = [
            ...memory,
            ...staffMsgs.slice(-6).map((m: any) => ({
              role: "assistant",
              content: `[STAFF NOTE] ${String(m.content).slice(0, 1000)}`,
            })),
          ];
        }
        // Fire-and-forget Telegram alert with the recent transcript (throttled:
        // 1 per 10 min; a re-ping while waiting escalates to STILL WAITING)
        try {
          const nowTs = Date.now();
          const lastAlert = handoffAlerted.get(visitorId) || 0;
          if (nowTs - lastAlert >= 10 * 60 * 1000) {
            handoffAlerted.set(visitorId, nowTs);
            const rows = await dbAll(
              "SELECT role, content FROM chat_messages WHERE visitor_id = ? AND context = ? ORDER BY created_at DESC, rowid DESC LIMIT 10",
              [visitorId, ctx]
            );
            const transcript = rows
              .reverse()
              .map((r: any) => `${r.role === "user" ? "Customer" : "Bot"}: ${String(r.content).slice(0, 200)}`)
              .join("\n");
            const isMessenger = visitorId.startsWith("fb:");
            void notifyTelegram(
              `${handoffWasOpen ? "⚠️ *STILL WAITING — customer pinged again*" : "🤝 *HUMAN HANDOFF REQUESTED*"} (${ctx})\n\nVisitor: \`${visitorId.slice(0, 12)}…\`${isMessenger ? `\n📱 Messenger — PSID \`${visitorId.slice(3, 18)}…\`` : ""}\n\n${transcript}\n\n➡️ ${ctx === "course" ? "https://nexusweblab.com/course" : "https://nexusweblab.com"}/admin/chats${isMessenger ? "\n💬 Reply there → auto-pushes to Messenger" : ""}`
            );
          }
        } catch {}
      }
    }
    const extraFields = { handoff: handoffActive, staffReply: lastStaff, lang };

    // ── FOUNDER DIRECT-ANSWER OVERRIDE (deterministic — never wrong, never greets) ──
    // If the user asks about the founder/owner/teacher, answer immediately with the
    // hard-coded correct identity. No model call, no greeting, no deflection.
    const founderAsk =
      /founder|owner|who (is|owns|runs|built|created|started)|who runs nexus|ပိုင်ရှင်|တည်ထောင်|ဆရာက|ဆရာ က|teacher of the course|who teaches/.test(text);
    if (founderAsk) {
      const founderReply =
        ctx === "course"
          ? "The course teacher is **U Kaung Htut (ဆရာ ဦးကောင်းထွဋ်)** — the founder of Nexus Web Lab. He is a web developer who builds websites (Next.js, React, AI chatbots) and creates AI content. He wrote this course to teach Myanmar freelancers how to earn with AI. 😊"
          : "The founder & lead developer of Nexus Web Lab is **U Kaung Htut (ဦးကောင်းထွဋ်)**. He builds websites himself and creates content/videos using AI tools. Contact him directly: info@nexusweblab.com or Viber 09945598825. 😊";
      if (visitorId) await saveExchange(visitorId, ctx, normalized, founderReply);
      return NextResponse.json({ reply: founderReply, ...extraFields }, { headers: corsHeaders() });
    }

    // ── Local keyword fallback (context-aware) when no API key ──
    if (!API_KEY) {
      let reply: string;
      if (ctx === "course") {
        reply = courseFallbackReply(text) || websiteFallbackReply(text, normalized.length <= 1);
      } else {
        reply = websiteFallbackReply(text, normalized.length <= 1);
      }
      void logUnanswered(visitorId, lastUserContent, reply);
      if (visitorId) await saveExchange(visitorId, ctx, normalized, reply);
      return NextResponse.json({ reply, ...extraFields }, { headers: corsHeaders() });
    }

    // ── DeepSeek call with timeout + retry ──
    let reply = "";
    let lastErr: any = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 45000); // 45s hard timeout

        const isFirst = normalized.length <= 1 && memory.length === 0;
        const greetingHint = isFirst
          ? ""
          : "\n\nIMPORTANT: This is a FOLLOW-UP message — the customer has already been greeted. Do NOT greet again, do NOT say welcome/မင်္ဂလာပါ, do NOT re-list everything. Just answer their question directly.";

        const response = await fetch(`${API_URL}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL,
            stream: false,
            max_tokens: 800,
            messages: [
              { role: "system", content: guideline + knowledge + greetingHint },
              // Remembered history first (oldest → newest), then current session
              ...memory.slice(-12),
              ...normalized.slice(-12),
            ],
          }),
          signal: controller.signal,
        });
        clearTimeout(timer);

        if (!response.ok) {
          const err = await response.text();
          throw new Error(`DeepSeek ${response.status}: ${err.slice(0, 200)}`);
        }

        const data = await response.json();
        reply = data.choices?.[0]?.message?.content?.trim() || "";
        if (reply) break;
      } catch (err: any) {
        lastErr = err;
        console.error(`[chat] DeepSeek attempt ${attempt} failed:`, String(err?.message || err).slice(0, 200));
        if (attempt < 3) await new Promise((r) => setTimeout(r, 1200 * attempt));
      }
    }

    if (!reply) {
      console.error(`[chat] All ${3} retries failed; using local fallback. Last error:`, String(lastErr?.message || lastErr || 'unknown').slice(0, 300));
      const fallback = ctx === "course"
        ? (courseFallbackReply(text) || websiteFallbackReply(text, normalized.length <= 1))
        : websiteFallbackReply(text, normalized.length <= 1);
      void logUnanswered(visitorId, lastUserContent, fallback);
      if (visitorId) await saveExchange(visitorId, ctx, normalized, fallback);
      return NextResponse.json({ reply: fallback, ...extraFields }, { headers: corsHeaders() });
    }

    // Persist the exchange so the bot remembers this student next time
    if (visitorId) await saveExchange(visitorId, ctx, normalized, reply);
    return NextResponse.json({ reply, ...extraFields }, { headers: corsHeaders() });
  } catch (e: any) {
    return NextResponse.json(
      { reply: "Sorry, I'm having a temporary connection issue. Please try again or email info@nexusweblab.com 😊", error: String(e?.message || e).slice(0, 200) },
      { status: 200, headers: corsHeaders() }
    );
  }
}

async function saveExchange(visitorId: string, context: "website" | "course", normalized: { role: string; content: string }[], reply: string) {
  try {
    // Persist only the latest user message + bot reply (avoid duplicates from re-sends)
    const lastUser = [...normalized].reverse().find((m) => m.role === "user");
    if (lastUser && lastUser.content.trim()) {
      await dbRun("INSERT INTO chat_messages (id, visitor_id, role, content, context) VALUES (?, ?, 'user', ?, ?)", [
        randomUUID(), visitorId, lastUser.content.slice(0, 4000), context,
      ]);
    }
    if (reply.trim()) {
      await dbRun("INSERT INTO chat_messages (id, visitor_id, role, content, context) VALUES (?, ?, 'assistant', ?, ?)", [
        randomUUID(), visitorId, reply.slice(0, 4000), context,
      ]);
    }
    // Prune old messages for this visitor + context (keep the most recent MAX_MEMORY)
    await dbRun(
      `DELETE FROM chat_messages WHERE visitor_id = ? AND context = ? AND id NOT IN (
         SELECT id FROM chat_messages WHERE visitor_id = ? AND context = ? ORDER BY created_at DESC, rowid DESC LIMIT ?
       )`,
      [visitorId, context, visitorId, context, MAX_MEMORY]
    );
  } catch (e) {
    console.error("[chat] memory save failed:", String(e).slice(0, 200));
  }
}
