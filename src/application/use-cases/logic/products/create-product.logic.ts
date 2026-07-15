import { randomUUID } from 'crypto';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { ApiResult } from '@/shared/types/api-result';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';
import { CreateProductRequestDto } from '@/application/dtos/request/products/create-product.request.dto';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';
import { Product } from '@/domain/entities/product.entity';

/**
 * Logic to create a product.
 */
export const createProductLogic = async (
  productRepository: ProductRepository,
  createProductDto: CreateProductRequestDto
): Promise<ApiResult<ProductResponseDto>> => {
  // RULE: Check for existing product name
  const existingProduct = await productRepository.findByName(createProductDto.name);
  
  if (existingProduct) {
    return ApiResult.FromInfo(ProductResultCode.PRODUCT_NAME_DUPLICATED);
  }

  const product = Product.create({
    id: createProductDto.id || randomUUID(),
    name: createProductDto.name,
    description: createProductDto.description,
    price: createProductDto.price,
    category: createProductDto.categoryId || 'General',
    imageUrl: createProductDto.image || '',
  });

  await productRepository.save(product);

  const productResponse: ProductResponseDto = {
    id: product.id,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    createdBy: product.createdBy,
    updatedBy: product.updatedBy,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    imageUrl: product.imageUrl,
    rating: product.rating,
    moq: product.moq,
    supplierName: product.supplierName,
    supplierCountry: product.supplierCountry,
    isTradeAssurance: product.isTradeAssurance,
    isVerified: product.isVerified,
    isActive: product.isActive
  };

  return ApiResult.FromInfo(ProductResultCode.PRODUCT_CREATED, productResponse);
};
