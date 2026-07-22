import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { seedUsers } from '@/infrastructure/persistence/seeds/users.seed';
import { SeedTracker } from './seed-tracker';
import { LoggerService } from '@/domain/services/logger.service';

export const performUserSeeding = async (prisma: PrismaService, logger: LoggerService) => {
  const hash = SeedTracker.getHash(seedUsers);
  const shouldSeed = await SeedTracker.shouldSeed(prisma, 'users', hash);

  if (!shouldSeed) {
    logger.log('Users seed has not changed. Skipping User seeding.', 'UserSeed');
    return;
  }

  logger.log('Seeding/Updating users (changes detected)...', 'UserSeed');

  for (const user of seedUsers) {
    const data = {
      email: user.email.toLowerCase().trim(),
      name: user.name,
      password: user.password,
      role: user.role,
    };

    await prisma.user.upsert({
      where: { id: user.id },
      create: { id: user.id, ...data },
      update: data,
    });
  }

  await SeedTracker.updateHistory(prisma, 'users', hash);
  logger.log('Users seeded and hash updated.', 'UserSeed');
};
