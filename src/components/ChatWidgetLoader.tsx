"use client";

import dynamic from "next/dynamic";

// Client-side dynamic load of the chat widget — keeps it out of SSR and
// initial hydration (floating button appears after load), cutting main-thread
// work on mobile. `ssr: false` is only allowed inside a Client Component.
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
  loading: () => null,
});

export default function ChatWidgetLoader() {
  return <ChatWidget />;
}
