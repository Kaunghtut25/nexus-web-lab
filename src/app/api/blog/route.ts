import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbGet, dbRun } from '@/lib/db';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../admin/auth-guard';
import { remapImage } from '@/lib/image-remap';
import { STATIC_POSTS } from '@/content/static-posts';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const id = searchParams.get('id');
  if (slug) {
    const post = await dbGet('SELECT * FROM blog_posts WHERE slug = ? AND published = 1', [slug]);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ post: { ...post, image: remapImage(post.image) } });
  }
  if (id) {
    const post = await dbGet('SELECT * FROM blog_posts WHERE id = ?', [id]);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ post: { ...post, image: remapImage(post.image) } });
  }
  const posts = await dbAll('SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC');
  const seen = new Set(posts.map((p: any) => p.slug));
  const extra = STATIC_POSTS.filter((s) => !seen.has(s.slug)).map((s) => ({ ...s, tags: JSON.stringify(s.tags), published: 1 }));
  const merged = [...posts, ...extra].sort((a: any, b: any) => String(b.created_at || '').localeCompare(String(a.created_at || '')));
  return NextResponse.json({ posts: merged.map((p: any) => ({ ...p, image: remapImage(p.image) })) });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  const { title, slug, excerpt, content, image, tags, published, created_at } = body;
  if (!title || !slug) return NextResponse.json({ error: 'title and slug required' }, { status: 400 });
  const id = uuid();
  const tagStr = Array.isArray(tags) ? JSON.stringify(tags) : (tags || '[]');
  await dbRun(
    'INSERT INTO blog_posts (id, title, slug, excerpt, content, image, tags, published, created_at) VALUES (?,?,?,?,?,?,?,?,?)',
    [id, title, slug, excerpt || '', content || '', image || '', tagStr, published === undefined ? 1 : (published ? 1 : 0), created_at || null]
  );
  return NextResponse.json({ success: true, id });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  const { id, title, slug, excerpt, content, image, tags, published, created_at } = body;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const existing = await dbGet('SELECT * FROM blog_posts WHERE id = ?', [id]);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const tagStr = Array.isArray(tags) ? JSON.stringify(tags) : (tags || existing.tags || '[]');
  await dbRun(
    'UPDATE blog_posts SET title = ?, slug = ?, excerpt = ?, content = ?, image = ?, tags = ?, published = ?, created_at = ? WHERE id = ?',
    [title ?? existing.title, slug ?? existing.slug, excerpt ?? existing.excerpt, content ?? existing.content, image ?? existing.image, tagStr, published === undefined ? existing.published : (published ? 1 : 0), created_at ?? existing.created_at, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await dbRun('DELETE FROM blog_posts WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
