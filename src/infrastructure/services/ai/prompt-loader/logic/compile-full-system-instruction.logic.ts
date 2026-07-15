export const compileFullSystemInstructionLogic = async (
  getPrompt: (category: string, filename: string) => Promise<string>
): Promise<string> => {
  const instruction = await getPrompt('system', 'instruction');
  const productQuery = await getPrompt('products', 'query');
  const productModify = await getPrompt('products', 'modify');
  const orderQuery = await getPrompt('orders', 'query');
  const orderModify = await getPrompt('orders', 'modify');
  const categoryQuery = await getPrompt('categories', 'query');

  return `
${instruction}

PRODUCT GUIDELINES:
${productQuery}
${productModify}

ORDER GUIDELINES:
${orderQuery}
${orderModify}

CATEGORY GUIDELINES:
${categoryQuery}
    `.trim();
};
