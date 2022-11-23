// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

import { withPlausibleProxy } from "next-plausible";

const withPlausible = withPlausibleProxy({
  scriptName: "pa",
  subdirectory: "static",
  customDomain: "https://plausible.henriktech.com",
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default withPlausible(config);
