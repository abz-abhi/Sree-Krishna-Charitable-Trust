/** @type {import('next').NextConfig} */
const nextConfig = {
  // For external packages in Server Components
  serverExternalPackages: ["mongoose"],

  // Image configurations
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
    ],
    domains: ["localhost"],
  },

  // ✅ CORRECT way to increase body size limit in Next.js 15
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

module.exports = nextConfig;
