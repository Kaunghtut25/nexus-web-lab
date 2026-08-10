// Shared cache headers for public GET APIs.
// Lets Vercel's edge CDN serve cached responses so repeat visits
// don't hit the remote (Turso) database every time.
export const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
};
