import * as fs from 'fs';
import * as path from 'path';

/**
 * Scans a directory recursively for YAML files
 * @param dirPath Directory path to scan
 * @param arrayOfFiles Accumulator for file paths
 * @returns List of found file paths
 */
export function scanYamlFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanYamlFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.yaml') || file.endsWith('.yml')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}
