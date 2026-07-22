import { BaseEntity } from './base.entity';

export class OrderItem implements BaseEntity {
  id!: string;

  name!: string;

  price!: number;

  quantity!: number;

  imageUrl?: string;
}
