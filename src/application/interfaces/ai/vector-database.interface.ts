import { InjectionToken } from '@nestjs/common';

export interface IVectorDatabaseService {
  search(query: string, limit?: number): Promise<any[]>;
  upsertProduct(product: { id: string; name: string; description: string; price: number }): Promise<void>;
}

export const IVectorDatabaseService = Symbol('IVectorDatabaseService');
