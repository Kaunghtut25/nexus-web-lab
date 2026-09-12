import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false, // Remove X-Powered-By: Next.js header (security hardening)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'jrecruit-site.vercel.app', pathname: '/**' },
      { protocol: 'https', hostname: 'stardust-co-eight.vercel.app', pathname: '/**' },
      { protocol: 'https', hostname: 'azami-training-center.vercel.app', pathname: '/**' },
      { protocol: 'https', hostname: 'i.pravatar.cc', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    // Next's default deviceSizes list ends at 3840. Full-bleed heroes declare
    // sizes="100vw", so a 2x (Retina) 1440px desktop selected the 3840 variant —
    // several hundred KB for an image displayed at half that width. Capping the
    // list at 2560 keeps large displays sharp while never generating the 3840
    // transform (also fewer variants to bill and cache on Vercel).
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    // Next.js 16 snaps every image's quality prop to the CLOSEST value in this
    // list (findClosestQuality). The default is [75] only — so quality={70} or
    // {100} silently render as 75, which made card images look soft. Allow the
    // values the site actually uses so props take effect.
    qualities: [70, 75, 80, 90, 100],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Clickjacking protection (legacy browsers)
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Prevent MIME-sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Control referrer info sent cross-origin
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Disable unused browser features (camera/mic/geo)
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // NOTE: Content-Security-Policy is set by src/middleware.ts (nonce-based)
        ],
      },
    ];
  },
};

export default nextConfig;
