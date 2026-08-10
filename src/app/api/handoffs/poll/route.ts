import { NextRequest, NextResponse } from "next/server";
import { dbAll } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/handoffs/poll — public (visitor-side): pending staff messages.
// The chat widget polls this while a handoff is active. afterId = last seen id.
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const visitorId = url.searchParams.get("visitorId") || "";
  const context = url.searchParams.get("context") === "course" ? "course" : "website";
  const afterId = url.searchParams.get("afterId") || "";
  if (!visitorId) return NextResponse.json({ messages: [] });
  try {
    const rows = await dbAll(
      "SELECT id, content, created_at FROM chat_staff_messages WHERE visitor_id = ? AND context = ? ORDER BY created_at ASC, rowid ASC",
      [visitorId, context]
    );
    let messages = rows;
    if (afterId) {
      const idx = rows.findIndex((r: any) => r.id === afterId);
      if (idx >= 0) messages = rows.slice(idx + 1);
    }
    return NextResponse.json({ messages });
  } catch (e) {
    console.error("[handoffs] poll failed:", String(e).slice(0, 200));
    return NextResponse.json({ messages: [] });
  }
}
