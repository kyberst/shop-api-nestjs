import { User } from '@/domain/entities/user.entity';
export interface IFindAllUsersRepository {
  findAll(): Promise<User[]>;
}
