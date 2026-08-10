import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Nexus Web Lab",
  description: "How Nexus Web Lab collects, uses, and protects your personal information. Read our privacy policy.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly to us, such as your name, email address, phone number, and project details when you submit a contact form, request a quote, or use our services. We may also collect basic technical information automatically, including browser type, device type, and pages visited, to help us understand how our website is used and improve its performance.",
  },
  {
    title: "2. How We Use Your Information",
    body: "The information we collect is used to respond to your inquiries, prepare quotes, deliver the services you request, send you important updates about your project, and improve our website and customer experience. We do not sell, rent, or trade your personal information to third parties.",
  },
  {
    title: "3. Cookies & GDPR Compliance",
    body: "Our website may use essential cookies to ensure core functionality works correctly. These cookies do not track you across other websites. We currently do not use advertising or analytics cookies that require consent. If we add such services in the future, we will update this policy and ask for your explicit consent before enabling them. In line with the EU General Data Protection Regulation (GDPR), we rely on legitimate interest for essential cookies and only process personal data where we have a lawful basis. You can accept or decline non-essential cookies at any time using the consent banner on our website.",
  },
  {
    title: "4. GDPR Data Subject Rights",
    body: "If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, the GDPR grants you additional rights, including: the right to access your data, the right to rectification, the right to erasure (\u201cright to be forgotten\u201d), the right to restrict processing, the right to data portability, and the right to object to processing. You also have the right to lodge a complaint with a supervisory authority in your country. To exercise any GDPR right, email our Data Protection contact below — we respond within 30 days.",
  },
  {
    title: "5. Data Sharing",
    body: "We only share your information with trusted service providers that help us operate our business (such as hosting providers or payment processors), and only to the extent necessary to provide our services. We never sell your data.",
  },
  {
    title: "6. Data Security",
    body: "We take reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data transmitted between your browser and our servers is encrypted using HTTPS.",
  },
  {
    title: "7. Your Rights",
    body: "You have the right to access, correct, or delete the personal information we hold about you. You may also object to or restrict certain processing of your data. To exercise any of these rights, contact us at info@nexusweblab.com and we will respond within a reasonable timeframe.",
  },
  {
    title: "8. Data Protection Contact (DPA)",
    body: "Nexus Web Lab acts as a data controller for the personal data you submit through our website. For all data protection inquiries, GDPR requests, or privacy concerns, please contact our Data Protection contact: Nexus Web Lab, No.189, Kha 6 Street, Insein, Yangon, Myanmar — email info@nexusweblab.com, phone +95 9 886 264 582.",
  },
  {
    title: "9. Third-Party Links",
    body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any external sites you visit.",
  },
  {
    title: "10. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.",
  },
  {
    title: "11. Contact Us",
    body: "If you have any questions about this Privacy Policy or how we handle your data, please contact us at info@nexusweblab.com, call +95 9 886 264 582, or visit us at No.189, Kha 6 Street, Insein, Yangon, Myanmar.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mesh-bg min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-4xl font-black text-navy mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm mb-10">Last updated: August 8, 2026</p>
          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-xl font-bold text-navy mb-2">{s.title}</h2>
                <p className="text-slate-600 leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
