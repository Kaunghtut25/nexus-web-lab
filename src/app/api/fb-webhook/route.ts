import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────
// NEXUS WEB LAB — FACEBOOK MESSENGER WEBHOOK
// Lets the same Nexus AI chatbot answer Facebook Page messages.
//
// 1. GET  → Facebook webhook verification (hub.challenge)
// 2. POST → incoming Messenger messages → reuses /api/chat →
//           replies via Messenger Send API (Graph API)
//
// Env vars (Vercel):
//   FB_VERIFY_TOKEN      → secret you type into the Facebook
//                          "Configure webhooks" form
//   FB_PAGE_ACCESS_TOKEN → Page Access Token from Facebook
//                          App → Messenger → Generate Token
// ─────────────────────────────────────────────────────────────

const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || "";
const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN || "";
const GRAPH_API = "https://graph.facebook.com/v21.0/me/messages";

// ── GET: Facebook webhook verification handshake ──
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  console.log("[fb-webhook] GET received. mode =", mode, "| token match =", token ? (token === VERIFY_TOKEN ? "YES" : "NO (wrong token)") : "none", "| has challenge =", !!challenge);
  console.log("[fb-webhook] VERIFY_TOKEN set =", VERIFY_TOKEN ? "yes" : "NO — env missing!");

  // Verify token must match the one set in env + Facebook console
  if (mode === "subscribe" && token && VERIFY_TOKEN && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
  return new NextResponse("Verification failed", { status: 403 });
}

// ── POST: receive Messenger events ──
export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Facebook sends a subscription confirmation body with object:"page"
  if (body.object !== "page") {
    return NextResponse.json({ error: "Not a page event" }, { status: 404 });
  }

  const jobs: { senderId: string; text: string }[] = [];
  for (const entry of body.entry || []) {
    for (const event of entry.messaging || []) {
      const senderId = event.sender?.id;
      const messageText = event.message?.text;
      if (senderId && messageText) {
        jobs.push({ senderId, text: messageText });
      }
    }
  }

  // Acknowledge instantly (Facebook requires a fast 200), then run the
  // reply work via `after()` — guaranteed to complete on Vercel even
  // though the response is already sent. (fire-and-forget `void` was
  // getting killed before the Messenger reply was sent → "No reply")
  console.log("[fb-webhook] POST received. object =", body.object, "| entries =", (body.entry || []).length, "| jobs =", JSON.stringify(jobs));
  if (jobs.length > 0) {
    after(async () => {
      for (const job of jobs) {
        try {
          console.log("[fb-webhook] processing message from", job.senderId, ":", job.text.slice(0, 50));
          await handleMessage(job.senderId, job.text);
          console.log("[fb-webhook] done processing", job.senderId);
        } catch (e: any) {
          console.error("[fb-webhook] handleMessage error:", e?.message || e);
        }
      }
    });
  }

  return NextResponse.json({ received: true });
}

// ── Process one incoming message ──
async function handleMessage(senderId: string, text: string) {
  // 1. Reuse the same Nexus AI chatbot logic (website context, own memory per FB user)
  const origin = "https://nexusweblab.com";
  const chatRes = await fetch(`${origin}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: text }],
      visitorId: `fb:${senderId}`,
      context: "website",
    }),
  });

  let reply = "Sorry, I couldn't process that right now. Please try again or contact Nexus Web Lab directly at info@nexusweblab.com.";
  if (chatRes.ok) {
    const data = await chatRes.json();
    if (data.reply) reply = data.reply;
  }

  // 2. Send the reply back through Messenger
  if (!PAGE_ACCESS_TOKEN) {
    console.error("[fb-webhook] FB_PAGE_ACCESS_TOKEN not set — cannot send reply");
    return;
  }

  const sendRes = await fetch(`${GRAPH_API}?access_token=${PAGE_ACCESS_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: senderId },
      messaging_type: "RESPONSE",
      message: { text: reply },
    }),
  });

  if (!sendRes.ok) {
    const errText = await sendRes.text();
    console.error(`[fb-webhook] Send API failed (${sendRes.status}):`, errText.slice(0, 500));
  }
}
