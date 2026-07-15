import { BaseEntity } from './base.entity';

export class User implements BaseEntity {
  id!: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  email!: string;
  name!: string;
  role?: 'admin' | 'sales' | 'user';
  password?: string;

  static create(data: Partial<User>): User {
    const user = new User();
    Object.assign(user, {
      role: 'user',
      ...data,
      email: data.email?.toLowerCase().trim()
    });
    return user;
  }
}
