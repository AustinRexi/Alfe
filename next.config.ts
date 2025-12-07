// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // THIS FIXES YOUR IMAGE ERROR
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      // Add more domains later if needed (Cloudinary, your own domain, etc.)
    ],
  },
};

export default nextConfig;
