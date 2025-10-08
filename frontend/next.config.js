/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove serverExternalPackages or keep it
  serverExternalPackages: ["mongoose"],

  // Image configurations - update for production
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all domains for base64 images
      },
    ],
    domains: ["localhost"],
    unoptimized: true, // Important for Vercel
  },

  // Increase body size limit
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

module.exports = nextConfig;
