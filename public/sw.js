/* Nexus Web Lab — PWA service worker.
 *
 * Deliberately conservative:
 *  - HTML documents and API responses are NEVER cached: the site mints a
 *    per-request CSP nonce, so a cached document would carry a stale nonce
 *    and the browser would block its scripts (blank page).
 *  - Only immutable static assets (hashed _next/static chunks, images, fonts)
 *    are cache-first.
 *  - Offline navigation falls back to /offline.html.
 * Bump CACHE_VERSION when changing strategies.
 */
const CACHE_VERSION = "nwl-static-v1";
const OFFLINE_URL = "/offline.html";
const PRECACHE = [OFFLINE_URL, "/logo.webp", "/logo-transparent.webp"];

const STATIC_EXT = /\.(?:css|js|mjs|png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|eot)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return; // dynamic data — always network

  // Navigations: network-only, offline fallback.
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).catch(() => caches.match(OFFLINE_URL)));
    return;
  }

  // Immutable static assets: cache-first, then fill the cache.
  if (STATIC_EXT.test(url.pathname) || url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            if (res.ok && res.type === "basic") {
              const copy = res.clone();
              caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
            }
            return res;
          })
      )
    );
  }
});
