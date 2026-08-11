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
const GRAPH_PROFILE_API = "https://graph.facebook.com/v21.0";

// Cache sender first names (PSID → first name) for 30 min to avoid hammering the
// Graph API on every message. Facebook names rarely change mid-conversation.
const nameCache = new Map<string, { name: string; at: number }>();
const NAME_CACHE_MS = 30 * 60 * 1000;

// ── Get the sender's first name from the Graph API (PSID → profile) ──
// "Kaung Htut" → "Kaung", "Myo Aung" → "Myo", "Maung Maung Oo" → "Maung"
async function getFirstName(senderId: string): Promise<string> {
  const cached = nameCache.get(senderId);
  if (cached && Date.now() - cached.at < NAME_CACHE_MS) return cached.name;
  let name = "";
  try {
    if (PAGE_ACCESS_TOKEN) {
      const res = await fetch(`${GRAPH_PROFILE_API}/${senderId}?fields=first_name&access_token=${PAGE_ACCESS_TOKEN}`, { cache: "no-store" });
      if (res.ok) {
        const d = await res.json();
        name = (d?.first_name || "").trim();
      }
    }
  } catch (e: any) {
    console.error("[fb-webhook] getFirstName error:", e?.message || e);
  }
  nameCache.set(senderId, { name, at: Date.now() });
  return name;
}

// ── Build the Burmese greeting: "မင်္ဂလာပါ Kaung!" ──
// First name falls back to a friendly generic greeting if the API didn't return one.
function buildGreeting(firstName: string): string {
  if (firstName) return `မင်္ဂလာပါ ${firstName}!`;
  return `မင်္ဂလာပါ!`;
}

// Is this message a greeting? (English + Burmese)
const GREETING_RE = /^(hi|hello|hey|mingalaba|mingalar par|မင်္ဂလာပါ|မင်္ဂလာ)\b/i;

// Prepend/swap in the Burmese greeting with the sender's first name, avoiding a
// duplicate "မင်္ဂလာပါ" when the bot reply already starts with one.
function applyGreeting(reply: string, firstName: string): string {
  const g = buildGreeting(firstName);
  // strip any existing leading Burmese greeting (incl. ရှင့် / ပါ / punctuation)
  const stripped = reply.replace(/^မင်္ဂလာပါ(ရှင့်|ပါ)?[\s,.!။]*/u, "");
  const rest = stripped.trim();
  return rest ? `${g} ${rest}` : g;
}

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
  const commentJobs: { commentId: string; text: string; postId: string }[] = [];
  for (const entry of body.entry || []) {
    for (const event of entry.messaging || []) {
      const senderId = event.sender?.id;
      const messageText = event.message?.text;
      // Also handle postback payloads (e.g. Get Started button) as a greeting
      const postbackText = event.postback?.payload === "GET_STARTED" ? "Hi" : "";
      if (senderId && (messageText || postbackText)) {
        jobs.push({ senderId, text: messageText || postbackText });
      }
    }
    // ── FEED events: comments on page posts (needs pages_manage_comments) ──
    for (const change of entry.changes || []) {
      const v = change.value || {};
      const item = change.field || "";
      // comment.add / comment_edit → reply to the comment
      if (item === "feed" && /^comment/.test(v.item || "") && v.comment_id && v.message && v.from?.id) {
        commentJobs.push({ commentId: v.comment_id, text: String(v.message).slice(0, 500), postId: v.post_id || v.parent_id || "" });
      }
    }
  }

  // Acknowledge instantly (Facebook requires a fast 200), then run the
  // reply work via `after()` — guaranteed to complete on Vercel even
  // though the response is already sent. (fire-and-forget `void` was
  // getting killed before the Messenger reply was sent → "No reply")
  console.log("[fb-webhook] POST received. object =", body.object, "| entries =", (body.entry || []).length, "| jobs =", JSON.stringify(jobs), "| comments =", commentJobs.length);
  if (jobs.length > 0 || commentJobs.length > 0) {
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
      for (const job of commentJobs) {
        try {
          console.log("[fb-webhook] processing comment", job.commentId, ":", job.text.slice(0, 50));
          await handleComment(job.commentId, job.text);
          console.log("[fb-webhook] done comment", job.commentId);
        } catch (e: any) {
          console.error("[fb-webhook] handleComment error:", e?.message || e);
        }
      }
    });
  }

  return NextResponse.json({ received: true });
}

// ── Process one incoming message ──
async function handleMessage(senderId: string, text: string) {
  // 0. Fetch the sender's first name for the Burmese greeting
  const firstName = await getFirstName(senderId);
  const isGreeting = GREETING_RE.test(text.trim());

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

  // Greeting messages (hi/hello/မင်္ဂလာပါ) start with the Burmese greeting + first name
  if (isGreeting) {
    reply = applyGreeting(reply, firstName);
  }

  // 2. Send the reply back through Messenger
  if (!PAGE_ACCESS_TOKEN) {
    console.error("[fb-webhook] FB_PAGE_ACCESS_TOKEN not set — cannot send reply");
    return;
  }

  // 2a. Show the "typing…" indicator first so the customer sees the bot is
  //     writing (sender_action: typing_on → brief pause → typing_off)
  const typingOn = await fetch(`${GRAPH_API}?access_token=${PAGE_ACCESS_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: senderId },
      sender_action: "typing_on",
    }),
  }).catch(() => null);
  if (!typingOn?.ok) console.error("[fb-webhook] typing_on failed:", typingOn?.status);

  // Give the typing indicator a moment to appear before the text arrives
  await new Promise((r) => setTimeout(r, 700));

  const sendRes = await fetch(`${GRAPH_API}?access_token=${PAGE_ACCESS_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: senderId },
      messaging_type: "RESPONSE",
      message: { text: reply },
    }),
  });

  // 2b. Clear the typing indicator after the message is sent
  await fetch(`${GRAPH_API}?access_token=${PAGE_ACCESS_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: senderId },
      sender_action: "typing_off",
    }),
  }).catch(() => null);

  if (!sendRes.ok) {
    const errText = await sendRes.text();
    console.error(`[fb-webhook] Send API failed (${sendRes.status}):`, errText.slice(0, 500));
  }
}

// ── Reply to a comment on a page post (feed webhook → pages_manage_comments) ──
// Reuses the same Nexus AI chatbot, then posts the reply back as a comment.
async function handleComment(commentId: string, text: string) {
  if (!PAGE_ACCESS_TOKEN) {
    console.error("[fb-webhook] FB_PAGE_ACCESS_TOKEN not set — cannot reply to comment");
    return;
  }
  let reply = "Thanks for your comment! 😊 For details, please message us on Messenger or email info@nexusweblab.com.";
  try {
    const origin = "https://nexusweblab.com";
    const chatRes = await fetch(`${origin}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: `Someone commented on our Facebook post: "${String(text).slice(0, 300)}". Reply as Nexus AI, our female assistant — short, friendly, and ask them to message us on Messenger for details.` }],
        visitorId: `fbcomment:${commentId}`,
        context: "website",
      }),
    });
    if (chatRes.ok) {
      const data = await chatRes.json();
      if (data.reply) reply = String(data.reply).slice(0, 500);
    }
  } catch (e: any) {
    console.error("[fb-webhook] comment chat error:", e?.message || e);
  }

  const res = await fetch(`${GRAPH_API.replace("/me/messages", "")}/${commentId}/comments?access_token=PAGE_ACCESS_TOKEN`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: reply }),
  });
  if (!res.ok) {
    const errText = await res.text();
    console.error(`[fb-webhook] Comment reply failed (${res.status}):`, errText.slice(0, 300));
  }
}
