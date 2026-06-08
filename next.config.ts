import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@better-auth/kysely-adapter", "kysely"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      }
    ],
  }
};

export default nextConfig;
