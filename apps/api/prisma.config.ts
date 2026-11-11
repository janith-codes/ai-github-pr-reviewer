import { config as loadEnv } from 'dotenv';
import { defineConfig } from 'prisma/config';

// Prisma does not read `.env` files on its own. The monorepo keeps a single
// `.env` at the repository root; paths resolve against `apps/api`, which is
// the working directory when the Prisma CLI runs through pnpm.
loadEnv({ path: '../../.env', quiet: true });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
