import { NextResponse, NextRequest } from "next/server";
import { dbAll } from "@/lib/db";
import { requireAuth } from "../auth-guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Chat & business analytics for /admin/analytics
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  try {
    const [chats, messages, leads, handoffs, unanswered, feedback, kb, trend, topQ, leadSources, handoffStatus, recentFeedback] =
      await Promise.all([
        dbAll("SELECT COUNT(DISTINCT visitor_id) AS c FROM chat_messages"),
        dbAll("SELECT COUNT(*) AS c FROM chat_messages"),
        dbAll("SELECT COUNT(*) AS c FROM leads"),
        dbAll("SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) AS open FROM chat_handoffs"),
        dbAll("SELECT COUNT(*) AS c FROM chat_learning WHERE status = 'unanswered'"),
        dbAll("SELECT COALESCE(SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END), 0) AS pos, COALESCE(SUM(CASE WHEN rating = -1 THEN 1 ELSE 0 END), 0) AS neg FROM chat_feedback"),
        dbAll("SELECT COUNT(*) AS c, COALESCE(SUM(usage_count), 0) AS usage FROM kb_entries"),
        dbAll(
          "SELECT substr(created_at, 1, 10) AS day, COUNT(DISTINCT visitor_id) AS chats, COUNT(*) AS msgs FROM chat_messages WHERE created_at >= datetime('now', '-13 days') GROUP BY substr(created_at, 1, 10) ORDER BY day"
        ),
        dbAll("SELECT content AS q, COUNT(*) AS c FROM chat_messages WHERE role = 'user' GROUP BY content ORDER BY c DESC LIMIT 10"),
        dbAll("SELECT COALESCE(source, 'direct') AS source, COUNT(*) AS c FROM leads GROUP BY source ORDER BY c DESC"),
        dbAll("SELECT status, COUNT(*) AS c FROM chat_handoffs GROUP BY status"),
        dbAll("SELECT visitor_id, question, rating, created_at FROM chat_feedback ORDER BY created_at DESC LIMIT 10"),
      ]);

    const row = (r: any[], k: string) => Number(String((r as any)[0]?.[k] ?? 0));
    return NextResponse.json({
      chats: row(chats, "c"),
      messages: row(messages, "c"),
      leads: row(leads, "c"),
      handoffs: { total: row(handoffs, "total"), open: row(handoffs, "open") },
      unanswered: row(unanswered, "c"),
      feedback: { pos: row(feedback, "pos"), neg: row(feedback, "neg") },
      kb: { count: row(kb, "c"), usage: row(kb, "usage") },
      trend,
      topQ,
      leadSources,
      handoffStatus,
      recentFeedback,
    });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}
