import { User } from '@/domain/entities/user.entity';
export interface IFindByIdUserRepository {
  findById(id: string): Promise<User | null>;
}
