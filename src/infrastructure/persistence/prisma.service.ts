import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private connected = false;

  constructor() {
    super();
  }

  async onModuleInit() {
    // Run connection in the background so slow/offline DB doesn't block NestJS bootstrap
    try {
      this.$connect()
        .then(() => {
          this.connected = true;
          this.logger.log('Connected to PostgreSQL via Prisma (Write DB)');
        })
        .catch((err: unknown) => {
          this.connected = false;
          const errorMessage = err instanceof Error ? err.message : String(err);
          this.logger.warn(`PostgreSQL is currently offline/not connected. Falling back to robust in-memory data store cache: ${errorMessage}`);
        });
    } catch (err: unknown) {
      this.connected = false;
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`Prisma connection initiation failed. Falling back to robust in-memory data store cache: ${errorMessage}`);
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
