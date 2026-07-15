import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CacheService } from '@/shared/interfaces/cache/cache.interface';
import { onModuleInitLogic } from './logic/on-module-init.logic';
import { onModuleDestroyLogic } from './logic/on-module-destroy.logic';
import { isConnectedLogic } from './logic/is-connected.logic';
import { AppException } from '@/shared/errors/app-exception';
import { ResultInfo } from '@/shared/types/result-info';

@Injectable()
export class RedisService extends CacheService implements OnModuleInit, OnModuleDestroy {
  private client?: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    super();
    this.client = onModuleInitLogic(this.logger);
  }

  onModuleInit() {
    // Client already initialized in constructor
  }

  onModuleDestroy() {
    onModuleDestroyLogic(this.client);
  }

  getClient(): Redis {
    if (!this.client) {
      throw new AppException(ResultInfo.InternalError('Redis client not initialized'));
    }
    return this.client;
  }

  isConnected(): boolean {
    return isConnectedLogic(this.client);
  }
}
