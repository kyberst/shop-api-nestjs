import { Order } from '@/domain/entities/order.entity';
import { ordersPart1 } from './orders/part1';
import { ordersPart2 } from './orders/part2';
import { ordersPart3 } from './orders/part3';
import { ordersPart4 } from './orders/part4';
import { ordersPart5 } from './orders/part5';

function ensureUuid(id: string): string {
  if (id && id.startsWith('prod-')) {
    const numStr = id.replace('prod-', '');
    const padded = numStr.padStart(12, '0');
    return `00000000-0000-4000-a000-${padded}`;
  }
  return id;
}

const rawOrders: Order[] = [
  ...ordersPart1,
  ...ordersPart2,
  ...ordersPart3,
  ...ordersPart4,
  ...ordersPart5
];

export const seedOrders: Order[] = rawOrders.map(order => ({
  ...order,
  items: (order.items || []).map(item => ({
    ...item,
    id: ensureUuid(item.id)
  }))
}));

