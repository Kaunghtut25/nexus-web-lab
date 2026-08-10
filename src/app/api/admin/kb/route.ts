import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../auth-guard";
import { dbRun, dbAll } from "@/lib/db";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET  /api/admin/kb — list knowledge base entries
// POST /api/admin/kb — create a KB entry {question, answer, lang?}
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  try {
    const rows = await dbAll("SELECT id, question, answer, lang, source, usage_count, created_at FROM kb_entries ORDER BY created_at DESC LIMIT 500");
    return NextResponse.json({ entries: rows });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await req.json();
    const question = String(body?.question || "").trim();
    const answer = String(body?.answer || "").trim();
    const lang = body?.lang === "mm" ? "mm" : "en";
    if (!question || !answer) {
      return NextResponse.json({ error: "question and answer required" }, { status: 400 });
    }
    await dbRun("INSERT INTO kb_entries (id, question, answer, lang, source) VALUES (?,?,?,?, 'manual')", [
      randomUUID(), question.slice(0, 500), answer.slice(0, 4000), lang,
    ]);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}
