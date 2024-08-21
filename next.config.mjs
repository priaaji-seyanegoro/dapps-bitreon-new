/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://cloud-server.gakpent.ing/api/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
