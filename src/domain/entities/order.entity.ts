import { BaseEntity } from './base.entity';

export class OrderItem implements BaseEntity {
  id!: string;

  name!: string;

  price!: number;

  quantity!: number;

  imageUrl?: string;
}

export interface Order extends BaseEntity {
  customer: string;
  customerEmail: string;
  userId: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  items: OrderItem[];
}

export class OrderEntity implements Order {
  id!: string;
  createdAt?: Date;
  updatedAt?: Date;
  customer!: string;
  customerEmail!: string;
  userId!: string;
  date!: string;
  total!: number;
  status!: 'Pending' | 'Shipped' | 'Delivered';
  items!: OrderItem[];

  static create(data: Partial<Order>): OrderEntity {
    const order = new OrderEntity();
    Object.assign(order, {
      status: 'Pending',
      date: new Date().toISOString(),
      items: [],
      ...data
    });
    order.total = order.calculateTotal();
    return order;
  }

  calculateTotal(): number {
    return (this.items || []).reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
