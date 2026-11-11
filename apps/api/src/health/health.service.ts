import type { HealthResponse } from '@ai-pr-reviewer/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { AppConfiguration } from '../config/configuration.js';

@Injectable()
export class HealthService {
  constructor(private readonly configService: ConfigService<AppConfiguration, true>) {}

  /** Reports that the process is up. Dependency checks are added later. */
  check(): HealthResponse {
    const service = this.configService.get('service', { infer: true });

    return {
      status: 'ok',
      service: service.name,
      version: service.version,
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
