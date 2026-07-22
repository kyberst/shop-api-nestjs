import { Product } from '@/domain/entities/product.entity';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';

export class ProductMapper {
  static toResponse(product: Product): ProductResponseDto {
    return {
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
  }

  static toResponseList(products: Product[]): ProductResponseDto[] {
    return products.map(product => this.toResponse(product));
  }
}
