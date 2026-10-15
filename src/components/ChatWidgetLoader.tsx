"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Client-side dynamic load of the chat widget — keeps it out of SSR and
// initial hydration (floating button appears after load), cutting main-thread
// work on mobile. `ssr: false` is only allowed inside a Client Component.
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
  loading: () => null,
});

// Defer mounting until the browser is idle (or 2s cap) — the widget's JS,
// SSE hooks and avatar image no longer compete with first-load hydration,
// which was the biggest main-thread cost on mobile (TBT ~840ms).
export default function ChatWidgetLoader() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as any;
    const go = () => setReady(true);
    const cancel =
      typeof w.requestIdleCallback === "function"
        ? (() => { const id = w.requestIdleCallback(go, { timeout: 2000 }); return () => w.cancelIdleCallback(id); })()
        : (() => { const id = setTimeout(go, 2000); return () => clearTimeout(id); })();
    return cancel;
  }, []);
  return ready ? <ChatWidget /> : null;
}
