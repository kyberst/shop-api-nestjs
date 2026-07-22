import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { LoggerService } from '@/domain/services/logger.service';
import * as fs from 'fs';
import * as path from 'path';

export const runModularMigrations = async (prisma: PrismaService, logger: LoggerService) => {
  const migrationsDir = path.join(__dirname, '..', '..', 'migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    logger.warn(`Migrations directory not found at: ${migrationsDir}`, 'MigrationRunner');
    return;
  }

  const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort(); // Ensure consistent order

  logger.log(`Found ${files.length} modular migrations. Applying...`, 'MigrationRunner');

  for (const file of files) {
    try {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      // We execute each modular file using Prisma's raw execution
      // This is equivalent to "Applying migration" in EF
      await prisma.$executeRawUnsafe(sql);
      logger.log(`Successfully applied: ${file}`, 'MigrationRunner');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      // We ignore "already exists" errors to allow re-running (Idempotency)
      if (errorMessage.includes('already exists')) {
        logger.log(`Migration ${file} already applied (skipping).`, 'MigrationRunner');
      } else {
        logger.error(`Failed to apply migration ${file}:`, errorMessage, 'MigrationRunner');
        throw error;
      }
    }
  }
};
