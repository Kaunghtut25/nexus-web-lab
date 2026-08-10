import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Accessibility Statement — Nexus Web Lab",
  description: "Nexus Web Lab's commitment to web accessibility and WCAG compliance.",
};

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main className="mesh-bg min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-4xl font-black text-navy mb-2">Accessibility Statement</h1>
          <p className="text-slate-500 text-sm mb-10">Last updated: August 8, 2026</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-navy mb-2">Our Commitment</h2>
              <p className="text-slate-600 leading-relaxed">
                Nexus Web Lab is committed to ensuring our website is accessible to all users, including people with disabilities. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at the AA level, and we run automated accessibility audits on every release to catch and fix issues early.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-2">Accessibility Features</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
                <li>Semantic HTML structure with proper heading hierarchy (h1 → h2 → h3)</li>
                <li>Sufficient color contrast for text and interactive elements</li>
                <li>Keyboard-navigable interface with visible focus states</li>
                <li>44×44px minimum touch targets on interactive elements</li>
                <li>Descriptive alt text for all meaningful images</li>
                <li>Support for reduced-motion preferences</li>
                <li>Form inputs with clear labels and error states</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-2">Known Limitations</h2>
              <p className="text-slate-600 leading-relaxed">
                While we aim for full conformance, some third-party content or features may not yet be fully accessible. We actively work to improve these areas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-2">Feedback</h2>
              <p className="text-slate-600 leading-relaxed">
                We welcome your feedback on the accessibility of our website. If you encounter an accessibility barrier, please contact us at info@nexusweblab.com or call +95 9 886 264 582, and we will do our best to resolve the issue promptly.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
