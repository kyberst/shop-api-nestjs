import { Client } from '@opensearch-project/opensearch';
import { Logger } from '@nestjs/common';

export const ensureIndexLogic = async (client: Client | undefined, index: string, logger: Logger): Promise<void> => {
  if (!client) return;
  try {
    const exists = await client.indices.exists({ index });
    if (!exists.body) {
      await client.indices.create({
        index,
        body: {
          mappings: {
            properties: {
              timestamp: { type: 'date' },
              level: { type: 'keyword' },
              message: { type: 'text' },
              context: { type: 'keyword' },
              trace: { type: 'text' },
            },
          },
        },
      });
      logger.log(`Created OpenSearch index: ${index}`);
    }
  } catch (err: any) {
    logger.error(`Error ensuring OpenSearch index: ${err.message}`);
  }
};
