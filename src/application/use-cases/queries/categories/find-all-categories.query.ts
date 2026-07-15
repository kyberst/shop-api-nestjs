import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';

export class FindAllCategoriesQuery extends IRequest<ApiResult<CategoryResponseDto[]>> {
  constructor() {
    super();}
}
