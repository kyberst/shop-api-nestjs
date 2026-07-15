import { categorySchemas } from './categories';
import { identitySchemas } from './identity';
import { orderSchemas } from './orders';
import { paymentSchemas } from './payment';
import { productSchemas } from './products';
import { userSchemas } from './users';
import { permissionSchemas } from './permissions';
import { aiSchemas } from './ai';

/**
 * Main schema registry that aggregates all domain-specific validation schemas.
 * This structure allows the validation system to scale by organizing schemas into modules.
 */
export const schemaRegistry: Record<string, object> = {
  ...categorySchemas,
  ...identitySchemas,
  ...orderSchemas,
  ...paymentSchemas,
  ...productSchemas,
  ...userSchemas,
  ...permissionSchemas,
  ...aiSchemas,
};
