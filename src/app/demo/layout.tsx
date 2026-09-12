import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/demo",
  },
  title: "Interactive Demo — Nexus Web Lab",
  description: "Try an interactive demo of Nexus Web Lab's UI components — tabs, count-up stats, FAQ, and validated forms.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
