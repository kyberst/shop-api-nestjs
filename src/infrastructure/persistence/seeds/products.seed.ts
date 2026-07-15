import { Product } from '@/domain/entities/product.entity';
import { productsPart1 } from './products/part1';
import { productsPart2 } from './products/part2';
import { productsPart3 } from './products/part3';
import { productsPart4 } from './products/part4';
import { productsPart5 } from './products/part5';

export const seedProducts: Product[] = [
  ...productsPart1,
  ...productsPart2,
  ...productsPart3,
  ...productsPart4,
  ...productsPart5
];
