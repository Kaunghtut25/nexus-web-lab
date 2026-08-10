import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Nexus Web Lab",
  description: "Terms and conditions governing the use of Nexus Web Lab's website and services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the Nexus Web Lab website or engaging our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you should not use our website or services.",
  },
  {
    title: "2. Our Services",
    body: "Nexus Web Lab provides web design, web development, e-commerce, UI/UX design, SEO, hosting, maintenance, error fixing, AI chatbot, and related digital services. Specific deliverables, timelines, and pricing are agreed in writing via quotes or contracts before work begins.",
  },
  {
    title: "3. Quotes & Payments",
    body: "Quotes provided are valid for 14 days unless stated otherwise. Payment terms are specified in each quote or contract. Work begins after initial payment or agreed deposit. Final deliverables are released upon full payment unless otherwise agreed.",
  },
  {
    title: "4. Client Responsibilities",
    body: "Clients agree to provide accurate project information, content, and feedback in a timely manner, and to cooperate with our team during the project. Delays caused by the client may affect project timelines.",
  },
  {
    title: "5. Intellectual Property",
    body: "Upon full payment, the client owns the final deliverables created specifically for their project. Nexus Web Lab retains the right to use client work in our portfolio unless a confidentiality agreement states otherwise. All underlying tools, frameworks, and proprietary code remain the property of their respective owners.",
  },
  {
    title: "6. Revisions & Support",
    body: "Quotes typically include a defined number of revision rounds. Additional revisions may be billed at our standard hourly rate. Post-launch support and maintenance plans are available and sold separately.",
  },
  {
    title: "7. Limitation of Liability",
    body: "Nexus Web Lab shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or website. Our total liability is limited to the amount paid for the specific service in question. We are not responsible for downtime or data loss caused by third-party hosting providers.",
  },
  {
    title: "8. Third-Party Services",
    body: "Some services may rely on third-party platforms (hosting, payment gateways, APIs). We are not responsible for the availability, security, or performance of third-party services, and we recommend clients review their respective terms.",
  },
  {
    title: "9. Termination",
    body: "Either party may terminate a project agreement with written notice. In the event of termination, the client is responsible for payment for work completed up to the termination date.",
  },
  {
    title: "10. Changes to These Terms",
    body: "We may update these Terms of Service from time to time. Continued use of our website or services after changes constitutes acceptance of the revised terms.",
  },
  {
    title: "11. Contact",
    body: "Questions about these Terms of Service can be directed to info@nexusweblab.com, +95 9 886 264 582, or No.189, Kha 6 Street, Insein, Yangon, Myanmar.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mesh-bg min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-4xl font-black text-navy mb-2">Terms of Service</h1>
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
