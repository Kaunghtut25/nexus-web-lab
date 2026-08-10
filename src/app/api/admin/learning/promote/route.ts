import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../auth-guard";
import { dbRun, dbAll } from "@/lib/db";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/admin/learning/promote
// { learningId, action: "promote"|"ignore", answer? }
//  - promote → turns a learning item (unanswered question or staff Q&A) into a
//    permanent KB entry (answer = provided or the learning item's bot_reply)
//  - ignore → marks it so it disappears from the review queue
export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await req.json();
    const learningId = String(body?.learningId || "");
    const action = body?.action === "ignore" ? "ignore" : "promote";
    if (!learningId) return NextResponse.json({ error: "learningId required" }, { status: 400 });

    const rows = await dbAll("SELECT id, question, bot_reply, status FROM chat_learning WHERE id = ?", [learningId]);
    if (!rows.length) return NextResponse.json({ error: "learning item not found" }, { status: 404 });

    if (action === "ignore") {
      await dbRun("UPDATE chat_learning SET status = 'ignored' WHERE id = ?", [learningId]);
      return NextResponse.json({ ok: true, action });
    }

    const answer = String(body?.answer || "").trim() || String(rows[0].bot_reply || "").trim();
    const question = String(rows[0].question || "").trim();
    if (!answer) {
      return NextResponse.json({ error: "no answer available — provide one" }, { status: 400 });
    }
    // Upsert into KB (avoid duplicate question)
    const dup = await dbAll("SELECT id FROM kb_entries WHERE question = ? LIMIT 1", [question]);
    if (dup.length) {
      await dbRun("UPDATE kb_entries SET answer = ? WHERE id = ?", [answer.slice(0, 4000), dup[0].id]);
    } else {
      await dbRun("INSERT INTO kb_entries (id, question, answer, lang, source) VALUES (?,?,?, 'en', 'learning')", [
        randomUUID(), question.slice(0, 500), answer.slice(0, 4000),
      ]);
    }
    await dbRun("UPDATE chat_learning SET status = 'saved' WHERE id = ?", [learningId]);
    return NextResponse.json({ ok: true, action: "promote" });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}
