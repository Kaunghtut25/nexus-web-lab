// Lead notification module — informs the site owner on Telegram when:
//  1. The chatbot collects client information (name/email/phone/project intent)
//  2. A visitor submits the contact form directly
// Channel: Telegram bot (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID)

export interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  website_type?: string;
  budget?: string;
  timeline?: string;
  features?: string[];
  details?: string;
  source?: string; // "chatbot" | "contact-form"
  chat_transcript?: string;
  created_at?: string;
}

export function formatLeadText(lead: LeadPayload): string {
  const sourceLabel = lead.source === "chatbot" ? "💬 Chatbot Lead" : "📝 Contact Form";
  const lines = [
    `🆕 *New Client Inquiry — Nexus Web Lab*`,
    `🔗 Source: ${sourceLabel}`,
    "",
    `👤 Name: ${lead.name || "—"}`,
    `📧 Email: ${lead.email || "—"}`,
    `📱 Phone: ${lead.phone || "—"}`,
    `🌐 Service: ${lead.website_type || "—"}`,
    `💰 Budget: ${lead.budget || "—"}`,
    `⏱ Timeline: ${lead.timeline || "—"}`,
  ];
  if (lead.features && lead.features.length) lines.push(`🧩 Features: ${lead.features.join(", ")}`);
  if (lead.details) lines.push(`📝 Details: ${lead.details}`);
  if (lead.chat_transcript) {
    lines.push("", "💬 *Chat Transcript:*");
    lines.push("```", lead.chat_transcript.slice(0, 1800), "```");
  }
  lines.push("", "📅 " + (lead.created_at || new Date().toISOString()));
  return lines.join("\n");
}

// Fire-and-forget Telegram notification. Returns true if delivered.
export async function notifyTelegram(text: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    console.error("[notify] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing");
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("[notify] Telegram failed:", err.slice(0, 300));
      // Retry once without Markdown (Markdown parse errors are common)
      const res2 = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: text.replace(/[*_`]/g, "") }),
      });
      return res2.ok;
    }
    return true;
  } catch (e: any) {
    console.error("[notify] Telegram error:", e.message);
    return false;
  }
}

export async function notifyLead(lead: LeadPayload): Promise<boolean> {
  // Deliver via email (Zoho SMTP) AND Telegram — dual channel so the owner
  // never misses an inquiry even if one channel fails.
  let emailOk = false;
  try {
    const { emailLead } = await import("./email");
    emailOk = await emailLead(lead);
  } catch (e: any) {
    console.error("[notify] email hook error:", String(e?.message || e).slice(0, 200));
  }
  const tgOk = await notifyTelegram(formatLeadText(lead));
  return emailOk || tgOk;
}
