import { NextRequest, NextResponse } from "next/server";

/**
 * CSP nonce proxy (Next.js 16 `proxy.ts` convention — formerly middleware.ts).
 *
 * Generates a per-request nonce, exposes it to Server Components via the
 * `x-nonce` request header, and sets a strict Content-Security-Policy.
 * Next.js automatically applies the nonce to its own inline hydration
 * scripts, so we can drop 'unsafe-inline'/'unsafe-eval' from script-src.
 * This is what lets the site score A+/full marks on security scanners
 * (MDN Observatory, securityheaders.com) instead of being capped at A.
 */
export default function proxy(request: NextRequest) {
  // Generate a fresh nonce per request (crypto.randomUUID is available on edge)
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    // Scripts: same-origin + nonce'd inline scripts only. No unsafe-inline/eval.
    // 'strict-dynamic' lets scripts loaded by the nonced bootstrap script run
    // (Next.js chunk loading). Nonce support is universal in modern browsers,
    // so dropping 'unsafe-inline' is safe and satisfies security scanners.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://images.unsplash.com https://i.pravatar.cc https://*.vercel.app",
    "font-src 'self' data:",
    "connect-src 'self' https://api.telegram.org",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  // Run on all page routes; skip static assets, images, and API routes
  // (APIs are JSON, no CSP needed; skipping saves edge invocations).
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)"],
};
