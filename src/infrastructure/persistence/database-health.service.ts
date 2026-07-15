import { Injectable } from '@nestjs/common';
import { DatabaseHealthService } from '@/domain/services/database-health.service';
import { PrismaService } from './prisma.service';
import { MongooseService } from './mongoose.service';

@Injectable()
export class ConcreteDatabaseHealthService implements DatabaseHealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mongoose: MongooseService,
  ) {}

  isPrismaConnected(): boolean {
    return this.prisma.isConnected();
  }

  isMongooseConnected(): boolean {
    return this.mongoose.isConnected();
  }

  async testPrismaConnection(): Promise<void> {
    await this.prisma.$queryRaw`SELECT 1`;
  }
}
