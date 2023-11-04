// @ts-check
// await import("./drand.mjs");

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const { env } = await import("./src/env.mjs");

if (env.MIGRATE_DB || env.NODE_ENV === "production") {
  await import("./migrate.mjs");
}

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    typedRoutes: true,
  },
};

export default config;
