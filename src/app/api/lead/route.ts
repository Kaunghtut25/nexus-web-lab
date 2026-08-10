import { NextRequest, NextResponse } from "next/server";
import { deliverLeadOnce, ChatMessage } from "@/lib/lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/lead — the chat widget calls this ONCE per conversation (after a
// short debounce) with the FULL message history. The server extracts all
// client info and delivers ONE consolidated Telegram message.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = (body?.messages || []).map((m: any) => ({
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
