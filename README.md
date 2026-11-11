# AI GitHub PR Reviewer

An AI-powered platform that reviews GitHub pull requests automatically. The
eventual system integrates with GitHub Apps, processes webhook events, analyses
code changes with AI, publishes review comments back to the pull request, and
surfaces the results in a dashboard.

> **Project status: initial scaffold.** The monorepo, the web and API
> applications and the database service are in place and verified. No product
> features are implemented yet — see [Roadmap](#roadmap).

## Technology stack

| Area          | Choice                                                              |
| ------------- | ------------------------------------------------------------------- |
| Monorepo      | pnpm workspaces, Turborepo 2.11, TypeScript 6.0                     |
| Frontend      | Next.js 16 (App Router), React 19, Tailwind CSS 4, TanStack Query 5 |
| UI components | shadcn/ui-ready (CSS variables, `cn()` helper, `components.json`)   |
| Backend       | NestJS 12, Express, Swagger / OpenAPI, class-validator              |
| Database      | PostgreSQL 18, Prisma 7                                             |
| Tooling       | ESLint 9, Prettier 3, Docker Compose, GitHub Actions                |

## Repository structure

```
ai-github-pr-reviewer/
├── apps/
│   ├── api/                 NestJS REST API
│   │   ├── prisma/          Prisma schema (no models yet)
│   │   ├── src/
│   │   │   ├── config/      Configuration loading and env validation
│   │   │   ├── health/      Health module
│   │   │   ├── app.module.ts
│   │   │   └── main.ts      Bootstrap: prefix, validation, CORS, Swagger
│   │   └── prisma.config.ts
│   └── web/                 Next.js dashboard
│       ├── src/
│       │   ├── app/         App Router routes and global styles
│       │   ├── components/  React components and providers
│       │   └── lib/         Client-side utilities
│       └── components.json  shadcn/ui configuration
├── packages/
│   └── shared/              Contracts shared between web and API
├── infrastructure/docker/   Container assets (see its README)
├── docs/                    Architecture notes and decisions
├── .github/workflows/       CI pipeline
├── docker-compose.yml       PostgreSQL service
├── turbo.json               Turborepo task graph
├── tsconfig.base.json       Shared strict TypeScript settings
└── .env.example             Environment template
```

## Prerequisites

| Tool    | Version    | Notes                                |
| ------- | ---------- | ------------------------------------ |
| Node.js | >= 20.9    | Developed against 22.x               |
| pnpm    | >= 10      | Pinned via `packageManager` (11.7.0) |
| Docker  | any recent | Required only for PostgreSQL         |

Enable pnpm through Corepack if it is not installed globally:

```bash
corepack enable pnpm
```

## Installation

```bash
pnpm install
```

## Environment setup

Copy the template and adjust it as needed. `.env` is git-ignored; never commit
real credentials.

```bash
cp .env.example .env
```

The repository keeps a single `.env` at the root and both applications read it.

| Variable              | Default                      | Used by                       |
| --------------------- | ---------------------------- | ----------------------------- |
| `NODE_ENV`            | `development`                | Both                          |
| `DATABASE_URL`        | local PostgreSQL on **5433** | Prisma                        |
| `POSTGRES_USER`       | `postgres`                   | Docker Compose                |
| `POSTGRES_PASSWORD`   | `postgres`                   | Docker Compose                |
| `POSTGRES_DB`         | `ai_pr_reviewer`             | Docker Compose                |
| `POSTGRES_PORT`       | `5433`                       | Docker Compose                |
| `API_PORT`            | `4000`                       | API                           |
| `CORS_ORIGIN`         | `http://localhost:3000`      | API (comma-separated origins) |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000`      | Web (inlined at build time)   |

PostgreSQL is published on **5433**, not the default 5432, so it cannot clash
with a PostgreSQL server installed directly on your machine. If you change
`POSTGRES_PORT`, update the port in `DATABASE_URL` to match.

## Database

```bash
pnpm db:up          # start PostgreSQL in the background
pnpm db:logs        # follow its logs
pnpm db:down        # stop it (the named volume is kept)
```

Data persists in the `ai-pr-reviewer-postgres-data` volume. Add `-v` to
`docker compose down` to discard it.

Prisma is configured but has no models yet, so there is nothing to migrate or
generate. Once models exist:

```bash
pnpm db:validate    # check the schema
pnpm db:generate    # generate the Prisma client
```

## Development

```bash
pnpm dev            # start the web app and the API together
pnpm build          # build every package
pnpm lint           # lint every package
pnpm typecheck      # type-check every package
pnpm format         # format with Prettier
```

Every command runs through Turborepo and can be narrowed to one package:

```bash
pnpm --filter @ai-pr-reviewer/api dev
```

## Application URLs

| Service              | URL                                    |
| -------------------- | -------------------------------------- |
| Web dashboard        | http://localhost:3000                  |
| API base path        | http://localhost:4000/api/v1           |
| Health endpoint      | http://localhost:4000/api/v1/health    |
| OpenAPI (Swagger UI) | http://localhost:4000/api/v1/docs      |
| OpenAPI JSON         | http://localhost:4000/api/v1/docs-json |

### Health endpoint

```bash
curl http://localhost:4000/api/v1/health
```

```json
{
  "status": "ok",
  "service": "ai-github-pr-reviewer-api",
  "version": "0.1.0",
  "uptime": 11,
  "timestamp": "2026-11-05T14:05:30.509Z"
}
```

The response shape is defined once in `packages/shared` and consumed by both the
API (as its Swagger schema) and the web app.

## Roadmap

Not implemented yet, by design: GitHub App integration, webhook processing, AI
analysis, background workers, authentication, domain models and migrations, and
dashboard functionality.

See [docs/architecture.md](docs/architecture.md) for the layout and the
reasoning behind the main configuration decisions.
