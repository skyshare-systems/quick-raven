/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["ui"],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
