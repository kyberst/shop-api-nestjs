import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Initialize AJV instance with allErrors: true for comprehensive validation reports
const ajvInstance = new Ajv({ 
  allErrors: true,
  useDefaults: true,
  coerceTypes: true 
});

// Add standard formats like email, uuid, uri, etc.
addFormats(ajvInstance);

// Custom format for secure passwords meeting OWASP guidelines:
// - At least 8 characters long, up to 64
// - Contains at least one lowercase letter
// - Contains at least one uppercase letter
// - Contains at least one numeric digit
// - Contains at least one special character from standard lists
ajvInstance.addFormat('password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~]).{8,64}$/);

export const ajv = ajvInstance;
