/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
    },
  };

module.exports = nextConfig
