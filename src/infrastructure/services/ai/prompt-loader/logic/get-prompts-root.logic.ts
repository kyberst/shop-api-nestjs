import { existsSync } from 'fs';
import * as path from 'path';

export const getPromptsRootLogic = (dirname: string): string => {
  const possiblePaths = [
    path.join(dirname, 'prompts'),
    path.join(dirname, '..', '..', 'infrastructure', 'ai', 'prompts'),
    path.join(dirname, '..', '..', 'infrastructure', 'services', 'ai', 'prompt-loader', 'prompts'),
    path.join(process.cwd(), 'src', 'infrastructure', 'ai', 'prompts'),
    path.join(process.cwd(), 'src', 'infrastructure', 'services', 'ai', 'prompt-loader', 'prompts'),
    path.join(process.cwd(), 'dist', 'infrastructure', 'ai', 'prompts'),
    path.join(process.cwd(), 'backend', 'src', 'infrastructure', 'ai', 'prompts'),
    path.join(process.cwd(), 'backend', 'src', 'infrastructure', 'services', 'ai', 'prompt-loader', 'prompts'),
  ];

  for (const p of possiblePaths) {
    if (existsSync(p)) {
      return p;
    }
  }
  return path.join(dirname, 'prompts'); // fallback
};
