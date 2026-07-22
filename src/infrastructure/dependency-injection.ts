import { Provider } from '@nestjs/common';
import { CategoryRepository as ConcreteCategoryRepository } from '@/infrastructure/repositories/category.repository';
import { ProductRepository as ConcreteProductRepository } from '@/infrastructure/repositories/product.repository';
import { StoreProductRepository as ConcreteStoreProductRepository } from '@/infrastructure/repositories/store-product.repository';
import { AdminProductRepository as ConcreteAdminProductRepository } from '@/infrastructure/repositories/admin-product.repository';
import { OrderRepository as ConcreteOrderRepository } from '@/infrastructure/repositories/order.repository';
import { UserRepository as ConcreteUserRepository } from '@/infrastructure/repositories/user.repository';
import { RolePermissionRepository as ConcreteRolePermissionRepository } from '@/infrastructure/repositories/role-permission.repository';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { ConcreteDatabaseHealthService } from '@/infrastructure/persistence/database-health.service';

import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { StoreProductRepository } from '@/domain/repositories/store-product.repository';
import { AdminProductRepository } from '@/domain/repositories/admin-product.repository';
import { OrderRepository } from '@/domain/repositories/order.repository';
import { UserRepository } from '@/domain/repositories/user.repository';
import { RolePermissionRepository } from '@/domain/repositories/role-permission.repository';
import { DatabaseHealthService } from '@/domain/services/database-health.service';

import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { CacheService } from '@/shared/interfaces/cache/cache.interface';
import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';
import { AiService } from '@/shared/interfaces/ai/ai.service.interface';
import { LoggerService } from '@/domain/services/logger.service';

export const repositoryProviders: Provider[] = [
  {
    provide: CategoryRepository,
    useClass: ConcreteCategoryRepository,
  },
  {
    provide: ProductRepository,
    useClass: ConcreteProductRepository,
  },
  {
    provide: StoreProductRepository,
    useClass: ConcreteStoreProductRepository,
  },
  {
    provide: AdminProductRepository,
    useClass: ConcreteAdminProductRepository,
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
  {
    provide: DatabaseHealthService,
    useClass: ConcreteDatabaseHealthService,
  },
];

export const allInfrastructureProviders: Provider[] = [
  ...repositoryProviders,
];

export const persistenceTokens = [
  PrismaService,
  CategoryRepository,
  ProductRepository,
  StoreProductRepository,
  AdminProductRepository,
  OrderRepository,
  UserRepository,
  RolePermissionRepository,
  DatabaseHealthService,
];

export const infrastructureTokens = [
  ...persistenceTokens,
  CacheService,
  MonitoringService,
  AiService,
  LoggerService,
];
