# Docker assets

Container assets that are not part of an application's own source tree.

The repository currently runs only PostgreSQL in Docker; its service is defined
in [`docker-compose.yml`](../../docker-compose.yml) at the repository root and
needs no extra files, so this directory is still empty.

The web and API applications run locally through `pnpm dev` and are deliberately
not containerised yet. Dockerfiles for them belong here when a deployment target
makes them necessary:

```
infrastructure/docker/
├── api/Dockerfile
└── web/Dockerfile
```
