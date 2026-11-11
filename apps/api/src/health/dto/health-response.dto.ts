import { type HealthResponse, SERVICE_STATUSES, type ServiceStatus } from '@ai-pr-reviewer/shared';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Swagger representation of the shared `HealthResponse` contract. The
 * `implements` clause keeps this schema and the shared type in step.
 */
export class HealthResponseDto implements HealthResponse {
  @ApiProperty({ enum: SERVICE_STATUSES, example: 'ok', description: 'Overall service state' })
  status: ServiceStatus;

  @ApiProperty({ example: 'ai-github-pr-reviewer-api', description: 'Service identifier' })
  service: string;

  @ApiProperty({ example: '0.1.0', description: 'Running service version' })
  version: string;

  @ApiProperty({ example: 42, description: 'Whole seconds the process has been running' })
  uptime: number;

  @ApiProperty({
    example: '2026-01-01T12:00:00.000Z',
    description: 'ISO-8601 timestamp of when the check ran',
  })
  timestamp: string;
}
