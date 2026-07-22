import { PrismaService } from '@/infrastructure/persistence/prisma.service';

export const countUsersByRoleLogic = async (prisma: PrismaService, role: string): Promise<number> => {
  return prisma.user.count({
    where: {
      role,
    },
  });
};
