const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
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
