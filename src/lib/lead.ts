// Shared lead extraction — pulls client contact info out of a chat transcript.
// Used by /api/lead (chatbot finalize) and reusable for future surfaces.
import { notifyLead, LeadPayload } from "./notify";
import { dbRun } from "./db";
import { v4 as uuid } from "uuid";

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
// Phone: allow spaces/dashes between groups: 09 123 456 789, 09777555444, +959777555444
const PHONE_RE = /\+?95[\s-]?0?9[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3,4}|0?9[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3,4}|0?9\d{7,10}/;
// The company's own contact info — never report it as a client lead
const COMPANY_EMAIL = "info@nexusweblab.com";
const COMPANY_PHONE = "09945598825";

export interface ChatMessage {
  role: string;
  content: string;
}

export interface ExtractedLead {
  email?: string;
  phone?: string;
  name?: string;
  service?: string;
}

export function extractLeadInfo(messages: ChatMessage[]): ExtractedLead | null {
  const all = messages.map((m) => m.content || "").join(" ");
  // Only scan USER messages for personal info — bot replies contain the
  // company's own email/phone which must never be captured as a lead.
  const userTexts = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content || "")
    .join(" ");
  const info: ExtractedLead = {};

  const email = userTexts.match(EMAIL_RE);
  if (email && email[0].toLowerCase() !== COMPANY_EMAIL) info.email = email[0];

  const phone = userTexts.match(PHONE_RE);
  if (phone && phone[0].replace(/[\s-]/g, "") !== COMPANY_PHONE.replace(/[\s-]/g, "")) {
    info.phone = phone[0];
  }

  // Name: scan each user message separately; cap at 3 words and stop before an
  // email address ("My name is Aung Ko aungko@example.com" → "Aung Ko").
  const nameRe = /(?:my name is|i am|i'm|name is)\s+([A-Za-z\u1000-\u109F]+(?:\s+[A-Za-z\u1000-\u109F]+){0,2})(?=[\s,.!?]|$)/i;
  for (const m of messages) {
    if (m.role !== "user") continue;
    const nm = m.content.match(nameRe);
    if (nm && nm[1]) {
      info.name = nm[1].trim();
      break;
    }
  }

  const serviceKeywords = [
    { k: /web\s?site|web\s?dev|portfolio/i, v: "Web Development" },
    { k: /e-?commerce|online\s?store|shop/i, v: "E-Commerce" },
    { k: /ui|ux|design/i, v: "UI/UX Design" },
    { k: /seo/i, v: "SEO" },
    { k: /host|deploy|domain/i, v: "Hosting & Deploy" },
    { k: /mainten/i, v: "Maintenance" },
    { k: /chatbot|chat\s?bot|ai\s?agent/i, v: "AI Chatbot" },
  ];
  for (const s of serviceKeywords) {
    if (s.k.test(all)) {
      info.service = s.v;
      break;
    }
  }

  // Only treat as a lead when the client actually shared contact info
  if (!info.email && !info.phone) return null;
  return info;
}

export function buildTranscript(messages: ChatMessage[], max = 10): string {
  return messages
    .slice(-max)
    .map((m) => `${m.role === "user" ? "Customer" : "Nexus AI"}: ${m.content}`)
    .join("\n");
}

// Send ONE consolidated Telegram message for the whole conversation.
export async function deliverLeadOnce(
  messages: ChatMessage[],
  options?: { source?: "chatbot" | "contact-form"; dedupeKey?: string }
): Promise<{ delivered: boolean; info: ExtractedLead | null }> {
  const info = extractLeadInfo(messages);
  if (!info) return { delivered: false, info: null };

  const key = options?.dedupeKey || buildTranscript(messages).slice(-400);
  if (deliveredLeads.has(key)) return { delivered: false, info }; // already sent
  deliveredLeads.add(key);

  const payload: LeadPayload = {
    name: info.name,
    email: info.email,
    phone: info.phone,
    website_type: info.service,
    details: "Client shared contact info — follow up with them.",
    source: options?.source || "chatbot",
    chat_transcript: buildTranscript(messages),
  };

  // Save lead to database for admin panel
  try {
    await dbRun(
      'INSERT INTO leads (id, name, email, phone, service, message, source) VALUES (?,?,?,?,?,?,?)',
      [uuid(), info.name || 'Anonymous', info.email || '', info.phone || '', info.service || '', buildTranscript(messages, 5).slice(0, 500), options?.source || 'chatbot']
    );
  } catch (e) {
    console.error('[lead] Failed to save lead to DB:', e);
  }

  const ok = await notifyLead(payload);
  if (ok) console.log("[lead] Delivered to Telegram");
  return { delivered: ok, info };
}

// Per-instance dedupe so the same conversation is never double-sent.
const deliveredLeads = new Set<string>();
