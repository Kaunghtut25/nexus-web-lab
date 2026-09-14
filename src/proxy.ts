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
    "connect-src 'self'",
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

  // Keep dynamic HTML out of shared/CDN caches (the nonce above is minted per
  // request, so a cached body would not match a later response's CSP header and
  // scripts would be blocked), but do NOT mark it `no-store`: that header makes
  // pages ineligible for the browser back/forward cache, so every Back button
  // press re-downloads and re-renders the page. `no-cache` still forces
  // revalidation before reuse, so the nonce pairing stays correct.
  //
  // Only documents and RSC payloads are touched — static files served through
  // this matcher (public images, logos, fonts) must keep their long-lived
  // immutable caching from vercel.json.
  const pathname = request.nextUrl.pathname;
  const isStaticAsset =
    /\.(?:png|jpe?g|webp|avif|gif|svg|ico|css|js|mjs|map|txt|xml|json|woff2?|ttf|eot|mp3|mp4|webm|pdf)$/i.test(pathname) ||
    /^\/(?:opengraph-image|twitter-image|icon|apple-icon)/.test(pathname);
  if (!isStaticAsset) {
    response.headers.set(
      "Cache-Control",
      "private, no-cache, max-age=0, must-revalidate"
    );
  }

  return response;
}

export const config = {
  // Run on all page routes; skip static assets, images, and API routes
  // (APIs are JSON, no CSP needed; skipping saves edge invocations).
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)"],
};
