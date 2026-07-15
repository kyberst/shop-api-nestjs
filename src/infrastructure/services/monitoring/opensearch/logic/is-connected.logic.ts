import { Client } from '@opensearch-project/opensearch';

export const isConnectedLogic = async (client: Client | undefined): Promise<boolean> => {
  if (!client) return false;
  try {
    const health = await client.cluster.health();
    return health.statusCode === 200;
  } catch (err) {
    return false;
  }
};
