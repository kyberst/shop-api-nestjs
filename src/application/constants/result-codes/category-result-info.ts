import { ResultInfo } from '@/shared/types/result-info';

export const CategoryResultInfo = {
  FORBIDDEN_RESTRICTED: ResultInfo.Forbidden('FORBIDDEN_RESTRICTED', 'Cannot create a category named "Restricted"'),
  FETCH_FAILED: ResultInfo.InternalError('Failed to fetch existing categories'),
  DUPLICATE_NAME: ResultInfo.Conflict('DUPLICATE_NAME', 'Category with this name already exists'),
  CREATION_FAILED: ResultInfo.InternalError('Failed to create category'),
};
