import { API_VERSION } from '@ai-pr-reviewer/shared';

const DEFAULT_API_PORT = 4000;
const DEFAULT_CORS_ORIGIN = 'http://localhost:3000';

/**
 * Namespaced application configuration, loaded once by `ConfigModule` and read
 * through `ConfigService`. Nothing outside this file should read `process.env`.
 */
export const configuration = () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  service: {
    name: 'ai-github-pr-reviewer-api',
    version: process.env.npm_package_version ?? '0.1.0',
    apiVersion: API_VERSION,
  },
  port: Number.parseInt(process.env.API_PORT ?? String(DEFAULT_API_PORT), 10),
  cors: {
    origins: (process.env.CORS_ORIGIN ?? DEFAULT_CORS_ORIGIN)
      .split(',')
      .map((origin) => origin.trim())
      .filter((origin) => origin.length > 0),
  },
  database: {
    // Consumed by Prisma once the data layer is wired up.
    url: process.env.DATABASE_URL,
  },
});

export type AppConfiguration = ReturnType<typeof configuration>;
