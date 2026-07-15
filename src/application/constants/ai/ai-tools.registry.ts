import { AiTool } from '@/shared/interfaces/ai/ai-tool.interface';

export const AI_TOOLS: AiTool[] = [
  {
    name: 'getProducts',
    description: 'Get the list of all products in the system, including names, descriptions, prices, categories, and active statuses.',
  },
  {
    name: 'getOrders',
    description: 'Get the list of all orders, including order IDs, customers, dates, totals, statuses, and item details.',
  },
  {
    name: 'getCategories',
    description: 'Get all product categories available.',
  },
  {
    name: 'createProduct',
    description: 'Create a new product in the catalog.',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        image: { type: 'string', description: 'URL or base64 of the product image' },
        categoryId: { type: 'string' },
        sku: { type: 'string' },
      },
      required: ['name', 'description', 'price', 'image', 'categoryId', 'sku'],
    },
  },
  {
    name: 'updateProduct',
    description: 'Update details of an existing product.',
    parameters: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'The product ID to update' },
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        image: { type: 'string' },
        categoryId: { type: 'string' },
        sku: { type: 'string' },
        isActive: { type: 'boolean' },
      },
      required: ['id'],
    },
  },
  {
    name: 'updateOrderStatus',
    description: 'Update the status of an existing order.',
    parameters: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'The order ID to update' },
        status: { 
          type: 'string', 
          enum: ['Pending', 'Shipped', 'Delivered'],
          description: 'The target status of the order' 
        },
      },
      required: ['id', 'status'],
    },
  },
];
