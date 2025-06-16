import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Allow images from specific domains
  images: {
    domains: ["png.pngtree.com"],
  },

  // ✅ Skip ESLint during Vercel or production builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Skip type errors during build (useful when pushing unfinished features)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
