import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MongooseService } from './mongoose.service';
import { LoggerService } from '@/domain/services/logger.service';
import { performCategorySeeding } from './logic/seed-categories';
import { performProductSeeding } from './logic/seed-products';
import { performOrderSeeding } from './logic/seed-orders';
import { performUserSeeding } from './logic/seed-users';
import { performPermissionSeeding } from './logic/seed-permissions';
import { runModularMigrations } from './logic/migration-runner';
import { dbGuard } from './db-guard';

@Injectable()
export class PersistenceService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mongoose: MongooseService,
    private readonly logger: LoggerService,
  ) {}

  private async waitForConnections(timeoutMs = 3000, intervalMs = 100): Promise<{ prisma: boolean; mongoose: boolean }> {
    const startTime = Date.now();
    const hasMongo = !!process.env.MONGO_URI;

    while (Date.now() - startTime < timeoutMs) {
      const prismaOk = this.prisma.isConnected();
      const mongoOk = !hasMongo || this.mongoose.isConnected();

      if (prismaOk && mongoOk) {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }

    return {
      prisma: this.prisma.isConnected(),
      mongoose: this.mongoose.isConnected(),
    };
  }

  async onModuleInit() {
    this.logger.log('PersistenceService initializing...', 'PersistenceService');
    
    // Wait for asynchronous database connections to resolve
    const { prisma: prismaConnected, mongoose: mongooseConnected } = await this.waitForConnections();
    
    if (prismaConnected) {
      this.logger.log('Prisma connected. Proceeding with migrations and seeds...', 'PersistenceService');
      await this.applyMigrations();
      await this.seedAll();
    } else {
      this.logger.warn('Prisma connection timed out. Skipping migrations and seeds.', 'PersistenceService');
    }
  }

  private async applyMigrations() {
    await dbGuard(this.prisma, async () => {
      this.logger.log('Starting modular migrations...', 'PersistenceService');
      await runModularMigrations(this.prisma, this.logger);
    });
  }

  private async seedAll() {
    await dbGuard(this.prisma, async () => {
      this.logger.log('Running persistence seeding...', 'PersistenceService');
      const mongooseConnected = this.mongoose.isConnected();
      
      await performCategorySeeding(this.prisma, mongooseConnected, this.logger);
      await performProductSeeding(this.prisma, mongooseConnected, this.logger);
      await performOrderSeeding(this.prisma, mongooseConnected, this.logger);
      await performUserSeeding(this.prisma, this.logger);
      await performPermissionSeeding(this.prisma, mongooseConnected, this.logger);
      
      this.logger.log('Seeding completed successfully.', 'PersistenceService');
    });
  }
}
