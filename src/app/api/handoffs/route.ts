import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../admin/auth-guard";
import { dbAll } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/handoffs — admin: open handoff queue with visitor transcripts
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  try {
    const rows = await dbAll(
      `SELECT h.visitor_id, h.context, h.requested_at,
        (SELECT COUNT(*) FROM chat_messages c WHERE c.visitor_id = h.visitor_id AND c.context = h.context) AS msg_count,
        (SELECT content FROM chat_messages c WHERE c.visitor_id = h.visitor_id AND c.context = h.context ORDER BY created_at DESC, rowid DESC LIMIT 1) AS last_msg
       FROM chat_handoffs h WHERE h.status = 'open' ORDER BY h.requested_at ASC`
    );
    return NextResponse.json({ handoffs: rows });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}
