// Blog data access — single source of truth for blog_posts queries.
//
// Used by:
//   src/app/blog/[slug]/page.tsx   (server-rendered article body)
//   src/app/blog/[slug]/layout.tsx (per-post metadata + BlogPosting JSON-LD)
//   src/app/sitemap.ts             (post URLs)
//
// Why this file exists: the same `SELECT * FROM blog_posts WHERE slug = ?` and
// the same tags/image normalisation were duplicated in the route layout and the
// API route. Both consumers now share this module (Safe Code Rule 12: one source
// of truth for shared data).

import { cache } from 'react';
import { dbAll, dbAllRead, dbGet, dbGetRead } from '@/lib/db';
import { remapImage } from '@/lib/image-remap';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  created_at: string;
}

const PUBLISHED_ORDER = 'ORDER BY created_at DESC';

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/** tags are stored as a JSON string in SQLite; tolerate arrays and bad JSON. */
export function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((t): t is string => typeof t === 'string');
  if (typeof value !== 'string' || !value.trim()) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter((t): t is string => typeof t === 'string');
  } catch {
    /* malformed tags column — treat as no tags rather than crash the page */
  }
  return [];
}

/** DB row -> typed post. Rows from libsql are untyped, so narrow before use. */
function toPost(row: unknown): BlogPost | null {
  if (typeof row !== 'object' || row === null) return null;
  const r = row as Record<string, unknown>;
  const slug = str(r.slug);
  if (!slug) return null;
  return {
    id: str(r.id),
    title: str(r.title),
    slug,
    excerpt: str(r.excerpt),
    content: str(r.content),
    image: remapImage(r.image) ?? '',
    tags: parseTags(r.tags),
    created_at: str(r.created_at),
  };
}

/**
 * Read-only query used by public pages: skips the 30+ migration round-trips in
 * init(). Falls back to the migrating path if the read fails (fresh database).
 */
async function readRows(sql: string, args?: unknown[]): Promise<readonly unknown[]> {
  try {
    return (await dbAllRead(sql, args)) as readonly unknown[];
  } catch {
    return (await dbAll(sql, args)) as readonly unknown[];
  }
}

async function readRow(sql: string, args?: unknown[]): Promise<unknown> {
  try {
    return (await dbGetRead(sql, args)) as unknown;
  } catch {
    return (await dbGet(sql, args)) as unknown;
  }
}

/** One published post by slug, or null. Deduped per request (layout + page). */
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!slug) return null;
  const row = await readRow('SELECT * FROM blog_posts WHERE slug = ? AND published = 1', [slug]);
  return toPost(row);
});

/** All published posts, newest first. */
export const getPublishedPosts = cache(async (): Promise<BlogPost[]> => {
  const rows = await readRows(`SELECT * FROM blog_posts WHERE published = 1 ${PUBLISHED_ORDER}`);
  return rows.map(toPost).filter((p): p is BlogPost => p !== null);
});
