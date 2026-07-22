import { Injectable } from '@nestjs/common';
import { User } from '@/domain/entities/user.entity';
import { UserRepository as DomainUserRepository } from '@/domain/repositories/user.repository';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { findUserByEmailInternalLogic } from './user/find-by-email.internal';
import { saveUserLogic } from './user/save';
import { findAllUsersLogic } from './user/find-all';
import { findUserByIdLogic } from './user/find-by-id';
import { countUsersByRoleLogic } from './user/count-by-role';

@Injectable()
export class UserRepository extends DomainUserRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async findByEmail(email: string): Promise<User | null> {
    // Differentiation: Use Internal logic for business validation/auth
    return findUserByEmailInternalLogic(this.prisma, email);
  }

  async save(user: User): Promise<MutationSummary> {
    return saveUserLogic(this.prisma, user);
  }

  async findAll(): Promise<User[]> {
    return findAllUsersLogic(this.prisma);
  }

  async findById(id: string): Promise<User | null> {
    return findUserByIdLogic(this.prisma, id);
  }

  async countByRole(role: 'admin' | 'sales' | 'user'): Promise<number> {
    return countUsersByRoleLogic(this.prisma, role);
  }
}

