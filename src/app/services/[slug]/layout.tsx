import type { Metadata } from "next";

// Static slug → display name map (mirrors SLUG_TO_ID in page.tsx).
const SLUG_TITLE: Record<string, string> = {
  'web-development': 'Web Development',
  'e-commerce': 'E-Commerce',
  'ui-ux-design': 'UI/UX Design',
  'seo-package': 'SEO Package',
  'hosting-deploy': 'Hosting & Deploy',
  'maintenance': 'Maintenance',
  'error-fixing': 'Website Errors Fixing',
  'ai-chatbot': 'AI Agent & Automation',
  'website-redesign': 'Website Redesign',
  'social-media-management': 'Social Media Management',
  'content-writing': 'Content Writing & Copywriting',
  'logo-brand-identity': 'Logo & Brand Identity',
  'business-email-setup': 'Business Email Setup',
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = SLUG_TITLE[slug] || "Services";
  return {
    title: `${name} — Nexus Web Lab`,
    description: `${name} by Nexus Web Lab — professional web development & AI automation services in Yangon, Myanmar. Get a free quote within 24 hours.`,
    alternates: {
      canonical: `/services/${slug}`,
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
  const { slug } = await params;
  const name = SLUG_TITLE[slug] || "Services";
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
