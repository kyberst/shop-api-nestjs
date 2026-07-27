import { randomUUID } from 'crypto';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { ApiResult } from '@/shared/types/api-result';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';
import { CreateProductRequestDto } from '@/application/dtos/request/products/create-product.request.dto';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';
import { Product } from '@/domain/entities/product.entity';
import { ProductMapper } from '@/application/mappers/product.mapper';

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
    category: createProductDto.categoryId,
    imageUrl: createProductDto.image,
  });

  await productRepository.save(product);

  return ApiResult.FromInfo(ProductResultCode.PRODUCT_CREATED, ProductMapper.toResponse(product));
};
