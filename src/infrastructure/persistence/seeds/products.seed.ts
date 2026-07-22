import { Product } from '@/domain/entities/product.entity';
import { productsPart1 } from './products/part1';
import { productsPart2 } from './products/part2';
import { productsPart3 } from './products/part3';
import { productsPart4 } from './products/part4';
import { productsPart5 } from './products/part5';

function ensureUuid(id: string): string {
  if (id && id.startsWith('prod-')) {
    const numStr = id.replace('prod-', '');
    const padded = numStr.padStart(12, '0');
    return `00000000-0000-4000-a000-${padded}`;
  }
  return id;
}

const rawProducts: Product[] = [
  ...productsPart1,
  ...productsPart2,
  ...productsPart3,
  ...productsPart4,
  ...productsPart5
];

export const seedProducts: Product[] = rawProducts.map(p => ({
  ...p,
  id: ensureUuid(p.id)
}));

