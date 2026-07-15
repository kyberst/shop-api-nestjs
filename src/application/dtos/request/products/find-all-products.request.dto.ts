
export class FindAllProductsRequestDto {
  page?: number;

  pageSize?: number;

  search?: string;

  category?: string;

  sortBy?: string;

  tradeAssurance?: boolean;

  verifiedOnly?: boolean;

  minPrice?: number;

  maxPrice?: number;

  isAll?: boolean;
}
