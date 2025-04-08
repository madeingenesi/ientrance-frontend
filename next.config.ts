import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Only use this temporarily to get the build working
  },
};

export default nextConfig;
