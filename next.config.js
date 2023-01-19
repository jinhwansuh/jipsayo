/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
