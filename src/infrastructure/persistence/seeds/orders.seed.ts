import { Order } from '@/domain/entities/order.entity';
import { ordersPart1 } from './orders/part1';
import { ordersPart2 } from './orders/part2';
import { ordersPart3 } from './orders/part3';
import { ordersPart4 } from './orders/part4';
import { ordersPart5 } from './orders/part5';

export const seedOrders: Order[] = [
  ...ordersPart1,
  ...ordersPart2,
  ...ordersPart3,
  ...ordersPart4,
  ...ordersPart5
];
