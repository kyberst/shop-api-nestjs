import { BaseEntity } from './base.entity';

export type UserRoleType = 'admin' | 'sales' | 'user';

export class User implements BaseEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly role: UserRoleType = 'user',
    public readonly password?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly createdBy?: string,
    public readonly updatedBy?: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id || this.id.trim() === '') {
      throw new Error('User ID is required');
    }
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Invalid email format');
    }
    if (!this.name || this.name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    if (!['admin', 'sales', 'user'].includes(this.role)) {
      throw new Error(`Invalid role: ${this.role}`);
    }
  }

  public isAdmin(): boolean {
    return this.role === 'admin';
  }

  public isSales(): boolean {
    return this.role === 'sales';
  }

  public isUser(): boolean {
    return this.role === 'user';
  }

  public updateRole(newRole: UserRoleType): User {
    if (this.role === 'user' && newRole !== 'user') {
      throw new Error('Client role is immutable');
    }
    if (this.role !== 'user' && newRole === 'user') {
      throw new Error('Staff role cannot be changed to client role');
    }
    return new User(
      this.id,
      this.email,
      this.name,
      newRole,
      this.password,
      this.createdAt,
      new Date(),
      this.createdBy,
      this.updatedBy
    );
  }

  public updatePassword(hashedPassword: string): User {
    if (!hashedPassword || hashedPassword.trim() === '') {
      throw new Error('Hashed password cannot be empty');
    }
    return new User(
      this.id,
      this.email,
      this.name,
      this.role,
      hashedPassword,
      this.createdAt,
      new Date(),
      this.createdBy,
      this.updatedBy
    );
  }

  public updateName(newName: string): User {
    return new User(
      this.id,
      this.email,
      newName,
      this.role,
      this.password,
      this.createdAt,
      new Date(),
      this.createdBy,
      this.updatedBy
    );
  }

  static create(data: {
    id: string;
    email: string;
    name: string;
    role?: UserRoleType;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
  }): User {
    return new User(
      data.id,
      data.email.toLowerCase().trim(),
      data.name.trim(),
      data.role || 'user',
      data.password,
      data.createdAt || new Date(),
      data.updatedAt || new Date(),
      data.createdBy,
      data.updatedBy
    );
  }
}

