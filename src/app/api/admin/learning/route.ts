import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../auth-guard";
import { dbAll } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/learning — learning pool + visitor feedback
//  - learning: questions the bot couldn't answer (unanswered) and staff
//    Q&A proposals (proposed) — the owner promotes these to the KB
//  - feedback: visitor 👍/👎 ratings
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  try {
    const learning = await dbAll(
      "SELECT id, visitor_id, question, bot_reply, status, source, created_at FROM chat_learning WHERE status IN ('unanswered','proposed') ORDER BY created_at DESC LIMIT 300"
    );
    const feedback = await dbAll(
      "SELECT id, visitor_id, question, reply, rating, created_at FROM chat_feedback ORDER BY created_at DESC LIMIT 200"
    );
    return NextResponse.json({ learning, feedback });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}
