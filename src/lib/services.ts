// Services data + shared types — single source of truth for the service pages.
//
// Used by:
//   src/app/services/[slug]/page.tsx   (server component, resolves the DB row)
//   src/app/services/[slug]/layout.tsx (metadata, canonical, JSON-LD, OG image)
//   src/components/services/ServiceDetailClient.tsx (rendering contract)

import { unstable_cache } from 'next/cache';
import { dbAllRead } from '@/lib/db';
import { remapImage } from '@/lib/image-remap';

export interface ServiceRow {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  icon: string;
  image: string;
  sort_order: number;
}

/** Per-slug static content used by the detail page (server-side data only). */
export interface ServiceDetailContent {
  tagline: string;
  delivery: string;
  overview: string;
  deliverables: string[];
  process: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  packages?: { name: string; price: string; desc: string; features: string[]; popular?: boolean }[];
}

export interface ServiceMeta {
  /** Row id in the `services` table. */
  id: string;
  /** Public display name. */
  name: string;
  /** Hero / social-share image. */
  image: string;
}

/**
 * Clean URL slug -> DB id, display name and hero image.
 * Previously split across page.tsx (SLUG_TO_ID) and layout.tsx (SLUG_TITLE);
 * kept here so both stay in step.
 */
export const SERVICE_META: Record<string, ServiceMeta> = {
  'web-development': { id: 'web-dev-1', name: 'Web Development', image: '/images/remote/remote-1460925895917-afdab827c52f-1920w.webp' },
  'e-commerce': { id: 'ecom-1', name: 'E-Commerce', image: '/images/remote/remote-1563013544-824ae1b704d3-1920w.webp' },
  'ui-ux-design': { id: 'uiux-1', name: 'UI/UX Design', image: '/images/remote/remote-1559028012-481c04fa702d-1920w.webp' },
  'seo-package': { id: 'seo-1', name: 'SEO Package', image: '/images/remote/remote-1551288049-bebda4e38f71-1920w.webp' },
  'hosting-deploy': { id: 'host-1', name: 'Hosting & Deploy', image: '/images/remote/remote-1451187580459-43490279c0fa-1920w.webp' },
  'maintenance': { id: 'maint-1', name: 'Maintenance', image: '/images/remote/remote-1560472354-b33ff0c44a43-1920w.webp' },
  'error-fixing': { id: 'errfix-1', name: 'Website Errors Fixing', image: '/images/remote/remote-1555066931-4365d14bab8c-1920w.webp' },
  'ai-chatbot': { id: 'chatbot-1', name: 'AI Agent & Automation', image: '/images/remote/remote-1535378917042-10a22c95931a-1920w.webp' },
  'website-redesign': { id: 'redesign-1', name: 'Website Redesign', image: '/images/remote/remote-1561070791-2526d30994b5-1920w.webp' },
  'social-media-management': { id: 'smm-1', name: 'Social Media Management', image: '/images/remote/remote-1611162616305-c69b3fa7fbe0-1200w.webp' },
  'content-writing': { id: 'content-1', name: 'Content Writing & Copywriting', image: '/images/remote/remote-1455390582262-044cdead277a-1920w.webp' },
  'logo-brand-identity': { id: 'brand-1', name: 'Logo & Brand Identity', image: '/images/remote/remote-1626785774573-4b799315345d-1920w.webp' },
  'business-email-setup': { id: 'email-1', name: 'Business Email Setup', image: '/images/remote/remote-1563986768609-322da13575f3-1920w.webp' },
};

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function parseFeatures(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((f): f is string => typeof f === 'string');
  if (typeof value !== 'string' || !value.trim()) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter((f): f is string => typeof f === 'string');
  } catch {
    /* malformed features column — treat as empty */
  }
  return [];
}

function toServiceRow(row: unknown): ServiceRow | null {
  if (typeof row !== 'object' || row === null) return null;
  const r = row as Record<string, unknown>;
  const id = str(r.id);
  if (!id) return null;
  return {
    id,
    title: str(r.title),
    price: str(r.price),
    description: str(r.description),
    features: parseFeatures(r.features),
    icon: str(r.icon),
    image: remapImage(r.image) ?? '',
    sort_order: typeof r.sort_order === 'number' ? r.sort_order : 0,
  };
}

/**
 * All services, cached for 300s. Mirrors the home page approach: cache the DB
 * result rather than the page, so the CSP nonce stays per-request.
 */
export const getServices = unstable_cache(
  async (): Promise<ServiceRow[]> => {
    const rows = await dbAllRead('SELECT * FROM services ORDER BY sort_order');
    return rows.map(toServiceRow).filter((s): s is ServiceRow => s !== null);
  },
  ['services-list-v1'],
  { revalidate: 300, tags: ['services-list'] }
);
