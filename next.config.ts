import type { NextConfig } from "next";
import { execSync } from "child_process";
import { version } from "./package.json";

let commitHash = "unknown";
try {
  commitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch (e) {
  console.warn("⚠️  Cannot read git commit hash");
}

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
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_COMMIT_HASH: commitHash,
  },
};

export default nextConfig;
