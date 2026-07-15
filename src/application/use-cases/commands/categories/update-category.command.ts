import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { UpdateCategoryRequestDto } from '@/application/dtos/request/categories/update-category.request.dto';

export class UpdateCategoryCommand extends IRequest<ApiResult> {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateCategoryRequestDto
  ) {
    super();}
}

