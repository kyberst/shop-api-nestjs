import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import * as crypto from 'crypto';

export class SeedTracker {
  static async init(prisma: PrismaService): Promise<void> {
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "_seed_history" (
          "key" VARCHAR(255) PRIMARY KEY,
          "hash" VARCHAR(255) NOT NULL,
          "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (error) {
      console.error('Failed to initialize seed history table:', error);
    }
  }

  static getHash(data: any): string {
    // Generate a SHA-256 hash from stringified data
    const str = JSON.stringify(data);
    return crypto.createHash('sha256').update(str).digest('hex');
  }

  static async shouldSeed(prisma: PrismaService, key: string, currentHash: string): Promise<boolean> {
    await this.init(prisma);
    try {
      const result: any[] = await prisma.$queryRawUnsafe(
        'SELECT "hash" FROM "_seed_history" WHERE "key" = $1',
        key
      );
      if (!result || result.length === 0) {
        return true;
      }
      return result[0].hash !== currentHash;
    } catch (error) {
      console.warn(`Could not check seed history for key ${key}, defaulting to true:`, error);
      return true;
    }
  }

  static async updateHistory(prisma: PrismaService, key: string, hash: string): Promise<void> {
    try {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "_seed_history" ("key", "hash", "updatedAt") 
         VALUES ($1, $2, CURRENT_TIMESTAMP) 
         ON CONFLICT ("key") DO UPDATE SET "hash" = $2, "updatedAt" = CURRENT_TIMESTAMP`,
        key,
        hash
      );
    } catch (error) {
      console.error(`Failed to update seed history for key ${key}:`, error);
    }
  }
}

