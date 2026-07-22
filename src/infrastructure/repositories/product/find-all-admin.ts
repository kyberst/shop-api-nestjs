import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { Product } from '@/domain/entities/product.entity';
import { PaginatedData } from '@/domain/types/paginated-data';
import { ProductQueryOptions } from '@/domain/interfaces/product-query-options.interface';

/**
 * Fragmented logic to find all products with administrative filters (including inactive status options)
 * and map them to domain entities, strictly respecting the atomicity and separation of concerns principles.
 * 
 * @param prisma - The Prisma persistence service.
 * @param options - The query search/pagination/sorting options.
 * @returns A paginated summary of domain Product entities.
 */
export const findAllAdminProductsLogic = async (
  prisma: PrismaService,
  options?: ProductQueryOptions,
): Promise<PaginatedData<Product>> => {
  const page = Number(options?.page) || 1;
  const pageSize = Number(options?.pageSize) || 12;
  const skip = (page - 1) * pageSize;

  const where: any = {};

  if (options?.search) {
    where.OR = [
      { name: { contains: options.search, mode: 'insensitive' } },
      { description: { contains: options.search, mode: 'insensitive' } },
    ];
  }

  if (options?.category && options.category !== 'All') {
    where.category = {
      name: options.category,
    };
  }

  if (options?.tradeAssurance === true) {
    where.isTradeAssurance = true;
  }

  if (options?.verifiedOnly === true) {
    where.isVerified = true;
  }

  if (options?.minPrice !== undefined && options?.minPrice !== null) {
    where.price = { ...where.price, gte: Number(options.minPrice) };
  }
  if (options?.maxPrice !== undefined && options?.maxPrice !== null) {
    where.price = { ...where.price, lte: Number(options.maxPrice) };
  }

  // Unless options.isAll is explicitly true, filter active by default
  if (options?.isAll !== true) {
    where.isActive = true;
  }

  const orderBy: any = {};
  if (options?.sortBy) {
    if (options.sortBy === 'price_asc') {
      orderBy.price = 'asc';
    } else if (options.sortBy === 'price_desc') {
      orderBy.price = 'desc';
    } else if (options.sortBy === 'rating') {
      orderBy.rating = 'desc';
    }
  }

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      skip,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ]);

  const mappedItems = items.map((p: any) =>
    Product.create({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category?.name || 'General',
      imageUrl: p.imageUrl,
      rating: p.rating,
      moq: p.moq,
      supplierName: p.supplierName,
      supplierCountry: p.supplierCountry,
      isTradeAssurance: p.isTradeAssurance,
      isVerified: p.isVerified,
      isActive: p.isActive,
    }),
  );

  return {
    items: mappedItems,
    total,
    page,
    pageSize,
  };
};
