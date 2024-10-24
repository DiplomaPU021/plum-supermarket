/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: '@import "./base.scss";',
  },
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'platform-lookaside.fbsbx.com',
          pathname: '**',
        },
    ],
  },
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};
