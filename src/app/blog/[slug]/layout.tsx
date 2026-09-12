import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    // Unknown slug: the page calls notFound(), which streams the 404 UI with a
    // 200 status (Next.js cannot change the status once streaming has started),
    // so opt out of indexing explicitly instead of relying on the injected meta.
    return { title: "Blog — Nexus Web Lab", robots: { index: false, follow: true } };
  }
  return {
    title: `${post.title} — Nexus Web Lab`,
    description: post.excerpt || undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} — Nexus Web Lab`,
      description: post.excerpt || undefined,
      type: "article",
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return <>{children}</>;

  const absImage = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `https://nexusweblab.com${post.image}`
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://nexusweblab.com/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://nexusweblab.com/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: `https://nexusweblab.com/blog/${slug}` },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt || undefined,
        image: absImage,
        datePublished: post.created_at || undefined,
        author: { "@type": "Organization", name: "Nexus Web Lab", url: "https://nexusweblab.com" },
        publisher: { "@type": "Organization", name: "Nexus Web Lab", url: "https://nexusweblab.com" },
        mainEntityOfPage: `https://nexusweblab.com/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
