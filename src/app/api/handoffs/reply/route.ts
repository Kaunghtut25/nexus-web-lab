import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../admin/auth-guard";
import { dbRun, dbAll } from "@/lib/db";
import { sendMessenger } from "@/lib/messenger";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/handoffs/reply — admin: staff writes a reply the visitor sees in chat.
// Creates/keeps an open handoff so the widget keeps polling.
export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await req.json();
    const visitorId = String(body?.visitorId || "").trim();
    const context = body?.context === "course" ? "course" : "website";
    const text = String(body?.text || "").trim();
    if (!visitorId || !text) {
      return NextResponse.json({ error: "visitorId and text required" }, { status: 400 });
    }
    await dbRun(
      "INSERT INTO chat_staff_messages (id, visitor_id, context, content) VALUES (?, ?, ?, ?)",
      [randomUUID(), visitorId, context, text.slice(0, 4000)]
    );
    // Make sure a handoff exists so the visitor keeps polling
    const existing = await dbAll(
      "SELECT id FROM chat_handoffs WHERE visitor_id = ? AND context = ? AND status = 'open' LIMIT 1",
      [visitorId, context]
    );
    if (!existing.length) {
      await dbRun("INSERT INTO chat_handoffs (id, visitor_id, context, status) VALUES (?, ?, ?, 'open')", [
        randomUUID(),
        visitorId,
        context,
      ]);
    }
    // Messenger push: visitors who chat from Facebook Messenger (fb:<PSID>)
    // get the staff reply delivered straight into their Messenger thread.
    if (visitorId.startsWith("fb:")) {
      const ok = await sendMessenger(visitorId.slice(3), text);
      if (!ok) console.error("[handoffs] Messenger push failed for", visitorId.slice(0, 15));
    }
    // LEARNING: auto-propose this staff answer as a knowledge candidate — the
    // owner reviews it in /admin/learning and one click promotes it to the KB.
    try {
      const lastQ = await dbAll(
        "SELECT content FROM chat_messages WHERE visitor_id = ? AND context = ? AND role = 'user' ORDER BY created_at DESC, rowid DESC LIMIT 1",
        [visitorId, context]
      );
      if (lastQ.length) {
        const qText = String(lastQ[0].content).slice(0, 500);
        const dup = await dbAll("SELECT id FROM chat_learning WHERE question = ? LIMIT 1", [qText]);
        if (!dup.length) {
          await dbRun("INSERT INTO chat_learning (id, visitor_id, question, bot_reply, status, source) VALUES (?,?,?,?,'proposed','staff-reply')", [
            randomUUID(), visitorId, qText, text.slice(0, 1000),
          ]);
        }
      }
    } catch {}
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}
