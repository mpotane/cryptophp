/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "markyblobstorage.blob.core.windows.net",
        port: '',
        pathname: '/images-cryptophp/launch.png'
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
