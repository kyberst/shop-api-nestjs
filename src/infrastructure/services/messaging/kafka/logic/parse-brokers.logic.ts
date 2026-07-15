export const parseBrokersLogic = (brokerStr: string): string[] => {
  return brokerStr.split(',')
    .map(b => b.trim())
    .map(b => b.replace(/^(kafka|http|https|ssl):\/\//i, ''))
    .filter(b => b.length > 0);
};
