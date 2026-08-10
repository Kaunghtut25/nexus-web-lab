// Shared Messenger helpers — used by the FB webhook (bot replies) and by
// /api/handoffs/reply (staff replies from the admin panel auto-push to
// Messenger users whose visitor_id starts with "fb:").
const GRAPH_API = "https://graph.facebook.com/v21.0/me/messages";

// Strip markdown so Messenger shows clean text (links become "text (url)")
export function toPlainText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, "$1 ($2)")
    .replace(/[*_`~>#]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function sendMessenger(psid: string, text: string): Promise<boolean> {
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  if (!token) {
    console.error("[messenger] FB_PAGE_ACCESS_TOKEN missing — cannot send");
    return false;
  }
  try {
    const res = await fetch(`${GRAPH_API}?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: psid },
        messaging_type: "RESPONSE",
        message: { text: toPlainText(text).slice(0, 2000) },
      }),
    });
    if (!res.ok) {
      console.error("[messenger] Send API failed:", (await res.text()).slice(0, 300));
      return false;
    }
    return true;
  } catch (e: any) {
    console.error("[messenger] send error:", String(e?.message || e).slice(0, 200));
    return false;
  }
}

// Show a typing indicator in the Messenger thread (best-effort, fire-and-forget)
export async function sendMessengerAction(psid: string, action: "mark_seen" | "typing_on" | "typing_off"): Promise<void> {
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  if (!token) return;
  try {
    await fetch(`${GRAPH_API}?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient: { id: psid }, sender_action: action }),
    });
  } catch {}
}
