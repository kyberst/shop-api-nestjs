import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { Product } from '@/domain/entities/product.entity';
import { CreateProductRequestDto } from '@/application/dtos/request/products/create-product.request.dto';

export class CreateProductCommand extends IRequest<ApiResult<Product>> {
  constructor(public readonly dto: CreateProductRequestDto) {
    super();}
}
