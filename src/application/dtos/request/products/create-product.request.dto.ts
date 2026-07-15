
export class CreateProductRequestDto {
  id?: string;

  name!: string;

  description!: string;

  price!: number;

  image!: string;

  categoryId!: string;

  sku!: string;
}
