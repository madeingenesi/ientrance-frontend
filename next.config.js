const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Next 16 blocca le immagini da IP privati: serve solo per Strapi locale
    dangerouslyAllowLocalIP: !isProduction,
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
      // Strapi locale solo in sviluppo
      ...(isProduction
        ? []
        : [
            {
              protocol: "http",
              hostname: "localhost",
              port: "1337",
              pathname: "/**",
            },
          ]),
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
