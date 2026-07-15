import { Provider } from '@nestjs/common';
import { CategoryRepository as ConcreteCategoryRepository } from './repositories/category.repository';
import { ProductRepository as ConcreteProductRepository } from './repositories/product.repository';
import { OrderRepository as ConcreteOrderRepository } from './repositories/order.repository';
import { UserRepository as ConcreteUserRepository } from './repositories/user.repository';
import { RolePermissionRepository as ConcreteRolePermissionRepository } from './repositories/role-permission/role-permission.repository';
import { PrismaService } from './persistence/prisma.service';
import { MongooseService } from './persistence/mongoose.service';
import { Result, ok, err } from '@/shared/types/result';

import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { OrderRepository } from '@/domain/repositories/order.repository';
import { UserRepository } from '@/domain/repositories/user.repository';
import { RolePermissionRepository } from '@/domain/repositories/role-permission.repository';

import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { CacheService } from '@/shared/interfaces/cache/cache.interface';
import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';
import { AiService } from '@/shared/interfaces/ai/ai.service.interface';
import { LoggerService } from '@/domain/services/logger.service';

/**
 * Utility to avoid repeating "if(isConnected())" everywhere.
 * Wraps database operations in a Result object.
 */
export const dbGuard = async <T>(
  service: { isConnected: () => boolean },
  action: () => Promise<T>,
): Promise<Result<T>> => {
  if (service && typeof service.isConnected === 'function' && service.isConnected()) {
    try {
      const data = await action();
      return ok(data);
    } catch (error: any) {
      return err(new Error(error?.message || 'Database operation failed'));
    }
  }
  return err(new Error('Database service is offline or unavailable'));
};

export const repositoryProviders: Provider[] = [
  {
    provide: PrismaService,
    useExisting: PrismaService,
  },
  {
    provide: CategoryRepository,
    useClass: ConcreteCategoryRepository,
  },
  {
    provide: ProductRepository,
    useClass: ConcreteProductRepository,
  },
  {
    provide: OrderRepository,
    useClass: ConcreteOrderRepository,
  },
  {
    provide: UserRepository,
    useClass: ConcreteUserRepository,
  },
  {
    provide: RolePermissionRepository,
    useClass: ConcreteRolePermissionRepository,
  },
];

export const allInfrastructureProviders: Provider[] = [
  ...repositoryProviders,
];

export const persistenceTokens = [
  PrismaService,
  CategoryRepository,
  ProductRepository,
  OrderRepository,
  UserRepository,
  RolePermissionRepository,
];

export const infrastructureTokens = [
  ...persistenceTokens,
  CacheService,
  MonitoringService,
  AiService,
  LoggerService,
];
