// Email notification module — sends website inquiries to the owner's Zoho mailbox.
// Channel: Zoho SMTP (smtp.zoho.com). Config via env vars:
//   ZOHO_SMTP_USER  — e.g. info@nexusweblab.com (sender)
//   ZOHO_SMTP_PASS  — Zoho app-specific password (not the login password)
//   MAIL_TO         — recipient(s), comma-separated (defaults to sender)
import nodemailer from "nodemailer";
import { LeadPayload, formatLeadText } from "./notify";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASS;
  if (!user || !pass) {
    console.error("[email] ZOHO_SMTP_USER or ZOHO_SMTP_PASS missing");
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // SSL
      auth: { user, pass },
    });
  }
  return transporter;
}

export function emailLead(lead: LeadPayload): Promise<boolean> {
  return sendInquiryEmail({
    subject: `🆕 New Website Inquiry — ${lead.name || "Visitor"}${lead.source ? ` (${lead.source})` : ""}`,
    text: formatLeadText(lead),
  });
}

export async function sendInquiryEmail(opts: { subject: string; text: string; to?: string }): Promise<boolean> {
  const tr = getTransporter();
  if (!tr) return false;
  const user = process.env.ZOHO_SMTP_USER!;
  const to = opts.to || process.env.MAIL_TO || user;
  try {
    await tr.sendMail({
      from: `Nexus Web Lab <${user}>`,
      to,
      subject: opts.subject,
      text: opts.text,
    });
    console.log("[email] sent:", opts.subject);
    return true;
  } catch (e: any) {
    console.error("[email] send failed:", String(e?.message || e).slice(0, 300));
    return false;
  }
}
