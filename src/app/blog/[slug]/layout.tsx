import type { Metadata } from "next";
import { cache } from "react";
import { dbGet } from "@/lib/db";
import { remapImage } from "@/lib/image-remap";

// Fetch the post once per request; shared between generateMetadata + Layout body.
const getPost = cache(async (slug: string) => {
  return await dbGet(
    "SELECT * FROM blog_posts WHERE slug = ? AND published = 1",
    [slug]
  );
});

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return { title: "Blog — Nexus Web Lab" };
  }
  const image = remapImage(post.image as string) || "";
  return {
    title: `${post.title} — Nexus Web Lab`,
    description: (post.excerpt as string) || undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} — Nexus Web Lab`,
      description: (post.excerpt as string) || undefined,
      type: "article",
      images: image ? [{ url: image.startsWith("http") ? image : image }] : undefined,
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
  const post = await getPost(slug);
  if (!post) return <>{children}</>;

  const image = remapImage(post.image as string) || "";
  const absImage = image
    ? image.startsWith("http")
      ? image
      : `https://nexusweblab.com${image}`
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
