/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@holywater-jeong/utils'],
  experimental: {
    externalDir: true,
    swcMinify: true,
  },
};

module.exports = nextConfig;
