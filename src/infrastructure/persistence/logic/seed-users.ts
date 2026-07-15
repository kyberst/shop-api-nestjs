import { PrismaService } from '../prisma.service';
import { seedUsers } from '../seeds/users.seed';

export const performUserSeeding = async (prisma: PrismaService) => {
  const mysqlUsersCount = await prisma.user.count();
  if (mysqlUsersCount === 0) {
    console.log('Seeding MySQL users...');
    for (const user of seedUsers) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email.toLowerCase().trim(),
          name: user.name,
          password: user.password,
          role: user.role,
        },
      });
    }
  }
};
