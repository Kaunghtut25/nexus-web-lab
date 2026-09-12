import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prefillHref } from "@/lib/lead-prefill";
import { getPostBySlug } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";

type Props = { params: Promise<{ slug: string }> };

// Server component: the article body is rendered on the server so the headline,
// text and links exist in the initial HTML (previously fetched client-side from
// /api/blog, which left crawlers and no-JS visitors with an empty page).
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const body = renderMarkdown(post.content || post.excerpt);

  return (
    <>
      <Header />
      <main id="main-content" className="mesh-bg">
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
            <p className="text-slate-400 text-sm">
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </p>
            {post.tags.length > 0 && (
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
          <div
            className="prose prose-slate max-w-none text-slate-600 leading-relaxed [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-navy [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-navy [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-1.5 [&_li]:leading-relaxed [&_a]:text-blue [&_a]:font-semibold [&_a]:hover:underline [&_strong]:text-navy"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
            <Link href="/blog" className="text-blue font-semibold hover:underline">← All Articles</Link>
            <Link href={prefillHref('/get-quote', { source: `${post.title} — nexusweblab.com/blog/${post.slug}` })} className="inline-flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition">Start a Project</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
