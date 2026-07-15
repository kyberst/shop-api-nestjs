import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { UpdateProductRequestDto } from '@/application/dtos/request/products/update-product.request.dto';

export class UpdateProductCommand extends IRequest<ApiResult> {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateProductRequestDto
  ) {
    super();}
}
