"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, X } from "lucide-react";
import { search } from "@/lib/search";

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Intent-aware local search: synonyms + Burmese terms (see @/lib/search).
  const results = useMemo(() => search(query), [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  // Global ⌘K / Ctrl+K toggle + Escape to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        close();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("nwl:open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("nwl:open-search", onOpen);
    };
  }, [close]);

  // Focus the input when the palette opens (DOM side effect only).
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  const go = (href: string) => {
    close();
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-start justify-center pt-[16vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
        else if (e.key === "Enter") { e.preventDefault(); const r = results[active]; if (r) go(r.href); }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#050816]/70 backdrop-blur-sm" onClick={close} />

      <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#0A1628]/95 shadow-2xl shadow-black/50 overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-white/10">
          <Search size={18} className="text-cyan-300 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            placeholder="Search — try “website”, “ဈေး”, “chatbot”…"
            className="flex-1 bg-transparent py-4 text-white placeholder:text-slate-400 outline-none"
            aria-label="Search"
          />
          <button
            onClick={close}
            className="text-slate-400 hover:text-white transition min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-slate-400">Nothing found for “{query}”.</p>
          ) : (
            results.map((it, i) => (
              <button
                key={it.href + it.label}
                onClick={() => go(it.href)}
                onMouseEnter={() => setActive(i)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm transition ${
                  i === active ? "bg-white/10 text-white" : "text-slate-300"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${i === active ? "text-cyan-300" : "text-slate-500"}`}>{it.hint}</span>
                  <span>{it.label}</span>
                </span>
                {i === active && <ArrowRight size={15} className="text-cyan-300 shrink-0" />}
              </button>
            ))
          )}
        </div>

        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/10 text-[11px] text-slate-500">
          <span><kbd className="text-slate-400">↑↓</kbd> navigate</span>
          <span><kbd className="text-slate-400">↵</kbd> open</span>
          <span><kbd className="text-slate-400">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
