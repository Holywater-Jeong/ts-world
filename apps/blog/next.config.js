/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['tsconfig'],
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
