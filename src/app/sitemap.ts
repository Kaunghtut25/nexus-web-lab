import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/blog';

const BASE = 'https://nexusweblab.com';

// Blog URLs live in the database, so refresh the sitemap hourly instead of
// freezing it at build time (the previous file hard-coded `new Date()`, which is
// why every lastmod stayed at the deployment date).
export const revalidate = 3600;

const SERVICE_SLUGS = [
  'web-development',
  'e-commerce',
  'ui-ux-design',
  'seo-package',
  'hosting-deploy',
  'maintenance',
  'error-fixing',
  'ai-chatbot',
  'website-redesign',
  'social-media-management',
  'content-writing',
  'logo-brand-identity',
  'business-email-setup',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const urls = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/get-quote`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/demo`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/course`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE}/accessibility`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${BASE}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // Posts are optional: if the database is unreachable the static routes above
  // are still published rather than failing the whole sitemap.
  let posts: { url: string; lastModified: Date; changeFrequency: 'monthly'; priority: number }[] = [];
  try {
    const published = await getPublishedPosts();
    posts = published.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.created_at ? new Date(post.created_at) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    /* keep the static URL list */
  }

  return [...urls, ...posts];
}
