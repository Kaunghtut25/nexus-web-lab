"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Exchange rate: 1 USD ≈ 4,500 MMK (international standard, update as needed)
export const USD_TO_MMK = 4500;
export type Currency = "USD" | "MMK";

interface CurrencyCtx {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** Convert a price string like "From $500" / "From $50/mo" / "$1,200" to the active currency */
  formatPrice: (price: string | null | undefined) => string;
}

const Ctx = createContext<CurrencyCtx>({
  currency: "USD",
  setCurrency: () => {},
  formatPrice: (p) => p || "Contact us",
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  function formatPrice(price: string | null | undefined): string {
    if (!price) return "Contact us";
    const trimmed = price.trim();
    // Detect leading "From " (case-insensitive) to preserve the original semantics.
    const hadFrom = /^from\s+/i.test(trimmed);
    // Handle ranges: "$1,200–$2,500+" → convert both numbers.
    // Matches: "$500", "From $50/mo", "$1,200", "$1,200–$2,500+", "500 USD"
    const range = trimmed.match(/(\$?[\d,]+(?:\.\d+)?)(?:\s*USD)?(\/mo)?\s*[–—-]\s*(\$?[\d,]+(?:\.\d+)?)(?:\s*USD)?(\/mo)?/i);
    if (range) {
      const a = parseFloat(range[1].replace(/,/g, ""));
      const b = parseFloat(range[3].replace(/,/g, ""));
      if (!isNaN(a) && !isNaN(b)) {
        const perMo = range[2] || range[4] ? "/mo" : "";
        const [pa, pb] = currency === "MMK"
          ? [Math.round(a * USD_TO_MMK).toLocaleString("en-US"), Math.round(b * USD_TO_MMK).toLocaleString("en-US")]
          : [a.toLocaleString("en-US"), b.toLocaleString("en-US")];
        return `${hadFrom ? "From " : ""}$${pa}–$${pb}${perMo}`;
      }
    }
    const m = trimmed.match(/(?:From\s*)?\$?([\d,]+(?:\.\d+)?)(?:\s*USD)?(\/mo)?/i);
    if (!m) return trimmed;
    const usd = parseFloat(m[1].replace(/,/g, ""));
    if (isNaN(usd)) return trimmed;
    const perMo = m[2] ? "/mo" : "";
    if (currency === "MMK") {
      const mmk = Math.round(usd * USD_TO_MMK);
      return `${hadFrom ? "From " : ""}${mmk.toLocaleString("en-US")} MMK${perMo}`;
    }
    return `${hadFrom ? "From " : ""}$${usd.toLocaleString("en-US")}${perMo}`;
  }

  return (
    <Ctx.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCurrency() {
  return useContext(Ctx);
}
