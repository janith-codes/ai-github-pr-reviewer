import { config as loadEnv } from 'dotenv';
import type { NextConfig } from 'next';

/**
 * The monorepo keeps a single `.env` at the repository root. Next.js only
 * auto-loads `.env` files from the app directory, so the root file is loaded
 * here, before the config is evaluated and `NEXT_PUBLIC_*` values are inlined
 * into the client bundle. Real environment variables always win.
 */
loadEnv({ path: '../../.env', quiet: true });

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind CSS v4 is applied through its Turbopack loader.
  turbopack: {
    rules: {
      './src/**/*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
