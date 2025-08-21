// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  // ЗАКОММЕНТИРУЙТЕ или УДАЛИТЕ этот блок:
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, // ← вот здесь undefined!
  //     },
  //   ];
  // }
};

module.exports = nextConfig;