import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { CreateCategoryRequestDto } from '@/application/dtos/request/categories/create-category.request.dto';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';

export class CreateCategoryCommand extends IRequest<ApiResult<CategoryResponseDto>> {
  constructor(public readonly dto: CreateCategoryRequestDto) {
    super();}
}

