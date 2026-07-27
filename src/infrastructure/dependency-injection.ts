import { Provider } from '@nestjs/common';
import { CategoryRepository as ConcreteCategoryRepository } from '@/infrastructure/repositories/category.repository';
import { CategoryQueryRepository as ConcreteCategoryQueryRepository } from '@/infrastructure/repositories/category.query.repository';
import { ProductRepository as ConcreteProductRepository } from '@/infrastructure/repositories/product.repository';
import { ProductQueryRepository as ConcreteProductQueryRepository } from '@/infrastructure/repositories/product.query.repository';
import { OrderRepository as ConcreteOrderRepository } from '@/infrastructure/repositories/order.repository';
import { OrderQueryRepository as ConcreteOrderQueryRepository } from '@/infrastructure/repositories/order.query.repository';
import { UserRepository as ConcreteUserRepository } from '@/infrastructure/repositories/user.repository';
import { RolePermissionRepository as ConcreteRolePermissionRepository } from '@/infrastructure/repositories/role-permission.repository';
import { RolePermissionQueryRepository as ConcreteRolePermissionQueryRepository } from '@/infrastructure/repositories/role-permission.query.repository';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { ConcreteDatabaseHealthService } from '@/infrastructure/persistence/database-health.service';

import { CategoryRepository } from '@/domain/repositories/category.repository';
import { CategoryQueryRepository } from '@/domain/repositories/category.query.repository';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { ProductQueryRepository } from '@/domain/repositories/product.query.repository';
import { OrderRepository } from '@/domain/repositories/order.repository';
import { OrderQueryRepository } from '@/domain/repositories/order.query.repository';
import { UserRepository } from '@/domain/repositories/user.repository';
import { RolePermissionRepository } from '@/domain/repositories/role-permission.repository';
import { RolePermissionQueryRepository } from '@/domain/repositories/role-permission.query.repository';
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
    provide: CategoryQueryRepository,
    useClass: ConcreteCategoryQueryRepository,
  },
  {
    provide: ProductRepository,
    useClass: ConcreteProductRepository,
  },
  {
    provide: ProductQueryRepository,
    useClass: ConcreteProductQueryRepository,
  },
  {
    provide: OrderRepository,
    useClass: ConcreteOrderRepository,
  },
  {
    provide: OrderQueryRepository,
    useClass: ConcreteOrderQueryRepository,
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
    provide: RolePermissionQueryRepository,
    useClass: ConcreteRolePermissionQueryRepository,
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
  CategoryQueryRepository,
  ProductRepository,
  ProductQueryRepository,
  OrderRepository,
  OrderQueryRepository,
  UserRepository,
  RolePermissionRepository,
  RolePermissionQueryRepository,
  DatabaseHealthService,
];

export const infrastructureTokens = [
  ...persistenceTokens,
  CacheService,
  MonitoringService,
  AiService,
  LoggerService,
];
