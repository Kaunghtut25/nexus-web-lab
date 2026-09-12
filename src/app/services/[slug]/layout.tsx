import type { Metadata } from "next";
import { SERVICE_META } from "@/lib/services";

// Static fallback for slugs that are not in SERVICE_META: the page calls
// notFound() for those, so this only feeds the not-found response.
const FALLBACK_NAME = "Services";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = (rawSlug || "").replace(/\.html$/, "");
  const meta = SERVICE_META[slug];
  if (!meta) {
    return { title: `Services — Nexus Web Lab`, robots: { index: false, follow: true } };
  }
  const name = meta.name || FALLBACK_NAME;
  return {
    title: `${name} — Nexus Web Lab`,
    description: `${name} by Nexus Web Lab — professional web development & AI automation services in Yangon, Myanmar. Get a free quote within 24 hours.`,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${name} — Nexus Web Lab`,
      description: `${name} by Nexus Web Lab — professional web development & AI automation services in Yangon, Myanmar.`,
      type: "website",
      images: [{ url: meta.image }],
    },
  };
}

export default async function ServiceDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = (rawSlug || "").replace(/\.html$/, "");
  const name = SERVICE_META[slug]?.name || FALLBACK_NAME;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://nexusweblab.com/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://nexusweblab.com/services" },
          { "@type": "ListItem", position: 3, name, item: `https://nexusweblab.com/services/${slug}` },
        ],
      },
      {
        "@type": "Service",
        name,
        serviceType: name,
        provider: { "@type": "Organization", name: "Nexus Web Lab", url: "https://nexusweblab.com" },
        areaServed: { "@type": "Country", name: "Myanmar" },
        url: `https://nexusweblab.com/services/${slug}`,
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
