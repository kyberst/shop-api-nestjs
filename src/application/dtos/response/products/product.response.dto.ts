
export class ProductResponseDto {
  id!: string;

  createdAt?: Date;

  updatedAt?: Date;

  createdBy?: string;

  updatedBy?: string;

  name!: string;

  description!: string;

  price!: number;

  category!: string;

  imageUrl!: string;

  rating!: number;

  moq!: number;

  supplierName!: string;

  supplierCountry!: string;

  isTradeAssurance!: boolean;

  isVerified!: boolean;

  isActive?: boolean;
}
