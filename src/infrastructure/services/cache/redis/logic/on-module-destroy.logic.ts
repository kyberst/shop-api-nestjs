import { Redis } from 'ioredis';

export const onModuleDestroyLogic = (client: Redis | undefined): void => {
  if (client) {
    client.quit();
  }
};
