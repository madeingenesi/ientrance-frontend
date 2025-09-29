/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disabilita esplicitamente Turbopack
  experimental: {
    turbo: false,
  },
  // Configurazione immagini per permettere domini esterni
  images: {
    domains: [
      "ambitious-cat-3135f7987e.media.strapiapp.com",
      "ambitious-cat-3135f7987e.strapiapp.com",
      "localhost",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ambitious-cat-3135f7987e.media.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ambitious-cat-3135f7987e.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /mapplic\.js$/,
      loader: "ignore-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
