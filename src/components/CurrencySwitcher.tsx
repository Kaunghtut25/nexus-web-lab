"use client";
import { useCurrency } from "@/lib/currency";

/** USD / MMK toggle — shown on card sections (not in the menu bar) */
export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="relative inline-flex group">
      <div
        className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-0.5 text-xs font-semibold shadow-sm"
        role="group"
        aria-label="Currency selector"
      >
        {(["USD", "MMK"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            aria-pressed={currency === c}
            title={c === 'USD' ? 'Switch to US Dollar' : 'Switch to Myanmar Kyat'}
            className={`px-3 py-2.5 min-h-[44px] rounded-lg transition-all ${
              currency === c
                ? "bg-gradient-to-r from-blue to-cyan text-white shadow"
                : "text-slate-500 hover:text-blue"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-navy text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
          Toggle price currency
        </div>
      </div>
    </div>
  );
}
