import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN || "";
const PAGE_ID = process.env.FB_PAGE_ID || "1226578897211016"; // Nexus Web Lab page

// POST /api/fb-post — publish a text post to the Facebook Page.
// Protected by the same admin Bearer-token auth as the rest of the admin panel.
export async function POST(req: NextRequest) {
  try {
    // Admin auth (Bearer token from admin login)
    const { requireAuth } = await import("../admin/auth-guard");
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth; // 401 JSON if not logged in

    const body = await req.json().catch(() => ({}));
    const message = String(body.message || "").trim();
    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }
    if (!PAGE_ACCESS_TOKEN) {
      return NextResponse.json({ error: "FB_PAGE_ACCESS_TOKEN not set — regenerate token with pages_manage_posts" }, { status: 500 });
    }

    const res = await fetch(`https://graph.facebook.com/v21.0/${PAGE_ID}/feed?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.slice(0, 5000) }),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data?.error?.message || `Graph ${res.status}` }, { status: res.status });
    }
    return NextResponse.json({ success: true, post_id: data.id });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 300) }, { status: 500 });
  }
}
