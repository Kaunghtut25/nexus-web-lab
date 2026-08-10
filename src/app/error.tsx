"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-extrabold bg-gradient-to-r from-blue to-cyan bg-clip-text text-transparent mb-4">
          ⚠️
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-slate-400 mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue to-cyan text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
