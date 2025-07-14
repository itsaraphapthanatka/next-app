import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false,
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/callback",
        destination: "/auth/callback",
      },
    ];
  },
};

export default nextConfig;