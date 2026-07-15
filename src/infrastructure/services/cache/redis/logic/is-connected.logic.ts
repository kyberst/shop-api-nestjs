import { Redis } from 'ioredis';

export const isConnectedLogic = (client: Redis | undefined): boolean => {
  return !!client && client.status === 'ready';
};
