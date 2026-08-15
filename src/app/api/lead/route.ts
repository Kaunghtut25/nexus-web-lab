import { NextRequest, NextResponse } from "next/server";
import { deliverLeadOnce, ChatMessage } from "@/lib/lead";
import { guardForm } from "@/lib/form-guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/lead — the chat widget calls this ONCE per conversation (after a
// short debounce) with the FULL message history. The server extracts all
// client info and delivers ONE consolidated Telegram message.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Cheap spam/abuse gate (rate limit + honeypot) without blocking legit chats.
    const guard = guardForm(req, body, []);
    if (!guard.ok) return NextResponse.json({ success: false, error: guard.error }, { status: guard.status });
    const messages: ChatMessage[] = (Array.isArray(body?.messages) ? body.messages : []).map((m: { role?: string; content?: unknown; text?: unknown }) => ({
      role: m?.role === "bot" ? "assistant" : m?.role === "user" ? "user" : "assistant",
      content: m?.content ?? m?.text ?? "",
    })).filter((m: ChatMessage) => typeof m.content === "string" && m.content.trim().length > 0);

    const result = await deliverLeadOnce(messages, { source: "chatbot" });
    return NextResponse.json({ success: result.delivered, info: result.info || null });
  } catch (e: any) {
    console.error("[lead] endpoint error:", String(e?.message || e).slice(0, 200));
    return NextResponse.json({ success: false, error: "failed" }, { status: 200 });
  }
}
