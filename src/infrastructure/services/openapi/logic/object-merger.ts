/**
 * Deep merges two objects
 * @param target The target object
 * @param source The source object to merge from
 * @returns The merged object
 */
export function deepMerge(target: any, source: any): any {
  if (!source) return target;
  if (!target) return source;

  for (const key of Object.keys(source)) {
    if (
      source[key] instanceof Object &&
      !Array.isArray(source[key]) &&
      key in target &&
      target[key] instanceof Object &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
