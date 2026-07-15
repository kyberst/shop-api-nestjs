import { createCategorySchema } from './create-category.schema';
import { updateCategorySchema } from './update-category.schema';

export const categorySchemas: Record<string, object> = {
  CreateCategoryDto: createCategorySchema as object,
  UpdateCategoryDto: updateCategorySchema as object,
};
