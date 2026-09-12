// Auto-generated: maps Unsplash photo IDs to locally cached webp versions.
// Keyed by photo ID for flexible matching (any query params → same local file).
// Used by getHomeData (page.tsx) via remapImageOnRead().

export const UNSLASH_ID_TO_LOCAL: Record<string, string> = {
  '1455390582262-044cdead277a': '/images/remote/remote-1455390582262-044cdead277a-1920w.webp',
  '1469854523086-cc02fe5d8800': '/images/remote/remote-1469854523086-cc02fe5d8800-1920w.webp',
  '1486406146926-c627a92ad1ab': '/images/remote/remote-1486406146926-c627a92ad1ab-1920w.webp',
  '1535378917042-10a22c95931a': '/images/remote/remote-1535378917042-10a22c95931a-1920w.webp',
  '1555066931-4365d14bab8c': '/images/remote/remote-1555066931-4365d14bab8c-1920w.webp',
  '1561070791-2526d30994b5': '/images/remote/remote-1561070791-2526d30994b5-1920w.webp',
  '1563986768609-322da13575f3': '/images/remote/remote-1563986768609-322da13575f3-1920w.webp',
  '1611926653458-09294b3142bf': '/images/remote/remote-1611926653458-09294b3142bf-1920w.webp',
  '1626785774573-4b799315345d': '/images/remote/remote-1626785774573-4b799315345d-1920w.webp',
  '1531746790731-6c087fecd65a': '/images/remote/remote-1531746790731-6c087fecd65a-1200w.webp',
  '1556742049-0cfed4f6a45d': '/images/remote/remote-1556742049-0cfed4f6a45d-1200w.webp',
  '1551650975-87deedd944c3': '/images/remote/remote-1551650975-87deedd944c3-1200w.webp',
  '1467232004584-a241de8bcf5d': '/images/remote/remote-1467232004584-a241de8bcf5d-1200w.webp',
  '1460925895917-afdab827c52f': '/images/remote/remote-1460925895917-afdab827c52f-1920w.webp',
};

export const STATIC_REMAP: Record<string, string> = {
  'https://stardust-co-eight.vercel.app/logo.svg': '/images/stardust-logo.webp',
  'https://jrecruit-site.vercel.app/logo.svg': '/images/jrecruit-logo.svg',
  'https://azami-training-center.vercel.app/logo.svg': '/images/azami-logo.svg',
  'https://stardust-co-eight.vercel.app': 'https://stardust.co',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1600&h=1066&fit=crop&q=100': '/images/portfolio/nexus-chatbot.jpg',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=1066&fit=crop&q=100': '/images/portfolio/stardust.jpg',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=1066&fit=crop&q=100': '/images/portfolio/a9-travel.jpg',
};

export function remapImage(url?: unknown): string | undefined {
  if (!url || typeof url !== 'string') return undefined;
  // Check static URL remap first (non-Unsplash)
  if (STATIC_REMAP[url]) return STATIC_REMAP[url];
  // Then check Unsplash photo ID remap
  const m = url.match(/photo-([a-f0-9-]+)/);
  if (m && UNSLASH_ID_TO_LOCAL[m[1]]) return UNSLASH_ID_TO_LOCAL[m[1]];
  return url;
}
