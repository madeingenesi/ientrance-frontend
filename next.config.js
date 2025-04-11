/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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
