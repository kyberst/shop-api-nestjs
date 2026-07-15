import { BaseEntity } from './base.entity';

export class Category implements BaseEntity {
  id!: string;

  createdAt?: Date;

  updatedAt?: Date;

  name!: string;

  isActive?: boolean;
}
