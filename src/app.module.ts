import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { existsSync } from 'fs';
import { HealthModule } from './infrastructure/modules/health.module';
import { AuthModule } from './infrastructure/modules/auth.module';
import { PaymentModule } from './infrastructure/modules/payment.module';
import { PersistenceModule } from './infrastructure/modules/persistence.module';
import { CategoriesModule } from './infrastructure/modules/categories.module';
import { ProductsModule } from './infrastructure/modules/products.module';
import { OrdersModule } from './infrastructure/modules/orders.module';
import { UsersModule } from './infrastructure/modules/users.module';
import { MediatorModule } from './infrastructure/mediator/mediator.module';
import { AiModule } from './infrastructure/modules/ai.module';

import { NotificationsModule } from './infrastructure/modules/notifications.module';
import { MonitoringModule } from './infrastructure/modules/monitoring.module';
import { RedisModule } from './infrastructure/modules/redis.module';
import { SecurityModule } from './api/security.module';
import { PermissionsModule } from './infrastructure/modules/permissions.module';
import { RateLimitMiddleware } from './api/middleware/rate-limit/rate-limit.middleware';

const frontendDistPath = join(__dirname, '..', '..', 'frontend', 'dist');
const serveStaticModule = existsSync(frontendDistPath)
  ? [
      ServeStaticModule.forRoot({
        rootPath: frontendDistPath,
        exclude: ['/api/(.*)'],
      }),
    ]
  : [];

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
    ...serveStaticModule,
    MediatorModule,
    HealthModule,
    AuthModule,
    PaymentModule,
    PersistenceModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    AiModule,
    NotificationsModule,
    MonitoringModule,
    RedisModule,
    SecurityModule,
    PermissionsModule,
  ],
})
export class AppModule {
  configure(consumer: any) {
    consumer
      .apply(RateLimitMiddleware)
      .forRoutes('*');
  }
}
