import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import HomeClient from "@/components/home/HomeClient";
import { dbAllRead } from "@/lib/db";

export const metadata: Metadata = {
  title: "Nexus Web Lab — AI Automation & AI-Powered Web Development",
  description: "AI automation, AI chatbots and AI-powered web development in Yangon, Myanmar. We build intelligent digital systems — AI websites, business automation, custom AI agents and SaaS applications.",
};

// NOTE: this page MUST stay `force-dynamic`.
// The CSP proxy (src/proxy.ts) signs every response with a per-request nonce;
// if the page is prerendered/cached (ISR), the cached HTML carries a stale
// nonce and the browser blocks ALL scripts → blank page for minutes.
// Instead of caching the page, we cache the expensive DB result below
// (unstable_cache, 300s) so each request renders fast from cached data
// while the nonce always matches. Best of both: speed + strict CSP.
export const dynamic = "force-dynamic";

function parseJson(v: any) { try { return JSON.parse(v); } catch { return []; } }

// Build-time DB access is wrapped so an unreachable DB never breaks `next build`;
// HomeClient already ships fallbacks for slides/features/premium/testimonials.
const EMPTY = {
  settings: {} as Record<string, string>,
  services: [] as any[],
  projects: [] as any[],
  testimonials: [] as any[],
  slides: [] as any[],
  features: [] as any[],
  premiumFeatures: [] as any[],
};

// Data-layer cache: 7 Turso queries → cached for 300s, revalidated in the
// background. Turns ~12s cold DB work into ~0ms, without touching the page cache.
const getHomeData = unstable_cache(
  async () => {
    const [settingsRows, servicesRows, projectsRows, testimonialsRows, slidesRows, featuresRows, premiumRows] = await Promise.all([
      dbAllRead('SELECT * FROM settings'),
      dbAllRead('SELECT * FROM services ORDER BY sort_order'),
      dbAllRead('SELECT * FROM projects ORDER BY sort_order'),
      dbAllRead('SELECT * FROM testimonials ORDER BY sort_order'),
      dbAllRead('SELECT * FROM hero_slides ORDER BY sort_order'),
      dbAllRead('SELECT * FROM features ORDER BY sort_order'),
      dbAllRead('SELECT * FROM premium_features ORDER BY sort_order'),
    ]);

    const settings: Record<string, string> = {};
    for (const s of settingsRows) settings[s.key as string] = s.value as string;

    return {
      settings,
      services: servicesRows.map((r: any) => ({ ...r, features: parseJson(r.features) })),
      projects: projectsRows.map((r: any) => ({ ...r, tags: parseJson(r.tags) })),
      testimonials: testimonialsRows,
      slides: slidesRows,
      features: featuresRows,
      premiumFeatures: premiumRows,
    };
  },
  ['home-data'],
  { revalidate: 300 }
);

export default async function HomePage() {
  let data = EMPTY;
  try {
    // Server-side data fetching (RSC) — replaces the 7 client fetch calls.
    // All content is present in the initial HTML: better LCP, no waterfall,
    // and crawlers see the full page (fixes "thin content").
    data = await getHomeData();
  } catch (e) {
    console.error('[HomePage] DB fetch failed, using fallbacks:', e);
  }

  return <HomeClient initialData={data} />;
}
