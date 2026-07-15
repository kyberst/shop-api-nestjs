import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { deepMerge } from './logic/object-merger';
import { scanYamlFiles } from './logic/file-scanner';

/**
 * Service to load and merge OpenAPI documentation fragments
 */
export class OpenApiLoader {
  /**
   * Loads and merges all OpenAPI fragments from the specified directory
   * @param docsDir The directory containing openapi fragments
   * @returns The merged OpenAPI document object
   */
  static load(docsDir: string): any {
    const baseFile = path.join(docsDir, 'base.yaml');
    let document: any = {};

    // Load base structure first
    if (fs.existsSync(baseFile)) {
      try {
        const baseContent = fs.readFileSync(baseFile, 'utf8');
        document = yaml.load(baseContent) || {};
      } catch (err) {
        console.error(`[OpenApiLoader] Failed to load base file: ${(err as any).message}`);
      }
    }

    // Scan all other files
    const files = scanYamlFiles(docsDir);
    
    files.forEach(file => {
      // Skip base file as it's already loaded
      if (file === baseFile) return;
      
      try {
        const fileContent = fs.readFileSync(file, 'utf8');
        const fragment = yaml.load(fileContent) as any;
        
        if (fragment) {
          deepMerge(document, fragment);
        }
      } catch (err) {
        console.error(`[OpenApiLoader] Failed to load fragment ${file}: ${(err as any).message}`);
      }
    });

    return document;
  }
}
