import { Client } from '@opensearch-project/opensearch';

export const logLogic = async (
  client: Client | undefined,
  index: string,
  level: string,
  message: string,
  context?: string,
  trace?: any
): Promise<void> => {
  // Always log to console as it's the primary way for Cloud Run / development
  const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
  console[consoleMethod](`[${level.toUpperCase()}] ${context ? `[${context}] ` : ''}${message}`, trace || '');

  if (!client) return;

  try {
    await client.index({
      index,
      body: {
        timestamp: new Date().toISOString(),
        level,
        message,
        context,
        trace,
      },
    });
  } catch (err) {
    // Fail silently to avoid infinite recursion or blocking the app
  }
};
