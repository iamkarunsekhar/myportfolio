import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ks-gallery-bucket.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      }
    ],
  }
};

export default nextConfig;
