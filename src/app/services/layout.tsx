import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/services",
  },
  title: "Services — Nexus Web Lab",
  description: "Explore Nexus Web Lab services: web development, e-commerce, UI/UX design, SEO packages, hosting & deployment, and maintenance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
