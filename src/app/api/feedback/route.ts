import { NextRequest, NextResponse } from "next/server";
import { dbRun } from "@/lib/db";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/feedback — public (chat widget): visitor rates a bot answer
// rating: 1 (helpful) | -1 (not helpful)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const visitorId = String(body?.visitorId || "").slice(0, 100);
    const question = String(body?.question || "").slice(0, 500);
    const reply = String(body?.reply || "").slice(0, 1000);
    const rating = body?.rating === -1 ? -1 : 1;
    if (!visitorId) return NextResponse.json({ error: "visitorId required" }, { status: 400 });
    await dbRun("INSERT INTO chat_feedback (id, visitor_id, question, reply, rating) VALUES (?,?,?,?,?)", [
      randomUUID(), visitorId, question, reply, rating,
    ]);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}
