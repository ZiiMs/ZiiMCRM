/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/dashboard/:id',
  //       destination: '/',
  //     },
  //   ];
  // },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;

