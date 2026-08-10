import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../admin/auth-guard";
import { dbRun } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/handoffs/close — admin: mark an open handoff as resolved
export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await req.json();
    const visitorId = String(body?.visitorId || "").trim();
    const context = body?.context === "course" ? "course" : "website";
    if (!visitorId) {
      return NextResponse.json({ error: "visitorId required" }, { status: 400 });
    }
    await dbRun(
      "UPDATE chat_handoffs SET status = 'closed', resolved_at = datetime('now') WHERE visitor_id = ? AND context = ? AND status = 'open'",
      [visitorId, context]
    );
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}
