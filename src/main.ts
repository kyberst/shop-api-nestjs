import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { MonitoringLoggerService } from './infrastructure/services/monitoring/monitoring-logger.service';
import { AjvValidationPipe } from './api/pipes/ajv-validation.pipe';
import { ApiResponseInterceptor } from './api/interceptors/api-response.interceptor';
import { HttpExceptionFilter } from './api/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { OpenApiLoader } from './infrastructure/services/openapi/openapi-loader';

async function bootstrap() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '' || process.env.JWT_SECRET === 'undefined') {
    process.env.JWT_SECRET = 'default_jwt_secret_key_for_development_mode_12345';
  }

  const optionalVars = ['DATABASE_URL', 'MONGO_URI', 'GEMINI_API_KEY'];
  const missingVars = optionalVars.filter(
    (envVar) => !process.env[envVar] || process.env[envVar].trim() === '' || process.env[envVar] === 'undefined'
  );

  if (missingVars.length > 0) {
    console.warn('\n================================================================');
    console.warn('⚠️ WARNING: Optional Environment Variable(s) Not Provided:');
    missingVars.forEach((envVar) => console.warn(`  - ${envVar}`));
    console.warn('The application will run with local in-memory fallback repositories.');
    console.warn('================================================================\n');
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const port = isProduction
    ? (process.env.PORT ? parseInt(process.env.PORT, 10) : 3000)
    : (process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT, 10) : 3001);
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  
  app.enableShutdownHooks();
  
  const logger = app.get(MonitoringLoggerService);
  app.useLogger(logger);
  
  // Trust the reverse proxy
  app.set('trust proxy', true);
  
  // Security Middlewares
  app.use(helmet());
  app.use(cookieParser());
  
  // Enable CORS with restricted options
  app.enableCors({
    origin: true, // In development, true allows everything, in production we should list allowed origins
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization, Content-Type',
  });
  
  // Global prefix
  app.setGlobalPrefix('api');
  
  // Enable API Versioning (URI-based, defaults to v1)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  
  // Swagger setup
  const openapiDocsDir = path.resolve(__dirname, '..', 'docs', 'openapi');
  const document = OpenApiLoader.load(openapiDocsDir);

  if (Object.keys(document).length > 0) {
    SwaggerModule.setup('docs', app, document);
    logger.log(`[Swagger] OpenAPI documentation loaded and merged from ${openapiDocsDir}`);
  } else {
    // Fallback or empty document if no files found
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('The API description and documentation')
      .setVersion('1.0')
      .build();
    const fallbackDocument = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, fallbackDocument);
    logger.warn(`[Swagger] No OpenAPI fragments found at ${openapiDocsDir}, using empty document`);
  }

  // Register global interceptor and exception filter
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  
  // AJV Validation Pipe
  app.useGlobalPipes(new AjvValidationPipe());
  
  await app.listen(port, '0.0.0.0');
  logger.log(`[NestJS] Backend running on port ${port} (isProduction: ${isProduction})`);
}

bootstrap();
