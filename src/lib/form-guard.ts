import { NextRequest, NextResponse } from "next/server";

/**
 * Shared public-form protection for contact / quote / lead endpoints.
 * - Validates required fields + email format + sane length caps
 * - Honeypot: a hidden "company_website" field that real users never fill —
 *   bots that autofill every field get silently rejected
 * - In-memory rate limit per IP (per process; good enough for a Vercel
 *   serverless function and far better than nothing)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Simple sliding-window limiter: max N submissions per IP per window.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) {
    // Keep the entry fresh so a burst doesn't rotate keys forever.
    entry.resetAt = now + WINDOW_MS;
    return true;
  }
  return false;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export interface FormGuardResult {
  ok: boolean;
  status: number;
  error?: string;
  body: Record<string, string>;
}

/**
 * Validate + sanitize a public form submission.
 * `required` lists fields that must be non-empty. All string values are
 * trimmed and length-capped. Returns a 400/429/200-shaped result.
 */
export function guardForm(req: NextRequest, body: Record<string, unknown>, required: string[] = ["name", "email", "message"]): FormGuardResult {
  // Honeypot — bots fill hidden fields; humans don't see them.
  const honeypot = String(body.company_website || body.website_url || "").trim();
  if (honeypot.length > 0) {
    // Pretend success so bots don't learn the trap.
    return { ok: true, status: 200, body: {} as Record<string, string> };
  }

  // Rate limit.
  if (rateLimited(clientIp(req))) {
    return { ok: false, status: 429, error: "Too many submissions. Please try again later.", body: {} as Record<string, string> };
  }

  const clean: Record<string, string> = {};
  const MAX_LEN: Record<string, number> = { name: 120, email: 200, phone: 40, service: 200, message: 5000, budget: 120, timeline: 120 };

  for (const key of Object.keys(body)) {
    const raw = body[key];
    if (typeof raw !== "string") continue;
    const cap = MAX_LEN[key] ?? 500;
    clean[key] = raw.trim().slice(0, cap);
  }

  const missing = required.filter((k) => !clean[k] || clean[k].length === 0);
  if (missing.length) {
    return { ok: false, status: 400, error: `Please fill in: ${missing.join(", ")}.`, body: clean };
  }
  if (clean.email && !EMAIL_RE.test(clean.email)) {
    return { ok: false, status: 400, error: "Please enter a valid email address.", body: clean };
  }
  if (clean.message && clean.message.length < 10) {
    return { ok: false, status: 400, error: "Please describe your project in a little more detail (at least 10 characters).", body: clean };
  }
  return { ok: true, status: 200, body: clean };
}
