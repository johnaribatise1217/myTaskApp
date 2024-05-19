/** @type {import('next').NextConfig} */

const nextConfig = {
  images : {
    domains : ["localhost", "img.clerk.com"],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
