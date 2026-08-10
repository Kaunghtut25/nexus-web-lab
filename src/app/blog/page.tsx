"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Layers } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  tags: string[];
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog').then(r => r.json()).then(d => {
      setPosts((d.posts || []).map((p: any) => ({ ...p, tags: typeof p.tags === 'string' ? JSON.parse(p.tags || '[]') : (p.tags || []) })));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <title>Blog — Nexus Web Lab</title>
      <meta name="description" content="Insights, guides, and updates from Nexus Web Lab — web development tips, design trends, and digital marketing advice." />
      <Header />
      <main className="mesh-bg">
        {/* Hero */}
        <section className="relative -mt-20 h-[50vh] min-h-[400px] sm:min-h-[500px] lg:min-h-[560px] flex items-center overflow-hidden">
          <Image src="/images/hero/blog-hero.jpg" alt="Writing and publishing blog articles" fill priority sizes="100vw" className="object-cover hero-kenburns" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,8,22,0.55)_0%,rgba(5,8,22,0.3)_42%,transparent_75%)]" aria-hidden="true" />
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 text-center py-20 sm:py-16">
            <span className="hero-item hero-d1 inline-block text-xs font-bold uppercase tracking-[0.25em] text-slide mb-4">Insights & Updates</span>
            <h1 className="hero-item hero-d2 text-4xl sm:text-5xl font-black text-white mb-4 [text-shadow:0_0_4px_rgba(5,8,22,0.95),0_2px_10px_rgba(5,8,22,0.95),0_5px_20px_rgba(5,8,22,0.85),0_0_48px_rgba(5,8,22,0.6)]">The Nexus Blog</h1>
            <p className="hero-item hero-d3 text-white max-w-2xl mx-auto text-lg [text-shadow:0_0_3px_rgba(5,8,22,0.95),0_1px_6px_rgba(5,8,22,0.95),0_3px_14px_rgba(5,8,22,0.85)]">Web development tips, design trends, and practical digital advice for businesses in Myanmar and beyond.</p>
          </div>
        </section>

        {/* Posts */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-4 text-sm text-blue-600 font-semibold">
              <Layers size={14} /> From the Blog
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mb-3 card-hover-title">Latest Articles &amp; Insights</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Fresh guides and practical tips to help your business grow online.</p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-blue animate-pulse" /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.2s' }} /><span className="w-3 h-3 rounded-full bg-blue animate-pulse" style={{ animationDelay: '0.4s' }} /></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-navy mb-2">No posts yet</h3>
              <p className="text-slate-500 max-w-md mx-auto">Check back soon — we're writing fresh articles about web development, design, and digital growth.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    {post.image ? (
                      <img src={post.image} alt={post.title} width={800} height={450} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">📄</div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-slate-400 mb-2">{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    <h2 className="font-bold text-navy text-lg mb-2 group-hover:text-blue transition-colors line-clamp-2">{post.title}</h2>
                    <p className="text-sm text-slate-500 line-clamp-3 mb-3">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((t: string, i: number) => (
                          <span key={i} className="text-xs font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
