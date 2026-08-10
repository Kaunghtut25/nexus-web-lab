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
