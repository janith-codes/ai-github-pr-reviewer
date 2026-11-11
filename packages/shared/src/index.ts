/**
 * Contracts shared between the Next.js web app (`apps/web`) and the NestJS API
 * (`apps/api`).
 *
 * Keep this package framework-agnostic: no React, NestJS, DOM or Node-only
 * APIs, so that both runtimes can consume it without pulling in the other
 * side's implementation details.
 */

/** Current API version segment. */
export const API_VERSION = 'v1';

/** Global path prefix every API route is mounted under. */
export const API_BASE_PATH = `/api/${API_VERSION}`;

/** Every state a service or dependency can report, usable at runtime. */
export const SERVICE_STATUSES = ['ok', 'degraded', 'error'] as const;

/** Reported state of a single service or dependency. */
export type ServiceStatus = (typeof SERVICE_STATUSES)[number];

/** Response body of `GET /api/v1/health`. */
export interface HealthResponse {
  /** Overall service state. */
  status: ServiceStatus;
  /** Machine-readable service identifier. */
  service: string;
  /** Running service version. */
  version: string;
  /** Whole seconds the process has been running. */
  uptime: number;
  /** ISO-8601 timestamp of when the check ran. */
  timestamp: string;
}
