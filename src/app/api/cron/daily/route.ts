import { NextRequest, NextResponse } from "next/server";
import { dbRun, dbAll } from "@/lib/db";
import { notifyTelegram } from "@/lib/notify";
import { sendInquiryEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/cron/daily — called by Vercel Cron (vercel.json) every morning.
// Guarded by CRON_SECRET env var (header x-cron-secret or Bearer token).
// 1) Sends a daily automation digest to Telegram (leads, quotes, handoffs, chats)
// 2) Fires the nurture follow-up email for leads captured >= 6h ago
export async function GET(req: NextRequest) {
  const secret =
    req.headers.get("x-cron-secret") ||
    (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10); // UTC date
  try {
    const leads = await dbAll("SELECT COUNT(*) AS c FROM leads WHERE created_at >= ?", [today]);
    const quotes = await dbAll("SELECT COUNT(*) AS c FROM quotes WHERE created_at >= ?", [today]);
    const handoffs = await dbAll("SELECT COUNT(*) AS c FROM chat_handoffs WHERE status = 'open'");
    const chats = await dbAll("SELECT COUNT(DISTINCT visitor_id) AS c FROM chat_messages WHERE created_at >= ?", [today]);
    const pending = await dbAll(
      `SELECT h.visitor_id, h.context, h.requested_at FROM chat_handoffs h
       WHERE h.status = 'open' AND (SELECT COUNT(*) FROM chat_staff_messages s WHERE s.visitor_id = h.visitor_id AND s.context = h.context) = 0
       ORDER BY h.requested_at ASC LIMIT 10`
    );

    // Nurture follow-ups: contact info captured >= 6h ago, not yet emailed
    const nurture = await dbAll(
      "SELECT id, email, name FROM lead_nurture WHERE followup_sent_at IS NULL AND captured_at <= datetime('now', '-6 hours') LIMIT 5"
    );
    let nurtured = 0;
    for (const n of nurture) {
      if (!n.email) continue;
      const ok = await sendInquiryEmail({
        subject: "Thanks for your interest in Nexus Web Lab! 💙",
        text: `Hi${n.name ? " " + n.name : ""},\n\nThanks for reaching out to Nexus Web Lab! Our team will get back to you within 24 hours.\n\nMeanwhile, check out our portfolio: https://nexusweblab.com/portfolio\n\nBest regards,\nNexus Web Lab (Yangon)`,
        to: String(n.email),
      });
      if (ok) {
        await dbRun("UPDATE lead_nurture SET followup_sent_at = datetime('now') WHERE id = ?", [n.id]);
        nurtured++;
      }
    }

    const pendingTxt = pending.length
      ? "\n\n⏳ *Unanswered handoffs:*" + pending.map((h: any) => `\n• ${h.visitor_id.slice(0, 12)}… (${h.context}, ${h.requested_at})`).join("")
      : "";
    const msg =
      `📊 *DAILY AUTOMATION REPORT* — Nexus Web Lab\n\n📅 ${today}\n\n` +
      `💬 Active visitors: ${chats[0]?.c || 0}\n🆕 New leads: ${leads[0]?.c || 0}\n📋 New quotes: ${quotes[0]?.c || 0}\n` +
      `🤝 Open handoffs: ${handoffs[0]?.c || 0}\n📧 Nurture emails sent: ${nurtured}${pendingTxt}\n\n➡️ https://nexusweblab.com/admin`;
    const delivered = await notifyTelegram(msg);

    return NextResponse.json({
      ok: true,
      delivered,
      leads: leads[0]?.c || 0,
      quotes: quotes[0]?.c || 0,
      handoffs: handoffs[0]?.c || 0,
      visitors: chats[0]?.c || 0,
      nurtured,
    });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}
