export const parseBrokersLogic = (brokerStr: string): string[] => {
  console.log('parseBrokersLogic input:', brokerStr);
  const parsed = brokerStr.split(',')
    .map(b => b.trim())
    .map(b => b.replace(/^(kafka|http|https|ssl):\/\//i, ''))
    .filter(b => b.length > 0);
  console.log('parseBrokersLogic output:', parsed);
  return parsed;
};
