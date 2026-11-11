import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from './config/configuration.js';
import { validateEnv } from './config/env.validation.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // The monorepo keeps one `.env` at the repository root; an app-local
      // `.env` may override it. Paths resolve against the working directory,
      // which is `apps/api` when started through pnpm or Turborepo.
      envFilePath: ['../../.env', '.env'],
      load: [configuration],
      validate: validateEnv,
    }),
    HealthModule,
  ],
})
export class AppModule {}
