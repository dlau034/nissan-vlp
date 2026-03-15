import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "a.storyblok.com" },
      { protocol: "https", hostname: "img2.storyblok.com" },
    ],
  },
  // Allow Storyblok Visual Editor to load the site in an iframe
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.storyblok.com https://*.storyblok.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
