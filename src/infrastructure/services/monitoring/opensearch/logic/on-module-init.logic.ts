import { Client } from '@opensearch-project/opensearch';
import { Logger } from '@nestjs/common';
import { AppException } from '@/shared/errors/app-exception';
import { ResultInfo } from '@/shared/types/result-info';

export const onModuleInitLogic = (logger: Logger, onConnect: () => void): Client | undefined => {
  const node = process.env.OPENSEARCH_NODE;
  if (!node) {
    logger.warn('OPENSEARCH_NODE not found. Monitoring logging will be limited to console.');
    return undefined;
  }

  try {
    const username = process.env.OPENSEARCH_USERNAME;
    const password = process.env.OPENSEARCH_PASSWORD;

    if (!username || !password) {
      throw new AppException(ResultInfo.InternalError('OPENSEARCH_USERNAME or OPENSEARCH_PASSWORD not found but OPENSEARCH_NODE is defined'));
    }

    const client = new Client({
      node: node,
      auth: {
        username: username,
        password: password,
      },
      ssl: {
        rejectUnauthorized: false,
      },
    });
    
    onConnect();
    return client;
  } catch (err: any) {
    logger.error(`Failed to initialize OpenSearch client: ${err.message}`);
    return undefined;
  }
};
