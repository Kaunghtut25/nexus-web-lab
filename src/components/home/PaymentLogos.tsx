"use client";
import { useEffect, useState } from "react";

// Real brand logos (downloaded from official sites / app stores / Wikipedia)
const LOGO_MAP: Record<string, { name: string; img: string; kind: 'bank' | 'pay' }> = {
  'KBZ Bank': { name: 'KBZ Bank', img: '/images/payments/kbz-bank.png', kind: 'bank' },
  'AYA Bank': { name: 'AYA Bank', img: '/images/payments/aya-bank.png', kind: 'bank' },
  'CB Bank': { name: 'CB Bank', img: '/images/payments/cb-bank.png', kind: 'bank' },
  'AYA Pay': { name: 'AYA Pay', img: '/images/payments/aya-pay.png', kind: 'pay' },
  'KBZPay': { name: 'KBZPay', img: '/images/payments/kbzpay.png', kind: 'pay' },
  'CB Pay': { name: 'CB Pay', img: '/images/payments/cb-pay.png', kind: 'pay' },
  'Wave Pay': { name: 'Wave Pay', img: '/images/payments/wave-pay.png', kind: 'pay' },
  'PayPal': { name: 'PayPal', img: '/images/payments/paypal.png', kind: 'pay' },
};

// Match "Bank transfer / PayPal" style entries to the PayPal brand
function resolveMethod(m: string) {
  const exact = LOGO_MAP[m];
  if (exact) return exact;
  const lower = m.toLowerCase();
  if (lower.includes('paypal')) return { name: 'PayPal', img: '/images/payments/paypal.png', kind: 'pay' as const };
  if (lower.includes('transfer') || lower.includes('bank transfer')) {
    return { name: m, img: '', kind: 'bank' as const };
  }
  return null;
}

function BankIcon({ kind }: { kind: 'bank' | 'pay' }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
      {kind === 'bank' ? (
        <>
          <path d="M3 21h18" />
          <path d="M4 21V10" />
          <path d="M20 21V10" />
          <path d="M2 10l10-6 10 6" />
          <path d="M8 21v-5h8v5" />
        </>
      ) : (
        <>
          <rect x="2" y="6" width="20" height="13" rx="2.5" />
          <path d="M16 11h2" />
          <path d="M6 11h6" />
          <path d="M6 14h4" />
        </>
      )}
    </svg>
  );
}

export default function PaymentLogos({ methods, className = "" }: { methods: string; className?: string }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(methods.split('|').map(m => m.trim()).filter(Boolean));
  }, [methods]);

  if (items.length === 0) return null;

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2.5 ${className}`}>
      {items.map((m, i) => {
        const logo = resolveMethod(m);
        return (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-1.5 bg-white border border-slate-100 rounded-xl px-2 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden min-w-0"
          >
            {/* Logo area — fixed height, text never overlaps */}
            <div className="w-full h-10 flex items-center justify-center shrink-0">
              {logo && logo.img ? (
                <img src={logo.img} alt={logo.name} width={76} height={32} className="h-8 w-auto max-w-[76px] object-contain" loading="lazy" />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue to-cyan flex items-center justify-center text-white font-extrabold text-[11px] tracking-wide">
                  {m.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'B'}
                </div>
              )}
            </div>
            {/* Text area — separate row, truncates inside the box */}
            <div className="w-full text-center min-w-0 leading-tight">
              <div className="text-[12px] font-bold text-navy truncate">{logo ? logo.name : m}</div>
              <div className="flex items-center justify-center gap-1 text-[9px] text-slate-400 font-semibold uppercase tracking-wide mt-0.5">
                <BankIcon kind={logo ? logo.kind : 'pay'} /> {logo && logo.kind === 'bank' ? 'Bank' : 'Payment'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
