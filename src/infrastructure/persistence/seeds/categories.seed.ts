import { Category } from '@/domain/entities/category.entity';

export const seedCategories: Category[] = [
  Category.create({ id: '2b1efbf7-b676-47a8-bf6e-982eb4f8bc41', name: 'Electronics', isActive: true }),
  Category.create({ id: '1f7e32d5-893d-495c-a5b5-b77da17918a2', name: 'Furniture', isActive: true }),
  Category.create({ id: 'cdb1f807-6c2e-4b77-84bc-262270921a2c', name: 'Kitchen', isActive: true }),
  Category.create({ id: '17698a67-c0e6-42d8-bf87-bfb7e8006d5c', name: 'Stationery', isActive: true }),
  Category.create({ id: 'fa1a1157-19ee-4731-8930-cf2f520be678', name: 'Apparel', isActive: true }),
  Category.create({ id: 'a93ca6be-572e-42ef-8cb6-b92d6e75a6c1', name: 'Tools', isActive: true }),
  Category.create({ id: 'f2f75ef3-7032-4ca3-be30-5899478f6575', name: 'General', isActive: true }),
  Category.create({ id: '41935ff5-df25-476c-9bb9-b88d8b139db9', name: 'Machinery', isActive: true }),
  Category.create({ id: 'ce297a76-9d80-45c1-9f93-0177be60db4d', name: 'Packaging', isActive: true }),
  Category.create({ id: '2467b938-1ee4-4ee9-b1d3-35f11cb2088b', name: 'Automotive', isActive: true })
];
