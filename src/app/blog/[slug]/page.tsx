"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prefillHref } from "@/lib/lead-prefill";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  created_at: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog?slug=${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(d => {
        if (d.post) {
          setPost({ ...d.post, tags: typeof d.post.tags === 'string' ? JSON.parse(d.post.tags || '[]') : (d.post.tags || []) });
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] mesh-bg flex items-center justify-center">
          <div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-blue animate-pulse" /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.2s' }} /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.4s' }} /></div>
        </div>
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] mesh-bg flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-black text-navy mb-2">Post not found</h1>
            <p className="text-slate-500 mb-6">The article you're looking for doesn't exist or was removed.</p>
            <Link href="/blog" className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold hover:opacity-90 transition">Back to Blog</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>{post.title} — Nexus Web Lab</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={`${post.title} — Nexus Web Lab`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.image} />
      <meta property="og:type" content="article" />
      <Header />
      <main className="mesh-bg">
        {/* Hero */}
        <section className="relative bg-[#050816] overflow-hidden py-16">
          <div className="orb w-[450px] h-[450px] bg-blue-500/20 top-[-180px] right-[-120px]" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <nav className="text-sm text-slate-400 mb-4 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover-green-blue">Home</Link><span>/</span>
              <Link href="/blog" className="hover-green-blue">Blog</Link><span>/</span>
              <span className="text-slate-300 line-clamp-1">{post.title}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">{post.title}</h1>
            <p className="text-slate-400 text-sm">{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((t, i) => (
                  <span key={i} className="text-xs font-semibold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">{t}</span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {post.image && (
            <img src={post.image} alt={post.title} width={1200} height={675} loading="lazy" decoding="async" className="w-full h-auto rounded-2xl shadow-lg border border-slate-200 mb-8" />
          )}
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
            {post.content || post.excerpt}
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
            <Link href="/blog" className="text-blue font-semibold hover:underline">← All Articles</Link>
            <Link href={prefillHref('/get-quote', { source: post ? `${post.title} — nexusweblab.com/blog/${post.id}` : 'Blog article — nexusweblab.com/blog' })} className="inline-flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition">Start a Project</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
