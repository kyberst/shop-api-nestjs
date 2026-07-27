import { Product } from '@/domain/entities/product.entity';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';
import { ProductQueryOptions } from '@/domain/interfaces/product-query-options.interface';

/**
 * Fragmented logic to find active or all products with filters and pagination.
 */
export const findAllProductsLogic = async (
  mongoose: MongooseService,
  options?: ProductQueryOptions
): Promise<{ items: Product[]; total: number }> => {
  const ProductModel = mongoose.getModel('Product');
  const CategoryModel = mongoose.getModel('Category');

  const mongoResult = await dbGuard(mongoose, async () => {
    const query: any = {};
    
    if (options?.isAll !== true) {
      query.isActive = true;
      
      // Also filter by active categories
      const activeCategories = await CategoryModel.find({ isActive: true }, { name: 1, _id: 0 }).lean();
      const activeCategoryNames = (activeCategories || []).map(c => (c as any).name);
      
      if (options?.category && options.category !== 'All') {
        if (activeCategoryNames.includes(options.category)) {
          query.category = options.category;
        } else {
          // If the requested category is not active, force empty results
          query.category = '_non_existent_category_';
        }
      } else {
        query.category = { $in: activeCategoryNames };
      }
    } else {
      if (options?.category && options.category !== 'All') {
        query.category = options.category;
      }
    }
    
    if (options?.search) {
      query.name = { $regex: options.search, $options: 'i' };
    }
    
    if (options?.tradeAssurance === true) {
      query.isTradeAssurance = true;
    }
    
    if (options?.verifiedOnly === true) {
      query.isVerified = true;
    }
    
    if (options?.minPrice !== undefined && options?.minPrice !== null) {
      query.price = { ...query.price, $gte: Number(options.minPrice) };
    }
    if (options?.maxPrice !== undefined && options?.maxPrice !== null) {
      query.price = { ...query.price, $lte: Number(options.maxPrice) };
    }

    let sort: any = {};
    if (options?.sortBy) {
      if (options.sortBy === 'price_asc') {
        sort.price = 1;
      } else if (options.sortBy === 'price_desc') {
        sort.price = -1;
      } else if (options.sortBy === 'rating') {
        sort.rating = -1;
      }
    }

    const mQuery = ProductModel.find(
      query,
      { 
        id: 1, name: 1, description: 1, price: 1, category: 1, 
        imageUrl: 1, rating: 1, moq: 1, supplierName: 1, 
        supplierCountry: 1, isTradeAssurance: 1, isVerified: 1, 
        isActive: 1, _id: 0 
      }
    ).sort(sort);

    if (options?.page !== undefined && options?.pageSize !== undefined) {
      const page = Number(options.page) || 1;
      const pageSize = Number(options.pageSize) || 10;
      const skip = (page - 1) * pageSize;
      mQuery.skip(skip).limit(pageSize);
    }

    const [items, total] = await Promise.all([
      mQuery.lean(),
      ProductModel.countDocuments(query)
    ]);

    return { items: items as unknown as Product[], total };
  });

  if (mongoResult.ok) {
    return mongoResult.value;
  }

  throw new DatabaseException(
    `Mongo error fetching products: ${mongoResult.error?.message}`,
    mongoResult.error
  );
};

