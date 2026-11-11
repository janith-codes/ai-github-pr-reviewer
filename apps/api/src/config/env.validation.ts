import { plainToInstance } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min, validateSync } from 'class-validator';

export enum NodeEnvironment {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

/**
 * Shape of the environment variables this service understands. Every variable
 * is optional because the defaults in `configuration.ts` are enough to boot a
 * local development instance; validation guards against malformed values
 * rather than against missing ones.
 */
class EnvironmentVariables {
  @IsOptional()
  @IsEnum(NodeEnvironment)
  NODE_ENV?: NodeEnvironment;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(65_535)
  API_PORT?: number;

  @IsOptional()
  @IsString()
  CORS_ORIGIN?: string;

  @IsOptional()
  @IsString()
  DATABASE_URL?: string;
}

/**
 * Fails fast at bootstrap when a known environment variable is malformed.
 *
 * Receives the merged `process.env` plus `.env` contents, so unknown keys are
 * deliberately preserved instead of being stripped.
 */
export function validateEnv(raw: Record<string, unknown>): Record<string, unknown> {
  const candidate = plainToInstance(EnvironmentVariables, raw, {
    enableImplicitConversion: true,
    excludeExtraneousValues: false,
  });

  const errors = validateSync(candidate, { skipMissingProperties: false });

  if (errors.length > 0) {
    const details = errors
      .map((error) => Object.values(error.constraints ?? {}).join(', '))
      .join('; ');
    throw new Error(`Invalid environment configuration: ${details}`);
  }

  return raw;
}
