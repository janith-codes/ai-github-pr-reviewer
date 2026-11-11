import { API_BASE_PATH, API_VERSION } from '@ai-pr-reviewer/shared';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module.js';
import type { AppConfiguration } from './config/configuration.js';

const SWAGGER_PATH = `${API_BASE_PATH}/docs`;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<AppConfiguration, true>>(ConfigService);

  app.setGlobalPrefix(API_BASE_PATH);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin: configService.get('cors', { infer: true }).origins,
    credentials: true,
  });

  app.enableShutdownHooks();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('AI GitHub PR Reviewer API')
      .setDescription('REST API for the AI GitHub PR Reviewer platform.')
      .setVersion(API_VERSION)
      .addTag('health', 'Service liveness information')
      .build(),
  );
  SwaggerModule.setup(SWAGGER_PATH, app, swaggerDocument);

  const port = configService.get('port', { infer: true });
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`API listening on http://localhost:${String(port)}${API_BASE_PATH}`);
  logger.log(`OpenAPI documentation on http://localhost:${String(port)}${SWAGGER_PATH}`);
}

await bootstrap();
