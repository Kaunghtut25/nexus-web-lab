import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/get-quote",
  },
  title: "Get a Free Quote — Nexus Web Lab",
  description: "Get a free, no-obligation quote from Nexus Web Lab. Tell us about your project and we'll reply within 24 hours with a fixed quote.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
