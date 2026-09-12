import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
  title: "Contact — Nexus Web Lab",
  description: "Contact Nexus Web Lab for web development, design, and digital solutions. We reply within 24 hours. Based in Yangon, Myanmar.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
