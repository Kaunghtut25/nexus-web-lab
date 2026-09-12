import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  title: "About Us — Nexus Web Lab",
  description: "Learn about Nexus Web Lab — a professional web development & digital agency in Yangon, Myanmar. Our team, mission, and values.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
