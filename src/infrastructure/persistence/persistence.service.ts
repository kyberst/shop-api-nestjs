import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MongooseService } from './mongoose.service';
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
    console.log('PersistenceService initializing...');
    
    // Wait for asynchronous database connections to resolve
    const { prisma: prismaConnected, mongoose: mongooseConnected } = await this.waitForConnections();
    
    if (prismaConnected) {
      console.log('Prisma connected. Proceeding with migrations and seeds...');
      await this.applyMigrations();
      await this.seedAll();
    } else {
      console.warn('Prisma connection timed out. Skipping migrations and seeds.');
    }
  }

  private async applyMigrations() {
    await dbGuard(this.prisma, async () => {
      console.log('Starting modular migrations...');
      await runModularMigrations(this.prisma);
    });
  }

  private async seedAll() {
    await dbGuard(this.prisma, async () => {
      console.log('Running persistence seeding...');
      const mongooseConnected = this.mongoose.isConnected();
      
      await performCategorySeeding(this.prisma, mongooseConnected);
      await performProductSeeding(this.prisma, mongooseConnected);
      await performOrderSeeding(this.prisma, mongooseConnected);
      await performUserSeeding(this.prisma);
      await performPermissionSeeding(this.prisma, mongooseConnected);
      
      console.log('Seeding completed successfully.');
    });
  }
}
