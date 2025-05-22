import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.ppy.sh",
      },
    ],
  },
};

export default nextConfig;
