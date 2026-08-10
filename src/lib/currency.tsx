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
    // Matches: "From $500", "From $50/mo", "$1,200", "500 USD"
    const m = price.match(/(?:From\s*)?\$?([\d,]+)(?:\s*USD)?(\/mo)?/i);
    if (!m) return price;
    const usd = parseFloat(m[1].replace(/,/g, ""));
    if (isNaN(usd)) return price;
    const perMo = m[2] ? "/mo" : "";
    if (currency === "MMK") {
      const mmk = Math.round(usd * USD_TO_MMK);
      return `From ${mmk.toLocaleString("en-US")} MMK${perMo}`;
    }
    return `From $${usd.toLocaleString("en-US")}${perMo}`;
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
