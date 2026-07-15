import { createProductSchema } from './create-product.schema';
import { updateProductSchema } from './update-product.schema';
import { findAllProductsSchema } from './find-all-products.schema';

export const productSchemas: Record<string, object> = {
  CreateProductRequestDto: createProductSchema as object,
  UpdateProductRequestDto: updateProductSchema as object,
  FindAllProductsRequestDto: findAllProductsSchema as object,
};
