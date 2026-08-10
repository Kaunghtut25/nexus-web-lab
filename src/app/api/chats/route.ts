import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../admin/auth-guard";
import { dbAll } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/chats — admin:
//   no params → conversation list (visitor, context, msg count, last activity, handoff flag)
//   ?visitor=&context= → full transcript of that conversation
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const url = new URL(req.url);
  const visitor = url.searchParams.get("visitor");
  const context = url.searchParams.get("context") || "website";
  try {
    if (visitor) {
      const rows = await dbAll(
        "SELECT role, content, created_at FROM chat_messages WHERE visitor_id = ? AND context = ? ORDER BY created_at ASC, rowid ASC",
        [visitor, context]
      );
      return NextResponse.json({ messages: rows });
    }
    const rows = await dbAll(
      `SELECT c.visitor_id, c.context, COUNT(*) AS cnt, MAX(c.created_at) AS last_ts,
        (SELECT c2.content FROM chat_messages c2 WHERE c2.visitor_id = c.visitor_id AND c2.context = c.context ORDER BY c2.created_at DESC, c2.rowid DESC LIMIT 1) AS last_msg
       FROM chat_messages c GROUP BY c.visitor_id, c.context ORDER BY last_ts DESC LIMIT 100`
    );
    const handoffs = await dbAll("SELECT visitor_id, context FROM chat_handoffs WHERE status = 'open'");
    const openMap = new Set(handoffs.map((h: any) => `${h.visitor_id}|${h.context}`));
    const chats = rows.map((r: any) => ({
      visitor_id: r.visitor_id,
      context: r.context,
      cnt: r.cnt,
      last_ts: r.last_ts,
      last_msg: r.last_msg,
      handoff: openMap.has(`${r.visitor_id}|${r.context}`),
    }));
    return NextResponse.json({ chats });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}
